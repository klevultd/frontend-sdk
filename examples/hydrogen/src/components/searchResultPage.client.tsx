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
import React from "react"
import { searchQuery } from "../klevuQueries"
import { ProductGrid } from "./grid.client"

const manager = new FilterManager()
let currentResult: KlevuFetchResponse
let clickEvent: (productId: string, variantId?: string) => void

export function SearchResultPage(props: {
  serverResult: KlevuApiRawResponse
  term: string
}) {
  const [products, setProducts] = React.useState<KlevuRecord[]>([])

  // this is used to prevent useless re-render in client after server
  const prevTermRef = React.useRef<string>()
  React.useEffect(() => {
    prevTermRef.current = props.term
  })
  const prevTerm = prevTermRef.current

  const hydrate = async () => {
    currentResult = await KlevuHydratePackedFetchResult(
      props.serverResult,
      searchQuery(props.term, manager)
    )
    const searchResult = currentResult.queriesById("search")
    if (searchResult) {
      setProducts(searchResult.records)
      if (searchResult.getSearchClickSendEvent) {
        clickEvent = searchResult.getSearchClickSendEvent()
      }
    }
  }

  const loadMore = async (replace = false) => {
    if (replace) {
      currentResult = await KlevuFetch(...searchQuery(props.term, manager))
    } else if (currentResult.queriesById("search")?.next) {
      currentResult = await currentResult.queriesById("search")!.next!()
    }
    const searchResult = currentResult?.queriesById("search")
    if (searchResult) {
      if (replace) {
        setProducts(searchResult.records)
      } else {
        setProducts([...products, ...searchResult.records])
      }
      if (searchResult.getSearchClickSendEvent) {
        clickEvent = searchResult.getSearchClickSendEvent()
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
    if (prevTerm === undefined) {
      return
    }

    if (prevTerm !== props.term) {
      loadMore(true)
    }
  }, [props.term])

  return (
    <ProductGrid
      products={products}
      manager={manager}
      hasMoreResults={Boolean(currentResult?.queriesById("search")?.next)}
      onClick={(product) => {
        clickEvent(product.id, product.itemGroupId)
      }}
      loadMore={() => loadMore(false)}
    />
  )
}
