import { defineCustomElements } from "../loader"
import "../src/global/global.css"
// @ts-inore
import jsdocs from "../dist/docs/klevu-ui-docs.json"

defineCustomElements()

/**
 * This script parses all current klevu css properties from browser and combines that with JSON docs to parse descriptions
 */
const klevuStyles: string[] = Array.from(document.styleSheets)
  .filter((sheet) => sheet.href === null || sheet.href.startsWith(window.location.origin))
  .reduce(
    (acc, sheet) =>
      (acc = [
        ...acc,
        ...Array.from(sheet.cssRules).reduce(
          (def, rule: any) =>
            (def =
              rule.selectorText === ":root"
                ? [...def, ...Array.from(rule.style).filter((name: any) => name.startsWith("--klevu"))]
                : def),
          [] as any[]
        ),
      ]),
    [] as any[]
  )

const documentedCssProps = Object.fromEntries(
  new Map(
    jsdocs.components.flatMap((c) =>
      c.docsTags.filter((t) => t.name === "cssprop").map((t) => t.text.split(" - "))
    ) as any
  )
)
console.log(documentedCssProps)

const cssprops = {}
for (const prop of klevuStyles) {
  cssprops[prop.substring(2)] = {
    value: getComputedStyle(document.documentElement).getPropertyValue(prop),
    description: documentedCssProps[prop],
  }
}

export const parameters = {
  options: {
    storySort: {
      order: ["Start", ["Welcome", "Styles"], "Atoms", "Components", "Apps"],
    },
    showPanel: true,
    panelPosition: "bottom",
  },
  actions: {
    argTypesRegex: "^(on.*|klevu.*)",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  cssprops,
}