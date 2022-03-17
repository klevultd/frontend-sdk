import React from "react"
import {
  categoryMerchandising,
  KlevuFetch,
  KlevuFetchResponse,
  KlevuQueryResult,
} from "@klevu/core"
import { Product, links as ProductLinks } from "~/components/product/product"
import { json, LoaderFunction, useLoaderData } from "remix"
import styles from "./../../../styles/index.css"
import { useState } from "react"

export function links() {
  return [...ProductLinks(), { rel: "stylesheet", href: styles }]
}

type LoaderData = {
  products?: KlevuQueryResult["records"]
  meta?: KlevuQueryResult["meta"]
}

export const loader: LoaderFunction = async () => {
  const result = await KlevuFetch(categoryMerchandising("Women"))
  const res = result.queriesById("categoryMerchandising")
  const loaderData: LoaderData = {
    products: res?.records ?? [],
    meta: res?.meta,
  }
  return json(loaderData)
}

export default function CategoryIndex() {
  const { products, meta } = useLoaderData<LoaderData>()
  const [visibleProducts, setVisibleProducts] = useState(products)

  // remix hydrates only json so we need to little trick where we save last response
  const [lastResponse, setLastResponse] = useState<KlevuFetchResponse>()

  const loadMore = async () => {
    let response = lastResponse

    // 2nd pagination is done in frontend
    if (!lastResponse) {
      response = await KlevuFetch(
        categoryMerchandising("Women", {
          offset: meta?.noOfResults,
          limit: meta?.noOfResults,
        })
      )
      // 3rd and after that are using the next function
    } else if (response && response.next) {
      response = await response.next()
    } else {
      // no more results
      return
    }

    const newProducts = [
      ...(visibleProducts ?? []),
      ...(response.queriesById("categoryMerchandising")?.records ?? []),
    ]

    setVisibleProducts(newProducts)
    setLastResponse(response)
  }

  return (
    <React.Fragment>
      <div className="products">
        {visibleProducts?.map((p) => (
          <Product product={p} />
        ))}
      </div>
      <button onClick={() => loadMore()}>Load more</button>
    </React.Fragment>
  )
}
