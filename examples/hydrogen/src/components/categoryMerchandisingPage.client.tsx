import {
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuListenDomEvent,
  KlevuQueryResult,
  KlevuRecord,
} from "@klevu/core"
import React, { useEffect, useRef } from "react"
import { ProductGrid } from "./grid.client"

const manager = new FilterManager()

export function CategoryMerchandisingPage(props: {
  serverResult: KlevuQueryResult
  category: string
}) {
  // this is used to prevent useless re-render in client after server
  const prevCategoryIdRef = useRef<string>()
  useEffect(() => {
    prevCategoryIdRef.current = props.category
  })
  const prevCategoryId = prevCategoryIdRef.current

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
      categoryMerchandising(
        props.category,
        {
          id: "categoryMerchandising",
          offset,
          limit: result.meta.noOfResults,
        },
        applyFilterWithManager(manager)
      )
    )

    const searchResult = loadMoreResult.queriesById("categoryMerchandising")

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
    if (prevCategoryId === undefined) {
      return
    }
    if (prevCategoryId !== props.category) {
      loadMore(true)
    }
  }, [props.category])

  return (
    <ProductGrid
      result={result}
      products={products}
      manager={manager}
      type="categoryMerchandising"
      loadMore={() => loadMore(false)}
    />
  )
}
