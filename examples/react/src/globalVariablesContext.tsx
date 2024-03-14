import React, { useContext, useState } from "react"

export type GlobalVariablesContextType = {
  debugMode: boolean
  toggleDebugMode: (val: boolean) => void
}

const GlobalVariablesContext = React.createContext<GlobalVariablesContextType>(
  {} as any
)

export function useGlobalVariables() {
  return useContext(GlobalVariablesContext)
}

export function GlobalVariablesContextProvider(props: { children: any }) {
  const [debugMode, setDebugMode] = useState(
    sessionStorage.getItem("klevu_debug_mode") || false
  )

  const toggleDebugMode = (val: boolean) => {
    setDebugMode(val)
    if (val) sessionStorage.setItem("klevu_debug_mode", val.toString())
    else sessionStorage.removeItem("klevu_debug_mode")
    window.location.reload()
  }

  return (
    <GlobalVariablesContext.Provider
      value={{
        debugMode,
        toggleDebugMode,
      }}
    >
      {props.children}
    </GlobalVariablesContext.Provider>
  )
}
