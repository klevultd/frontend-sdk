import React from "react"
import renderHydrogen from "@shopify/hydrogen/entry-server"
import { Router, FileRoutes, ShopifyProvider } from "@shopify/hydrogen"
import { Suspense } from "react"
import { KlevuConfig } from "@klevu/core"
import Axios from "axios"
import { credentials } from "./components/klevu/init"

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
    ...credentials,
    axios: Axios,
  })

  return props.children
}

export default renderHydrogen(App)
