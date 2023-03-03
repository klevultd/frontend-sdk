import { defineCustomElements } from "../loader"
import "../src/global/global.css"
// @ts-inore
import jsdocs from "../dist/docs/klevu-ui-docs.json"
import prettier from "prettier/standalone"
import prettierBabel from "prettier/parser-babel"

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

const documentedCssProps = jsdocs.components.flatMap((c) =>
  c.docsTags
    .filter((t) => t.name === "cssprop")
    .map((t) => {
      const [variable, defaultVal, ...desc] = t.text.split(" ")
      return {
        variable,
        defaultVal,
        desc: desc.join(" "),
      }
    })
)

const cssprops = {}
for (const prop of klevuStyles) {
  cssprops[prop.substring(2)] = {
    value: getComputedStyle(document.documentElement).getPropertyValue(prop),
    description: documentedCssProps.find((p) => p.variable === prop)?.desc,
    category: "Generic defined styles",
  }
}
for (const prop of documentedCssProps) {
  if (cssprops[prop.variable.substring(2)]) {
    continue
  }
  cssprops[prop.variable.substring(2)] = {
    description: `${prop.desc} \n *default:* \`${prop.defaultVal}\``,
    category: "Component specific styles",
  }
}

export const parameters = {
  options: {
    storySort: {
      order: [
        "Start",
        ["Welcome", "Installation", "Styles", "This documentation"],
        "Atoms",
        "Components",
        "Layout",
        "Apps",
      ],
    },
    showPanel: true,
    panelPosition: "bottom",
  },
  actions: {
    argTypesRegex: "^(on.*|klevu.*)",
  },
  controls: {
    matchers: {
      color: /(color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  cssprops,
  viewMode: "docs",
  docs: {
    transformSource: (input) =>
      prettier.format(input, {
        parser: "babel",
        plugins: [prettierBabel],
      }),
  },
}
