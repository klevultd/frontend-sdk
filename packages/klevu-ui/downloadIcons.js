const fs = require("fs")

async function run() {
  const KlevuUIPreloadedIcons = JSON.parse(
    fs.readFileSync("./src/components/klevu-icon/preloaded-icons.json").toString()
  )

  for (const name of KlevuUIPreloadedIcons) {
    console.log("Downloading", name, "to", `./src/global/icons/${name}.svg`)

    const url = `https://raw.githubusercontent.com/google/material-design-icons/master/symbols/web/${name}/materialsymbolsrounded/${name}_20px.svg`
    const result = await fetch(url)
    if (result.status !== 200) {
      console.warn(`\n###\nFailed to download: ${name}\n###\n`)
      continue
    }
    const file = await result.text()
    const modified = file.replace("<svg ", "<svg fill='currentColor' id='img' ")
    fs.writeFileSync(`./src/components/klevu-icon/assets/${name}.svg`, modified)
  }
}

run()
