import React, { useContext, useEffect, useState } from "react"
import { config } from "./config"
import { KlevuFetch, search } from "@klevu/core"
import { getCategoryLabel } from "./utils"
import { isUndefined } from "lodash"

export type GlobalVariablesContextType = {
  debugMode: boolean
  toggleDebugMode: (val: boolean) => void
  topCategories: { id: string; label: string }[]
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
  const [topCategories, setTopCategories] = useState<
    { id: string; label: string }[]
  >([])

  const toggleDebugMode = (val: boolean) => {
    setDebugMode(val)
    if (val) sessionStorage.setItem("klevu_debug_mode", val.toString())
    else sessionStorage.removeItem("klevu_debug_mode")
    window.location.reload()
  }

  const fetchTopCategories = async () => {
    console.log("Fetching top categories for ", config.apiKey)
    const functions = [
      search("*", {
        id: "klevu_top_categories",
        limit: 100,
        mode: "demo",
      }),
    ]
    const res = await KlevuFetch(...functions)

    const searchResult = res.queriesById("klevu_top_categories")
    if (!searchResult) {
      return
    }

    // KLEVU_PRODUCT;;Womens Footwear Sneakers @ku@kuCategory@ku@

    const reducedResult = searchResult.records.reduce((acc, record) => {
      record.klevu_category
        .replace("KLEVU_PRODUCT;;", "")
        .replace("@ku@kuCategory@ku@", "")
        .split(";;;")[0]
        .split(";;")
        .forEach((category) => {
          if (isUndefined(acc[category])) acc[category] = 1
          else acc[category] = acc[category] + 1
        })
      return acc
    }, {})
    const reducedResultAsArray = Object.keys(reducedResult).map((key) => ({
      [key]: reducedResult[key],
    }))
    const sortedArrayOfObjects = reducedResultAsArray.sort((a, b) => {
      const keyA = Object.keys(a)[0]
      const keyB = Object.keys(b)[0]
      return b[keyB] - a[keyA]
    })
    console.log({ sortedArrayOfObjects })
    setTopCategories(
      [...new Set(sortedArrayOfObjects.map((r) => Object.keys(r)[0]))].map(
        (c) => ({
          id: c,
          label: getCategoryLabel(c),
        })
      )
    )
  }

  useEffect(() => {
    fetchTopCategories()
  }, [])
  return (
    <GlobalVariablesContext.Provider
      value={{
        debugMode,
        toggleDebugMode,
        topCategories,
      }}
    >
      {props.children}
    </GlobalVariablesContext.Provider>
  )
}
