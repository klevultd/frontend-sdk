"use client"

import { KlevuConfig } from "@klevu/core"
import { useEffect } from "react"

/**
 * Set the KlevuConfig on the client
 *
 * @returns
 */
export function ClientKlevuConfig() {
  useEffect(() => {
    if (typeof window !== undefined) {
      KlevuConfig.init({
        url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
        apiKey: "klevu-164651914788114877",
      })
    }
  }, [])

  return null
}
