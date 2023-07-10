import {
  KlevuEvents,
  KlevuRecord,
  KlevuLastClickedProducts,
  KlevuDomEvents,
  KlevuListenDomEvent,
} from "@klevu/core"
import { useEffect, useState } from "react"
import { RecommendationBanner } from "./recommendationBanner"

export function LastVisited() {
  const [products, setProducts] = useState<Partial<KlevuRecord>[]>(
    KlevuLastClickedProducts.getProducts(5)
  )

  const handleProductClickUpdate = () => {
    setProducts(KlevuLastClickedProducts.getProducts(5))
  }

  useEffect(() => {
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.ClickEventSent,
      handleProductClickUpdate
    )

    // cleanup this component
    return () => {
      stop()
    }
  }, [])

  return (
    <RecommendationBanner
      title="Last visited products"
      products={products as KlevuRecord[]}
      productClick={(productId, variantId, product) => {
        KlevuEvents.searchProductClick({ product, variantId })
      }}
    />
  )
}
