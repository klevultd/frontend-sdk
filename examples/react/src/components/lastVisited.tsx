import {
  KlevuEvents,
  KlevuRecord,
  KlevuLastClickedProducts,
  KlevuDomEvents,
} from "@klevu/core"
import { useEffect, useState } from "react"
import { RecommendationBanner } from "./recommendationBanner"

export function LastVisited() {
  const [products, setProducts] = useState<KlevuRecord[]>(
    KlevuLastClickedProducts.getProducts(5)
  )

  const handleProductClickUpdate = () => {
    setProducts(KlevuLastClickedProducts.getProducts(5))
  }

  useEffect(() => {
    document.addEventListener(
      KlevuDomEvents.ClickEventSent,
      handleProductClickUpdate
    )

    // cleanup this component
    return () => {
      document.removeEventListener(
        KlevuDomEvents.ClickEventSent,
        handleProductClickUpdate
      )
    }
  }, [])

  return (
    <RecommendationBanner
      title="Last visited products"
      products={products}
      productClick={(productId, variantId, product) => {
        KlevuEvents.searchProductClick(product, undefined, variantId)
      }}
    />
  )
}
