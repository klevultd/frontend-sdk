import React from "react"
import renderHydrogen from "@shopify/hydrogen/entry-server"
import { Router, FileRoutes, ShopifyProvider } from "@shopify/hydrogen"
import { Suspense } from "react"
import { KlevuConfig } from "@klevu/core"
import Axios from "axios"

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <KlevuInit>
          <Router>
            <FileRoutes />
          </Router>
        </KlevuInit>
      </ShopifyProvider>
    </Suspense>
  )
}

export function KlevuInit(props: any) {
  KlevuConfig.init({
    url: "https://box-qa.klevu.com/cs/v2/search",
    apiKey: "klevu-16521954575361126",
    axios: Axios,
  })

  return props.children
}

export default renderHydrogen(App)
