import { KlevuFetch, listFilters, search, sendSearchEvent } from "@klevu/core"
import { useQuery } from "@shopify/hydrogen"
import React, { Suspense } from "react"
import { Header } from "../components/header.client"
import { SearchResultPage } from "../components/searchResultPage.client"

export default function Search(params: { pathname: string; search: string }) {
  const term = decodeURIComponent(params.search.split("?q=")[1])

  /**
   * Fetch result in server side
   */
  const query = useQuery([term], async () => {
    const result = await KlevuFetch(
      search(term, { id: "search" }, listFilters(), sendSearchEvent())
    )

    // we need to get raw response since Hydrogen can't pass enriched response with helper functions
    return result.apiResponse?.queryResults?.find((q) => q.id === "search")
  })

  return (
    <div>
      <Header pathname={params.pathname} />
      <Suspense fallback="loading">
        {query.data && (
          <SearchResultPage serverResult={query.data} term={term} />
        )}
      </Suspense>
    </div>
  )
}
