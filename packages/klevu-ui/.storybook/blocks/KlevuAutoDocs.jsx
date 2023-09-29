import { useOf } from "@storybook/blocks"
import jsdocs from "../../dist/docs/klevu-ui-docs.json"
import React from "react"
import { useState, useEffect } from "react"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import { parts } from "../../src/utils/parts"

const STYLES_SAVE_KEY = "klevu-ui-storybook-css-vars"

// Then register the languages you need
hljs.registerLanguage("typescript", typescript)

export const KlevuAutoDocs = ({ of, onlyStyles }) => {
  const resolvedOf = useOf(of || "story", ["story", "meta"])
  switch (resolvedOf.type) {
    case "story": {
      break
    }
    case "meta": {
      const comp = jsdocs.components.find((c) => c.tag === resolvedOf.preparedMeta.component)

      return (
        <React.Fragment>
          {renderParts(comp)}
          {onlyStyles ? null : renderSlots(comp)}
          {onlyStyles ? null : renderEvents(comp)}
          {onlyStyles ? null : renderMethods(comp)}
          {renderCSSProps(comp)}
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
  for (const c of getDependencies(comp)) {
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
  }

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

function filterAndTransformStyles(styles) {
  return styles
    .filter((s) => s.annotation === "prop")
    .map((s) => {
      const [name, ...defaultVal] = s.name.split(" ")
      return {
        name,
        defaultVal: defaultVal.join(" "),
        docs: s.docs,
      }
    })
}

function renderCSSProps(comp) {
  const [showGlobalProps, setShowGlobalProps] = React.useState(false)
  const [saveName, setSaveName] = React.useState("default")

  useEffect(() => {
    const saved = loadCSSVariables(saveName)
    Object.keys(saved).forEach((key) => {
      document.documentElement.style.setProperty(key, saved[key])
    })
  }, [])

  const cssProps = filterAndTransformStyles(comp.styles)
  const subProps = []
  for (const dep of getDependencies(comp)) {
    filterAndTransformStyles(dep.styles).forEach((style) => {
      if (!subProps.some((subStyle) => subStyle.name === style.name)) {
        subProps.push(style)
      }
    })
  }

  const initProps = filterAndTransformStyles(jsdocs.components.find((c) => c.tag === "klevu-init").styles)

  if (cssProps.length === 0 && subProps.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <h2>CSS Properties</h2>
      <p>
        List of all CSS properties that affect this component. And in the end there are global CSS variables that might
        affect the the look of this component. Modifications here are applied in document level so any styles that are
        declared in the component will override these.
      </p>

      <table className="klevu-autodocs">
        <thead>
          <tr>
            <th>CSS variable</th>
            <th>Description</th>
            <th>Default value</th>
          </tr>
          <tr>
            <th colSpan={3}>
              <button
                style={buttonStyle}
                onClick={() => {
                  clearCSSVariables(saveName)
                  window.location.reload()
                }}
              >
                Clear values
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {cssProps.map((e, index) => (
            <tr key={index}>
              <td>{e.name}</td>
              <td>{e.docs}</td>
              <td>
                <CSSPropertyEditor name={e.name} defaultVal={e.defaultVal} saveName={saveName} />
              </td>
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
                  <td>
                    <CSSPropertyEditor name={e.name} defaultVal={e.defaultVal} saveName={saveName} />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ) : null}
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              <strong>Global CSS variables</strong>
            </td>
          </tr>
          {showGlobalProps ? (
            <React.Fragment>
              {initProps.map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>
                  <td>{e.docs}</td>
                  <td>
                    <CSSPropertyEditor name={e.name} defaultVal={e.defaultVal} saveName={saveName} />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                <button style={buttonStyle} onClick={() => setShowGlobalProps(true)}>
                  Show global CSS variables
                </button>
              </td>
            </tr>
          )}
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

function CSSPropertyEditor({ name, defaultVal, saveName }) {
  let value, type
  const current = getElementCSSVariables([name])
  if (current[0]) {
    value = current[0].value
    type = current[0].type
  }

  const isModified = value !== undefined && value !== defaultVal
  const [currentValue, setCurrentValue] = useState(defaultVal)
  const isColor = CSS.supports("color", currentValue)

  const onChange = (e) => {
    setCurrentValue(e.target.value)
    document.documentElement.style.setProperty(name, e.target.value)
    saveCSSVariable(saveName, name, e.target.value)
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
      }}
    >
      {isColor ? (
        <input
          type="color"
          style={{
            padding: "0px",
            appearance: "none",
            border: "none",
            width: "20px",
            boxSizing: "border-box",
          }}
          value={currentValue}
          onChange={onChange}
        />
      ) : null}
      <input
        type="text"
        style={{
          minWidth: "200px",
          padding: "4px",
          border: isModified ? "1px solid #fdd" : "1px solid #ddd",
          width: "100%",
          boxSizing: "border-box",
        }}
        value={currentValue}
        onChange={onChange}
      />
    </div>
  )
}

const getElementCSSVariables = (allCSSVars, element = document.body) => {
  const elStyles = window.getComputedStyle(element)
  const cssVars = []

  allCSSVars.forEach((key) => {
    const value = elStyles.getPropertyValue(key)

    if (value) {
      cssVars.push({
        key,
        value: value.trim(),
        type: getType(value),
      })
    }
  })

  return cssVars
}

const getType = (value) => {
  if (CSS.supports("color", value)) {
    return "color"
  }

  return "text"
}

function getDependencies(comp) {
  const depComp = Object.keys(comp.dependencyGraph)
  const depsToCheck = []
  for (const dependency of depComp) {
    for (const subDep of comp.dependencyGraph[dependency]) {
      if (depsToCheck.indexOf(subDep) === -1 && subDep !== comp.tag) {
        depsToCheck.push(subDep)
      }
    }
  }

  const dependencies = []
  for (const subDep of depsToCheck) {
    const dep = jsdocs.components.find((c) => c.tag === subDep)

    if (!dep) {
      continue
    }

    dependencies.push(dep)
  }

  return dependencies
}

const saveCSSVariable = (saveName, variableName, variableValue) => {
  const store = JSON.parse(localStorage.getItem(STYLES_SAVE_KEY) || "{}")
  store[saveName] = store[saveName] || {}
  store[saveName][variableName] = variableValue
  localStorage.setItem(STYLES_SAVE_KEY, JSON.stringify(store))
}

const loadCSSVariables = (saveName) => {
  const store = JSON.parse(localStorage.getItem(STYLES_SAVE_KEY) || "{}")
  return store[saveName] || {}
}

const clearCSSVariables = (saveName) => {
  const store = JSON.parse(localStorage.getItem(STYLES_SAVE_KEY) || "{}")
  store[saveName] = {}
  localStorage.setItem(STYLES_SAVE_KEY, JSON.stringify(store))
}

const buttonStyle = {
  border: "0",
  borderRadius: "4px",
  cursor: "pointer",
  display: "inline",
  overflow: "visible",
  padding: "10px 16px",
  position: "relative",
  textAlign: "center",
  WebkitTextDecoration: "none",
  textDecoration: "none",
  transitionProperty: "background,box-shadow",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease-out",
  verticalAlign: "top",
  whiteSpace: "nowrap",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  opacity: 1,
  margin: "0",
  background: "#F6F9FC",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: 1,
  color: "#2E3438",
  boxShadow: "#D9E8F2 0 0 0 1px inset",
  zIndex: 2,
}
