import { IconButton, Icons } from "@storybook/components"
import { useStorybookApi } from "@storybook/manager-api"
import React, { Fragment, memo, useState } from "react"
import { TOOL_ID } from "./constants"
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useClick,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react"

export const Tool = memo(function KlevuSettings() {
  const api = useStorybookApi()

  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip({ fallbackAxisSideDirection: "end" }), shift()],
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    strategy: "absolute",
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePress: true,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

  const [apiKey, setApiKey] = useState(localStorage.getItem("klevu-api-key") || "")
  const [url, setUrl] = useState(localStorage.getItem("klevu-url") || "")
  const [language, setLanguage] = useState(localStorage.getItem("klevu-language") || undefined)
  const [useKMC, setUseKMC] = useState<boolean>(localStorage.getItem("klevu-use-kmc") === "false" ? false : true)

  const onSave = (e) => {
    localStorage.setItem("klevu-api-key", apiKey)
    localStorage.setItem("klevu-url", url)
    localStorage.setItem("klevu-language", language ?? "")
    localStorage.setItem("klevu-use-kmc", useKMC.toString() ?? "true")
    window.location.reload()
  }

  const onClose = () => {
    setApiKey(localStorage.getItem("klevu-api-key") || "")
    setUrl(localStorage.getItem("klevu-url") || "")
    setLanguage(localStorage.getItem("klevu-language") || undefined)
    setUseKMC(localStorage.getItem("klevu-use-kmc") === "false" ? false : true)
    setIsOpen(false)
  }

  return (
    <Fragment>
      <IconButton key={TOOL_ID} title="Klevu settings" {...getReferenceProps()}>
        <Icons icon="wrench" />
      </IconButton>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div className="Popover" ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <div
                style={{
                  padding: 16,
                  width: 300,
                  gap: "6px",
                  display: "flex",
                  flexDirection: "column",
                  background: "white",
                  border: "1px solid #eee",
                  borderRadius: 4,
                }}
              >
                <span
                  style={{
                    fontSize: "0.8em",
                    color: "#666",
                  }}
                >
                  Provide a custom API key and URL for <code>klevu-init</code> to test your environment.
                </span>
                Api-key
                <input
                  type="text"
                  onChange={(e) => {
                    setApiKey(e.target.value)
                  }}
                  value={apiKey}
                />
                URL
                <input
                  type="text"
                  onChange={(e) => {
                    setUrl(e.target.value)
                  }}
                  value={url}
                />
                Language
                <select
                  onChange={(e) => {
                    setLanguage(e.target.value)
                  }}
                  value={language}
                >
                  <option value="en">English</option>
                  <option value="fi">Finnish</option>
                  <option value="es">Spanish</option>
                </select>
                <div>
                  <input type="checkbox" checked={useKMC} onChange={(e) => setUseKMC(Boolean(e.target.checked))} /> Use
                  KMC
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button onClick={onClose}>Close</button>
                  <button onClick={onSave}>Save</button>
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </Fragment>
  )
})
