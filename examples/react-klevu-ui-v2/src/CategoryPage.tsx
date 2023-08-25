import React, { Fragment, useCallback } from "react"
import { createRoot } from "react-dom/client"
import { useParams } from "react-router-dom"
import { KlevuButton, KlevuMerchandising } from "@klevu/ui-react"
import { KlevuRecord } from "@klevu/core"
import { useCart } from "./cartContext"

export function CategoryPage() {
  const params = useParams()
  const cart = useCart()

  return (
    <Fragment>
      <KlevuMerchandising
        category={params.id}
        categoryTitle={"Category page"}
        useInfiniteScroll
      ></KlevuMerchandising>
    </Fragment>
  )
}
