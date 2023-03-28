import inquirer from "inquirer"
import { set } from "edit-package-json"
import fs from "fs"
import { resolve } from "path"
import shelljs from "shelljs"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

const filePackage = resolve("../packages/klevu-core/package.json")

let dataPackage = fs.readFileSync(filePackage).toString()

const oldVersion = JSON.parse(dataPackage).version

const newMajor = updateVersion(oldVersion, "major")
const newMinor = updateVersion(oldVersion, "minor")
const newPatch = updateVersion(oldVersion, "patch")

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
    version = updateVersion(oldVersion, args.type)
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

  let npmVersion = shelljs
    .exec("npm show @klevu/core version", {
      silent: true,
      fatal: true,
    })
    .stdout.trim()

  if (npmVersion !== oldVersion) {
    abortWithMessage(`Currently published @klevu/core is different than version in current repository
    > Current repository ${oldVersion}
    > @klevu/core ${npmVersion}
    `)
  }
  console.log("🟢 Version checks OK. Can continue with automated process")

  console.log(`🟡 Updating to version ${version}`)
  console.log(`::set-output name=version::${version}`)

  dataPackage = set(dataPackage, "version", version)

  if (!args.dryRun) {
    fs.writeFileSync(filePackage, dataPackage)
  }
  console.log("🟢 Updated @klevu/core version")

  shelljs.cd("../packages/klevu-core")

  console.log("🟡 Testing @klevu/core library")
  shelljs.exec("npm install")
  if (shelljs.exec("npm test", { fatal: true }).code !== 0) {
    abortWithMessage("Testing failed.")
  }
  console.log("🟢 Testing @klevu/core passed")

  console.log("🟡 Building @klevu/core library")

  if (
    shelljs.exec("npm run build", {
      fatal: true,
    }).code !== 0
  ) {
    abortWithMessage("Build failed.")
  }

  console.log("🟢 Build succeeded")
  console.log("🟡 Deploying @klevu/core")

  if (
    shelljs.exec(
      `npm publish --access public ${await getOTP(args)} ${
        args.dryRun ? "--dry-run" : ""
      }`
    ).code !== 0
  ) {
    abortWithMessage("@klevu/core deployment failed")
  }

  console.log("🟢 Deploy succeeded")

  console.log(
    "🆘🆘🆘🆘 Failures after this stage lead to manual fixes 🆘🆘🆘🆘"
  )

  if (!args.dryRun) {
    fs.writeFileSync(filePackage, dataPackage)
  }

  if (!args.dryRun && args.createCommit) {
    console.log("🟡 Create commit")
    shelljs.cd("../..")
    shelljs.exec(`git checkout -b release/core-${version}`)
    shelljs.exec("git add -A .")
    shelljs.exec(`git commit -m "Release @klevu/core version ${version}"`)
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
