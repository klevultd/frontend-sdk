import { useOf } from "@storybook/blocks"
import jsdocs from "../../dist/docs/klevu-ui-docs.json"
import React from "react"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import { parts } from "../../src/utils/parts"

// Then register the languages you need
hljs.registerLanguage("typescript", typescript)

export const KlevuAutoDocs = ({ of }) => {
  const resolvedOf = useOf(of || "story", ["story", "meta"])
  switch (resolvedOf.type) {
    case "story": {
      console.log("story", resolvedOf.story.id)
      break
    }
    case "meta": {
      console.log(resolvedOf)
      const comp = jsdocs.components.find((c) => c.tag === resolvedOf.preparedMeta.component)
      return [renderEvents(comp), renderSlots(comp), renderParts(comp), renderCSSProps(comp), renderMethods(comp)]
    }
  }
  return null
}

function renderEvents(comp) {
  if (comp.events.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>Component events</h2>
      <p>
        Events can be listened by any standard HTML element in the DOM. Check{" "}
        <a href="../?path=/docs/guides-events--docs">here</a> for guidance.
      </p>
      <table className="klevu-autodocs">
        <tr>
          <th>Event name</th>
          <th>Description</th>
          <th>
            <em>e.detail</em> typing
          </th>
        </tr>
        {comp?.events.map((e) => (
          <tr>
            <td>{e.event}</td>
            <td>{e.docs}</td>
            <td
              className="klevuHighlight"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(e.complexType.resolved, { language: "typescript" }).value,
              }}
            ></td>
          </tr>
        ))}
      </table>
    </React.Fragment>
  )
}

function renderSlots(comp) {
  if (comp.slots.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>Slots</h2>
      <p>
        Read how to use slots in <a href="../?path=/docs/guides-styling-components--docs#slots">here</a>.
      </p>
      <table className="klevu-autodocs">
        <tr>
          <th>Slot name</th>
          <th>Description</th>
        </tr>
        {comp?.slots.map((e) => (
          <tr>
            <td>{e.name}</td>
            <td>{e.docs}</td>
          </tr>
        ))}
      </table>
    </React.Fragment>
  )
}

function renderParts(comp) {
  const depComps = parts[comp.tag] ? Object.keys(parts[comp.tag].exportedcomponents) : []

  const cssParts = comp.docsTags
    .filter((t) => t.name === "csspart")
    .map((t) => {
      const [name, ...parts] = t.text.split(" ")
      return {
        name,
        docs: parts.join(" "),
      }
    })

  const subParts = []
  jsdocs.components.forEach((c) => {
    if (!depComps.includes(c.tag)) {
      return
    }

    subParts.push(
      ...c.docsTags
        .filter((t) => t.name === "csspart")
        .map((t) => {
          const [name, ...parts] = t.text.split(" ")
          return {
            name,
            docs: parts.join(" "),
          }
        })
    )
  })

  if (cssParts.length === 0 && subParts.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>Parts</h2>
      <p>
        Read how to use CSS parts in <a href="../?path=/docs/guides-styling-components--docs#part">here</a>.
      </p>
      <table className="klevu-autodocs">
        <tr>
          <th>Part name</th>
          <th>Description</th>
        </tr>
        {cssParts.map((e) => (
          <tr>
            <td>{e.name}</td>
            <td>{e.docs}</td>
          </tr>
        ))}
        {subParts.length > 0 ? (
          <React.Fragment>
            <tr>
              <td colspan="2" style={{ textAlign: "center" }}>
                <strong>Dependency parts</strong>
              </td>
            </tr>
            {subParts.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.docs}</td>
              </tr>
            ))}
          </React.Fragment>
        ) : null}
      </table>
    </React.Fragment>
  )
}

function renderCSSProps(comp) {
  const cssProps = comp.docsTags
    .filter((t) => t.name === "cssprop")
    .map((t) => {
      const [name, defaultVal, ...parts] = t.text.split(" ")
      return {
        name,
        defaultVal,
        docs: parts.join(" "),
      }
    })

  const subProps = []
  comp.dependencies.forEach((dep) => {
    jsdocs.components
      .find((c) => c.tag === dep)
      .docsTags.filter((t) => t.name === "cssprop")
      .map((t) => {
        const [name, defaultVal, ...parts] = t.text.split(" ")
        return {
          name,
          defaultVal,
          docs: parts.join(" "),
        }
      })
      .forEach((e) => {
        if (subProps.some((p) => p.name === e.name)) {
          return
        }

        subProps.push(e)
      })
  })

  if (cssProps.length === 0 && subProps.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>CSS Properties</h2>
      <table className="klevu-autodocs">
        <tr>
          <th>CSS variable</th>
          <th>Description</th>
          <th>Default value</th>
        </tr>
        {cssProps.map((e) => (
          <tr>
            <td>{e.name}</td>
            <td>{e.docs}</td>
            <td>{e.defaultVal}</td>
          </tr>
        ))}
        {subProps.length > 0 ? (
          <React.Fragment>
            <tr>
              <td colspan="3" style={{ textAlign: "center" }}>
                <strong>Dependency CSS variables</strong>
              </td>
            </tr>
            {subProps.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.docs}</td>
                <td>{e.defaultVal}</td>
              </tr>
            ))}
          </React.Fragment>
        ) : null}
      </table>
    </React.Fragment>
  )
}

function renderMethods(comp) {
  console.log(comp)

  if (comp.methods.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>Methods</h2>
      <table className="klevu-autodocs">
        <tr>
          <th>Name</th>
          <th>Docs</th>
          <th>Signature</th>
        </tr>
        {comp.methods.map((e) => (
          <tr>
            <td>{e.name}</td>
            <td>{e.docs}</td>
            <td
              className="klevuHighlight"
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(e.signature, { language: "typescript" }).value,
              }}
            ></td>
          </tr>
        ))}
      </table>
    </React.Fragment>
  )
}
