import inquirer from "inquirer"
import { set } from "edit-package-json"
import fs from "fs"
import { resolve } from "path"
import shelljs from "shelljs"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

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
    version = updateVersion(oldUiVersion, args.type)
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

  console.log(`🟡 Checking version before trying to update`)

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
  console.log("🟢 Version checks OK. Can continue with automated process")

  console.log(`🟡 Updating to version ${version}`)
  console.log(`::set-output name=version::${version}`)

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
  console.log("🟢 Updated @klevu/ui version and linked react&vue packages")

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

  console.log("🟡 Testing @klevu/ui library")
  shelljs.exec("npm install")
  if (shelljs.exec("npm test", { fatal: true }).code !== 0) {
    abortWithMessage("Testing failed.")
  }
  console.log("🟢 Testing @klevu/ui passed")

  console.log("🟡 Building @klevu/ui library")

  if (
    shelljs.exec("npm run build:all", {
      fatal: true,
    }).code !== 0
  ) {
    abortWithMessage("Build failed.")
  }

  console.log("🟢 Build succeeded")
  console.log("🟡 Deploying @klevu/ui")

  shelljs.exec(
    `npm publish --access public ${await getOTP(args)} ${
      args.dryRun ? "--dry-run" : ""
    }`
  )

  console.log("🟢 Deploy succeeded")
  console.log("🟡 Waiting for little bit for NPM to register updated version")

  await new Promise((resolve) => setTimeout(resolve, 10000))

  console.log(
    "🆘🆘🆘🆘 Failures after this stage lead to manual fixes 🆘🆘🆘🆘"
  )

  console.log("🟡 Changing child library versions")
  dataReactPackage = set(dataReactPackage, "dependencies.@klevu/ui", version)
  dataReactPackage = set(dataReactPackage, "version", version)
  dataVuePackage = set(dataVuePackage, "dependencies.@klevu/ui", version)
  dataVuePackage = set(dataVuePackage, "version", version)

  if (!args.dryRun) {
    fs.writeFileSync(fileUiPackage, dataUiPackage)
    fs.writeFileSync(fileReactPackage, dataReactPackage)
    fs.writeFileSync(fileVuePackage, dataVuePackage)
  }
  console.log("🟢 Versions changed")

  console.log("🟡 Publish React")
  shelljs.cd("../klevu-ui-react")
  shelljs.exec("npm install")
  shelljs.exec(
    `npm publish --access public ${await getOTP(args)} ${
      args.dryRun ? "--dry-run" : ""
    }`
  )
  console.log("🟢 React published")

  console.log("🟡 Publish Vue")
  shelljs.cd("../klevu-ui-vue")
  shelljs.exec("npm install")
  shelljs.exec(
    `npm publish --access public ${await getOTP(args)} ${
      args.dryRun ? "--dry-run" : ""
    }`
  )
  console.log("🟢 Vue published")

  if (!args.dryRun && args.createCommit) {
    console.log("🟡 Create commit")
    shelljs.cd("../..")
    shelljs.exec(`git checkout -b release/ui-${version}`)
    shelljs.exec("git add -A .")
    shelljs.exec(`git commit -m "Bumped UI to version ${version}"`)
    console.log("🟢 Commit created")
    console.log("🟢 Now just push changes with ´git push`")
  } else {
    console.log("🟡 Dry run. Ignore commit")
  }

  console.log("🟢 Release done!")

  process.exit(0)
}

function abortWithMessage(message) {
  console.log(`🔴  ${message}`)
  process.exit(1)
}

async function getOTP(args) {
  if (args.dryRun || args.otp === false) {
    return ""
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
  switch (toUpdate.trim()) {
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
      console.error(`Unknown version "${toUpdate.trim()}" to update`)
      throw new Error("Version selection failed")
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
  .option("create-commit", {
    type: "boolean",
    alias: "cc",
    description: "Create git branch and commit from changes",
  })
  .option("ignore-branch", {
    type: "boolean",
    description: "Ignore 'master' branch restriction",
  })
  .option("no-otp", {
    type: "boolean",
    description: "Do not use NPM one-time-password",
  })
  .parse()

main(args)
