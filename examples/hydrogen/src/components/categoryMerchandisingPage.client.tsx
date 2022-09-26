import {
  FilterManager,
  KlevuApiRawResponse,
  KlevuDomEvents,
  KlevuFetch,
  KlevuFetchResponse,
  KlevuHydratePackedFetchResult,
  KlevuListenDomEvent,
  KlevuRecord,
} from "@klevu/core"
import React, { useEffect, useRef } from "react"
import { merchandisingQuery } from "../klevuQueries"
import { ProductGrid } from "./grid.client"

const manager = new FilterManager()
let currentResult: KlevuFetchResponse
let clickEvent: (
  productId: string,
  categoryTitle: string,
  variantId?: string
) => void

export function CategoryMerchandisingPage(props: {
  serverResult: KlevuApiRawResponse
  category: string
}) {
  // this is used to prevent useless re-render in client after server
  const prevCategoryIdRef = useRef<string>()
  useEffect(() => {
    prevCategoryIdRef.current = props.category
  })
  const prevCategoryId = prevCategoryIdRef.current

  const [products, setProducts] = React.useState<KlevuRecord[]>([])

  const hydrate = async () => {
    currentResult = await KlevuHydratePackedFetchResult(
      props.serverResult,
      merchandisingQuery(props.category, manager)
    )
    const mercResult = currentResult.queriesById("categoryMerchandising")
    if (mercResult) {
      setProducts(mercResult.records)
      if (mercResult.getCategoryMerchandisingClickSendEvent) {
        clickEvent = mercResult.getCategoryMerchandisingClickSendEvent()
      }
    }
  }

  const loadMore = async (replace = false) => {
    if (replace) {
      currentResult = await KlevuFetch(
        ...merchandisingQuery(props.category, manager)
      )
    } else if (currentResult.queriesById("categoryMerchandising")?.next) {
      currentResult = await currentResult.queriesById("categoryMerchandising")!
        .next!()
    }
    const mercResult = currentResult?.queriesById("categoryMerchandising")
    if (mercResult) {
      if (replace) {
        setProducts(mercResult.records)
      } else {
        setProducts([...products, ...mercResult.records])
      }
      if (mercResult.getCategoryMerchandisingClickSendEvent) {
        clickEvent = mercResult.getCategoryMerchandisingClickSendEvent()
      }
    }
  }

  const handleFilterUpdate = () => {
    loadMore(true)
  }

  React.useEffect(() => {
    hydrate()
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.FilterSelectionUpdate,
      handleFilterUpdate
    )
    // cleanup this component
    return () => {
      stop()
    }
  }, [])

  React.useEffect(() => {
    if (prevCategoryId === undefined) {
      return
    }
    if (prevCategoryId !== props.category) {
      loadMore(true)
    }
  }, [props.category])

  return (
    <ProductGrid
      products={products}
      manager={manager}
      loadMore={() => loadMore(false)}
      hasMoreResults={Boolean(
        currentResult?.queriesById("categoryMerchandising")?.next
      )}
      onClick={(product) => {
        clickEvent(product.id, "Category title", product.itemGroupId)
      }}
    />
  )
}
