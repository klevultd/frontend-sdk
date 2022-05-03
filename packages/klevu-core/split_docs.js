/* eslint-disable */

/**
 * Helper function to split docs/modules.md into smaller pieces. This due to too big markdown file for archbee.
 */

var fs = require("fs")

if (!fs.existsSync("./docs/modules")) {
  fs.mkdirSync("./docs/modules")
}
const modules = fs.readFileSync("./docs/modules.md").toString()

const [toc, rest] = modules.split("\n## Type aliases\n")
const matches = [...toc.matchAll(/(modules\.md#([a-z]*))/gim)]
for (const m of matches) {
  const anchor = m[2]
  const match = rest.match(new RegExp(`(?<=${anchor}+).*?(?=s*___)`, "gsi"))
  fs.writeFileSync(
    "./docs/modules/" + anchor + ".md",
    `# ${anchor}
    ${match.join("")}`,
    {
      flag: "w+",
    }
  )
}

const newtoc = toc.replaceAll(/modules\.md#([a-z]*)/gim, (match, p1) => {
  return `modules/${p1}.md`
})

fs.writeFileSync("./docs/modules.md", newtoc, {
  flag: "w+",
})
