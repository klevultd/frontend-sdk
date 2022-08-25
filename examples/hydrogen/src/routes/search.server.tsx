import { FilterManager, KlevuFetch, KlevuPackFetchResult } from "@klevu/core"
import { useQuery } from "@shopify/hydrogen"
import React, { Suspense } from "react"
import { KlevuInit } from "../App.server"
import { Header } from "../components/header.client"
import { SearchResultPage } from "../components/searchResultPage.client"

// Function that creates query that is used both in frontend and backend.
import { searchQuery } from "../klevuQueries"

export default function Search(params: { pathname: string; search: string }) {
  const term = decodeURIComponent(params.search.split("?q=")[1])

  /**
   * Fetch result in server side
   */
  const query = useQuery([term], async () => {
    const result = await KlevuFetch(...searchQuery(term, new FilterManager()))

    /** pack query for transfering to client */
    return KlevuPackFetchResult(result)
  })

  return (
    <div>
      <Header pathname={params.pathname} />
      <Suspense fallback="loading">
        <KlevuInit>
          {query.data && (
            <SearchResultPage serverResult={query.data} term={term} />
          )}
        </KlevuInit>
      </Suspense>
    </div>
  )
}
