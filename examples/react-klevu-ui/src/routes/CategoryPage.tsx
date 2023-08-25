import React, { Fragment, useCallback } from "react"
import { createRoot } from "react-dom/client"
import { useParams } from "react-router-dom"
import { KlevuButton, KlevuMerchandising } from "@klevu/ui-react"
import { nav } from "../app"
import { KlevuRecord } from "@klevu/core"
import { useCart } from "../cartContext"

export function CategoryPage() {
  const params = useParams()
  const cart = useCart()
  const navItem = nav.find((n) => n.key === params.id)

  return (
    <Fragment>
      <KlevuMerchandising
        category={params.id}
        categoryTitle={navItem.label}
      ></KlevuMerchandising>
    </Fragment>
  )
}
