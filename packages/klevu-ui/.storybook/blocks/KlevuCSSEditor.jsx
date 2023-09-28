import React from "react"
import { useState, useEffect } from "react"
import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs/components/prism-core"
import beautify from "js-beautify"
import "prismjs/components/prism-css"
import "prismjs/themes/prism.css" //Example style, you can use another

export const KlevuCSSEditor = ({ styleId }) => {
  const [styleElement, setStyleElement] = useState(null)
  const [tryCount, setTryCount] = useState(0)
  const [code, setCode] = useState("Loading...")

  useEffect(() => {
    setTryCount(tryCount + 1)
    if (styleElement) {
      setCode(
        beautify.css(styleElement.innerText, {
          indent_size: 2,
        })
      )
      return
    }
    if (tryCount > 10) {
      console.error(`KlevuCSSEditor: Failed to load style ${styleId}`)
      return
    }
    setTimeout(() => {
      const styleEl = document.getElementById(styleId)
      setStyleElement(styleEl)
    }, 300)
  }, [styleElement])

  return (
    <div id="klevu-css-editor">
      <Editor
        value={code}
        onValueChange={(code) => {
          setCode(code)
          styleElement.innerText = code
        }}
        highlight={(code) => highlight(code, languages.css)}
        padding={10}
        textareaClassName="editor-textarea"
        preClassName="editor-pre"
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  )
}
