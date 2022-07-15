import React, { Suspense } from "react"

import {
  categoryMerchandising,
  KlevuFetch,
  listFilters,
  sendMerchandisingViewEvent,
} from "@klevu/core"
import { useQuery, useRouteParams } from "@shopify/hydrogen"
import { CategoryMerchandisingPage } from "../../components/categoryMerchandisingPage.client"
import { Header } from "../../components/header.client"

export default function Category(props: { pathname: string }) {
  const { handle } = useRouteParams()

  /**
   * Fetch result in server side
   */
  const query = useQuery([handle], async () => {
    const result = await KlevuFetch(
      categoryMerchandising(
        handle,
        {
          id: "categoryMerchandising",
        },
        listFilters(),
        sendMerchandisingViewEvent(handle)
      )
    )

    // we need to get raw response since Hydrogen can't pass enriched response with helper functions
    return result.apiResponse?.queryResults?.find(
      (q) => q.id === "categoryMerchandising"
    )
  })

  return (
    <div>
      <Header pathname={props.pathname} />
      <Suspense fallback="loading">
        {query.data && (
          <CategoryMerchandisingPage
            serverResult={query.data}
            category={handle}
          />
        )}
      </Suspense>
    </div>
  )
}
