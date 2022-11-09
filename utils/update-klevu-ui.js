import inquirer from "inquirer"
import { set } from "edit-package-json"
import fs from "fs"
import { resolve } from "path"
import shelljs from "shelljs"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

const ui = new inquirer.ui.BottomBar()

const fileUiPackage = resolve("../packages/klevu-ui/package.json")
const fileReactPackage = resolve("../packages/klevu-ui-react/package.json")
const fileVuePackage = resolve("../packages/klevu-ui-vue/package.json")

let dataUiPackage = fs.readFileSync(fileUiPackage).toString()
let dataReactPackage = fs.readFileSync(fileReactPackage).toString()
let dataVuePackage = fs.readFileSync(fileVuePackage).toString()

const oldUiVersion = JSON.parse(dataUiPackage).version
const oldReactVersion = JSON.parse(dataReactPackage).version
const oldVueVersion = JSON.parse(dataVuePackage).version

const newMajor = updateVersion(oldUiVersion, "major")
const newMinor = updateVersion(oldUiVersion, "minor")
const newPatch = updateVersion(oldUiVersion, "patch")

async function main(args) {
  const currentBranch = shelljs
    .exec("git rev-parse --abbrev-ref HEAD", {
      silent: true,
      fatal: true,
    })
    .stdout.trim()

  if (args.ignoreBranch !== true && currentBranch !== "master") {
    abortWithMessage("Script is allowed to run only in master branch!")
  }

  let version
  if (args.type && ["major", "minor", "patch"].includes(args.type)) {
    version = updateVersion(oldUiVersion, process.argv.at(2))
  } else if (args.type) {
    abortWithMessage(`Unknown update type "${args.type}"`)
  } else {
    const result = await inquirer.prompt([
      {
        type: "list",
        name: "version",
        message: "Choose version to update to",
        choices: [newPatch, newMinor, newMajor],
      },
    ])
    version = result.version
  }

  ui.log.write(`🟡 Checking version before trying to update`)

  if (oldUiVersion !== oldReactVersion || oldUiVersion !== oldVueVersion) {
    abortWithMessage(
      "Current repository package version are different. Cannot continue with automated process."
    )
  }

  let npmUiVersion = shelljs
    .exec("npm show @klevu/ui version", {
      silent: true,
      fatal: true,
    })
    .stdout.trim()
  let npmReactVersion = shelljs
    .exec("npm show @klevu/ui-react version", {
      silent: true,
      fatal: true,
    })
    .stdout.trim()
  let npmVueVersion = shelljs
    .exec("npm show @klevu/ui-vue version", {
      silent: true,
      fatal: true,
    })
    .stdout.trim()
  if (
    npmUiVersion !== oldUiVersion ||
    npmReactVersion !== oldUiVersion ||
    npmVueVersion !== oldUiVersion
  ) {
    abortWithMessage(`Currently published @klevu/ui is different than version in current repository
    > Current repository ${oldUiVersion}
    > @klevu/ui ${npmUiVersion}
    > @klevu/ui-react ${npmReactVersion}
    > @klevu/ui-vue ${npmVueVersion}
    `)
  }
  ui.log.write("🟢 Version checks OK. Can continue with automated process")

  ui.log.write(`🟡 Updating to version ${version}`)
  dataUiPackage = set(dataUiPackage, "version", version)
  dataReactPackage = set(
    dataReactPackage,
    "dependencies.@klevu/ui",
    "file:../klevu-ui"
  )
  dataVuePackage = set(
    dataVuePackage,
    "dependencies.@klevu/ui",
    "file:../klevu-ui"
  )
  if (!args.dryRun) {
    fs.writeFileSync(fileUiPackage, dataUiPackage)
    fs.writeFileSync(fileReactPackage, dataReactPackage)
    fs.writeFileSync(fileVuePackage, dataVuePackage)
  }
  ui.log.write("🟢 Updated @klevu/ui version and linked react&vue packages")

  shelljs.cd("../packages/klevu-ui-react")
  if (
    shelljs.exec("npm install", {
      fatal: true,
    }).code !== 0
  ) {
    abortWithMessage("Installing failed in @klevu/ui-react.")
  }

  shelljs.cd("../klevu-ui-vue")
  if (
    shelljs.exec("npm install", {
      fatal: true,
    }).code !== 0
  ) {
    abortWithMessage("Installing failed in @klevu/ui-vue.")
  }

  shelljs.cd("../klevu-ui")

  ui.log.write("🟡 Testing @klevu/ui library")
  if (shelljs.exec("npm test", { fatal: true }).code !== 0) {
    abortWithMessage("Testing failed.")
  }
  ui.log.write("🟢 Testing @klevu/ui passed")

  ui.log.write("🟡 Building @klevu/ui library")

  if (
    shelljs.exec("npm run build:all", {
      fatal: true,
    }).code !== 0
  ) {
    abortWithMessage("Build failed.")
  }

  ui.log.write("🟢 Build succeeded")
  ui.log.write("🟡 Deploying @klevu/ui")

  shelljs.exec(
    `npm publish --access public ${await getOTP(args)} ${
      args.dryRun ? "--dry-run" : ""
    }`
  )

  ui.log.write("🟢 Deploy succeeded")
  ui.log.write("🟡 Waiting for little bit for NPM to register updated version")

  await new Promise((resolve) => setTimeout(resolve, 10000))

  ui.log.write(
    "🆘🆘🆘🆘 Failures after this stage lead to manual fixes 🆘🆘🆘🆘"
  )

  ui.log.write("🟡 Changing child library versions")
  dataReactPackage = set(dataReactPackage, "dependencies.@klevu/ui", version)
  dataReactPackage = set(dataReactPackage, "version", version)
  dataVuePackage = set(dataVuePackage, "dependencies.@klevu/ui", version)
  dataVuePackage = set(dataVuePackage, "version", version)

  if (!args.dryRun) {
    fs.writeFileSync(fileUiPackage, dataUiPackage)
    fs.writeFileSync(fileReactPackage, dataReactPackage)
    fs.writeFileSync(fileVuePackage, dataVuePackage)
  }
  ui.log.write("🟢 Versions changed")

  ui.log.write("🟡 Publish React")
  shelljs.cd("../klevu-ui-react")
  shelljs.exec("npm install")
  shelljs.exec(
    `npm publish --access public ${await getOTP(args)} ${
      args.dryRun ? "--dry-run" : ""
    }`
  )
  ui.log.write("🟢 React published")

  ui.log.write("🟡 Publish Vue")
  shelljs.cd("../klevu-ui-vue")
  shelljs.exec("npm install")
  shelljs.exec(
    `npm publish --access public ${await getOTP(args)} ${
      args.dryRun ? "--dry-run" : ""
    }`
  )
  ui.log.write("🟢 Vue published")

  if (!args.dryRun) {
    ui.log.write("🟡 Create commit")
    shelljs.cd("../..")
    shelljs.exec("git add -A .")
    shelljs.exec(`git commit -m "Bumped UI to version ${version}"`)
    ui.log.write("🟢 Commit created\n")
  } else {
    ui.log.write("🟡 Dry run. Ignore commit")
  }

  ui.log.write("🟢 Release done! Now just push changes with ´git push`")

  process.exit(0)
}

function abortWithMessage(message) {
  ui.log.write(`🔴  ${message}`)
  process.exit(1)
}

async function getOTP(args) {
  if (args.dryRun) {
    return ""
  }

  if (process.env.NPM_TOKEN) {
    return `--otp ${process.env.NPM_TOKEN}`
  }

  const input = await inquirer.prompt([
    {
      type: "input",
      name: "otp",
      message: "NPM one time password",
    },
  ])
  return `--otp ${input.otp}`
}

function updateVersion(version, toUpdate) {
  let [major, minor, patch] = version.split(".")
  switch (toUpdate) {
    case "major":
      major++
      return `${major}.0.0`
    case "minor":
      minor++
      return `${major}.${minor}.0`
    case "patch":
      patch++
      return `${major}.${minor}.${patch}`
    default:
      throw new Error(`Unknown version "${toUpdate}" to update`)
  }
}

const args = yargs(hideBin(process.argv))
  .option("type", {
    type: "string",
    description: "Which kind of update (major|minor|patch)",
  })
  .option("dry-run", {
    alias: "dr",
    type: "boolean",
    description: "Do not actully do anything",
  })
  .option("ignore-branch", {
    type: "boolean",
    description: "Ignore 'master' branch restriction",
  })
  .parse()

main(args)
