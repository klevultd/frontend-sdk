"use client"

import {
  KlevuApiRawResponse,
  KlevuHydratePackedFetchResult,
  KlevuResponseQueryObject,
} from "@klevu/core"
import { klevuQuery } from "./common"
import { Product } from "./product"
import { Fragment, useEffect, useState } from "react"

export function ProductGrid(props: {
  packedResult: KlevuApiRawResponse
  term: string
}) {
  const [searchResults, setSearchResults] = useState<KlevuResponseQueryObject>()

  useEffect(() => {
    KlevuHydratePackedFetchResult(
      props.packedResult,
      klevuQuery(props.term, false)
    ).then((hydrated) => {
      setSearchResults(hydrated.queriesById("search"))
    })
  }, [props.packedResult, props.term])

  const loadMore = async () => {
    const result = await searchResults?.getPage()
    // simply just replaces all results
    setSearchResults(result?.queriesById("search"))

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Fragment>
      <div className="grid grid-cols-3 gap-4">
        {searchResults?.records.map((record, index) => (
          <Product key={index} product={record} searchResults={searchResults} />
        ))}
      </div>
      {searchResults?.hasNextPage() ? (
        <div className="grid justify-items-center m-8">
          <button className="p-4 bg-amber-600 rounded-md" onClick={loadMore}>
            Next page
          </button>
        </div>
      ) : null}
    </Fragment>
  )
}
