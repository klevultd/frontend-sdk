import { KlevuFetch, KlevuPackFetchResult } from "@klevu/core"
import { Fragment } from "react"
import { klevuQuery } from "./common"
import { ProductGrid } from "./grid"

async function getData(term: string) {
  const fetch = await KlevuFetch(...klevuQuery(term, true))
  return KlevuPackFetchResult(fetch as any)
}

export default async function Search(params: any) {
  const result = await getData(params.searchParams.term)

  return (
    <Fragment>
      <ProductGrid packedResult={result} term={params.searchParams.term} />
    </Fragment>
  )
}
