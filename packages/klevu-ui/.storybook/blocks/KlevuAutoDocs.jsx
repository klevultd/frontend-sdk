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
      break
    }
    case "meta": {
      const comp = jsdocs.components.find((c) => c.tag === resolvedOf.preparedMeta.component)

      return (
        <React.Fragment>
          {renderEvents(comp)}
          {renderSlots(comp)}
          {renderParts(comp)}
          {renderCSSProps(comp)}
          {renderMethods(comp)}
        </React.Fragment>
      )
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
        <thead>
          <tr>
            <th>Event name</th>
            <th>Description</th>
            <th>
              <em>e.detail</em> typing
            </th>
          </tr>
        </thead>
        <tbody>
          {comp?.events.map((e, index) => (
            <tr key={index}>
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
        </tbody>
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
        <thead>
          <tr>
            <th>Slot name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {comp?.slots.map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.docs}</td>
            </tr>
          ))}
        </tbody>
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
        <thead>
          <tr>
            <th>Part name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {cssParts.map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.docs}</td>
            </tr>
          ))}
          {subParts.length > 0 ? (
            <React.Fragment>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <strong>Dependency parts</strong>
                </td>
              </tr>
              {subParts.map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{e.docs}</td>
                </tr>
              ))}
            </React.Fragment>
          ) : null}
        </tbody>
      </table>
    </React.Fragment>
  )
}

function renderCSSProps(comp) {
  const cssProps = comp.styles
    .filter((s) => s.annotation === "prop")
    .map((s) => {
      const [name, ...defaultVal] = s.name.split(" ")
      return {
        name,
        defaultVal,
        docs: s.docs,
      }
    })

  const subProps = []
  const depComp = Object.keys(comp.dependencyGraph)
  const depsToCheck = ["klevu-init"]
  for (const dependency of depComp) {
    for (const subDep of comp.dependencyGraph[dependency]) {
      if (depsToCheck.indexOf(subDep) === -1 && subDep !== comp.tag) {
        depsToCheck.push(subDep)
      }
    }
  }
  for (const subDep of depsToCheck) {
    const dep = jsdocs.components.find((c) => c.tag === subDep)

    if (!dep) {
      continue
    }

    dep.styles
      .filter((s) => s.annotation === "prop")
      .map((s) => {
        const [name, ...defaultVal] = s.name.split(" ")
        return {
          name,
          defaultVal,
          docs: s.docs,
        }
      })
      .forEach((style) => {
        if (!subProps.some((subStyle) => subStyle.name === style.name)) {
          subProps.push(style)
        }
      })
  }

  if (cssProps.length === 0 && subProps.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>CSS Properties</h2>
      <table className="klevu-autodocs">
        <thead>
          <tr>
            <th>CSS variable</th>
            <th>Description</th>
            <th>Default value</th>
          </tr>
        </thead>
        <tbody>
          {cssProps.map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.docs}</td>
              <td>{e.defaultVal}</td>
            </tr>
          ))}
          {subProps.length > 0 ? (
            <React.Fragment>
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  <strong>Dependency CSS variables</strong>
                </td>
              </tr>
              {subProps.map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{e.docs}</td>
                  <td>{e.defaultVal}</td>
                </tr>
              ))}
            </React.Fragment>
          ) : null}
        </tbody>
      </table>
    </React.Fragment>
  )
}

function renderMethods(comp) {
  if (comp.methods.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>Methods</h2>
      <table className="klevu-autodocs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Docs</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          {comp.methods.map((e, index) => (
            <tr key={index}>
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
        </tbody>
      </table>
    </React.Fragment>
  )
}
