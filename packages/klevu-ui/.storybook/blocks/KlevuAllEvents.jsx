import jsdocs from "../../dist/docs/klevu-ui-docs.json"
import React from "react"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"

// Then register the languages you need
hljs.registerLanguage("typescript", typescript)

export const KlevuAllEvents = () => {
  const componentsWithEvents = jsdocs.components.filter((c) => c.events.length > 0)

  return (
    <table className="klevu-autodocs">
      <tr>
        <th>Component</th>
        <th>Event name</th>
        <th>Description</th>
        <th>
          <em>e.detail</em> typing
        </th>
      </tr>
      {componentsWithEvents.map((comp) => {
        return comp.events.map((e) => (
          <tr>
            <td>{comp.tag}</td>
            <td>{e.event}</td>
            <td>{e.docs}</td>
            <td
              className="klevuHighlight"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(e.complexType.resolved, { language: "typescript" }).value,
              }}
            ></td>
          </tr>
        ))
      })}
    </table>
  )
}
