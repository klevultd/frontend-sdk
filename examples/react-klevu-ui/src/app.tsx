import React, { useState } from "react"
import { KlevuInit, KlevuProductGrid, KlevuSearchField } from "@klevu/ui-react"
import { KlevuRecord } from "@klevu/core"

export function App() {
  const [products, setProducts] = useState<KlevuRecord[]>([])

  return (
    <KlevuInit
      url="https://eucs30v2.ksearchnet.com/cs/v2/search"
      apiKey="klevu-165829460115715456"
      settings={{
        onProductClick(product, event) {
          alert(`should redirect to product id ${product.id}`)
          return false
        },
      }}
    >
      <KlevuSearchField
        searchProducts
        searchCategories
        searchSuggestions
        onKlevuSearchResults={(event) => {
          setProducts(event.detail.search.records ?? [])
        }}
      ></KlevuSearchField>
      <KlevuProductGrid products={products}></KlevuProductGrid>
    </KlevuInit>
  )
}
