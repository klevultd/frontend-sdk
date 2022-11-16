import React, { Fragment, useCallback, useEffect, useMemo } from "react"
import ServerDom from "react-dom/server"
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

  const renderProductSlot = useCallback(
    (product: KlevuRecord, slot: string) => {
      if (slot === "bottom") {
        const div = document.createElement("div")
        createRoot(div).render(
          <KlevuButton
            onClick={() => {
              cart.add(product)
            }}
          >
            Add to cart
          </KlevuButton>
        )
        return div
      }

      return null
    },
    []
  )

  return (
    <Fragment>
      <KlevuMerchandising
        category={params.id}
        categoryTitle={navItem.label}
        renderProductSlot={renderProductSlot}
      ></KlevuMerchandising>
    </Fragment>
  )
}
