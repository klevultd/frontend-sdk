import React, { Suspense } from "react"

import { FilterManager, KlevuFetch, KlevuPackFetchResult } from "@klevu/core"
import { useQuery, useRouteParams } from "@shopify/hydrogen"
import { CategoryMerchandisingPage } from "../../components/categoryMerchandisingPage.client"
import { Header } from "../../components/header.client"
import { KlevuInit } from "../../App.server"
import { merchandisingQuery } from "../../klevuQueries"

export default function Category(props: { pathname: string }) {
  const { handle } = useRouteParams()

  /**
   * Fetch result in server side
   */
  const query = useQuery([handle], async () => {
    const result = await KlevuFetch(
      ...merchandisingQuery(handle, new FilterManager())
    )

    return KlevuPackFetchResult(result)
  })

  return (
    <div>
      <Header pathname={props.pathname} />
      <Suspense fallback="loading">
        <KlevuInit>
          {query.data && (
            <CategoryMerchandisingPage
              serverResult={query.data}
              category={handle}
            />
          )}
        </KlevuInit>
      </Suspense>
    </div>
  )
}
