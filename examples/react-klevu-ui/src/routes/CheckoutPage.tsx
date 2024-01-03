import { KlevuEvents, KlevuRecord } from "@klevu/core"
import {
  KlevuButton,
  KlevuProduct,
  KlevuProductGrid,
  KlevuRecommendations,
} from "@klevu/ui-react"
import groupBy from "lodash.groupby"
import React, { Fragment } from "react"
import { useCart } from "../cartContext"

export function CheckoutPage() {
  const cart = useCart()

  const buy = () => {
    const groupedProducts = groupBy(cart.items, (i) => i.id)
    const items = Object.entries(groupedProducts).map((entry) => {
      const data: KlevuRecord[] = entry[1] as KlevuRecord[]
      return {
        amount: data.length,
        product: data[0],
        override: {},
      }
    })
    KlevuEvents.buy({ items })

    cart.clear()
  }

  const clear = () => {
    cart.clear()
  }

  return (
    <Fragment>
      <h2> Checkout - products in cart</h2>

      <KlevuProductGrid>
        {cart.items.map((p, i) => (
          <KlevuProduct product={p} key={i} fixedWidth />
        ))}
      </KlevuProductGrid>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          margin: "16px 0",
        }}
      >
        <KlevuButton onClick={clear}>Clear</KlevuButton>
        <KlevuButton onClick={buy} disabled={cart.items.length === 0}>
          Buy products
        </KlevuButton>
      </div>

      <KlevuRecommendations
        recommendationTitle="Customers also bought..."
        recommendationId="k-ad471ddc-d8d0-4a5e-9fdf-702baf63b6b6"
        cartProductIds={cart.items.map((i) => ({ id: i.id }))}
      />
    </Fragment>
  )
}
