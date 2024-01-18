/* eslint-disable */

const fs = require("fs")

const package = JSON.parse(fs.readFileSync("package.json"))
const version = package.version

fs.writeFileSync("src/version.ts", `export default "SDK ${version}"`)
