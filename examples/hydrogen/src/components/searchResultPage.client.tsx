import {
  applyFilterWithManager,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuListenDomEvent,
  KlevuQueryResult,
  KlevuRecord,
  search,
} from "@klevu/core"
import React from "react"
import { ProductGrid } from "./grid.client"

const manager = new FilterManager()

export function SearchResultPage(props: {
  serverResult: KlevuQueryResult
  term: string
}) {
  const [products, setProducts] = React.useState<KlevuRecord[]>(
    props.serverResult.records
  )
  const [result, setResult] = React.useState<KlevuQueryResult>(
    props.serverResult
  )
  manager.initFromListFilters(props.serverResult.filters ?? [])

  const loadMore = async (replace = false) => {
    const offset =
      replace === true ? 0 : result.meta.offset + result.meta.noOfResults

    const loadMoreResult = await KlevuFetch(
      search(
        props.term,
        {
          id: "search",
          offset,
          limit: result.meta.noOfResults,
        },
        applyFilterWithManager(manager)
      )
    )

    const searchResult = loadMoreResult.queriesById("search")

    if (searchResult) {
      if (replace) {
        setProducts(searchResult.records)
      } else {
        setProducts([...products, ...searchResult.records])
      }
      setResult(searchResult)
    }
  }

  const handleFilterUpdate = () => {
    loadMore(true)
  }

  React.useEffect(() => {
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
    loadMore(true)
  }, [props.term])

  return (
    <ProductGrid
      result={result}
      products={products}
      manager={manager}
      type="search"
      loadMore={() => loadMore(false)}
    />
  )
}
