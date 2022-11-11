import React, { Fragment, useEffect } from "react"
import ServerDom from "react-dom/server"
import { useParams } from "react-router-dom"
import { KlevuButton, KlevuMerchandising } from "@klevu/ui-react"
import { nav } from "../app"
import { KlevuRecord } from "@klevu/core"
import { useCart } from "../cartContext"

export function CategoryPage() {
  const params = useParams()
  const cart = useCart()
  const navItem = nav.find((n) => n.key === params.id)

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const elem = event
        .composedPath()
        // @ts-ignore
        .find((e) => e.nodeName == "KLEVU-BUTTON") as HTMLKlevuButtonElement
      cart.add(JSON.parse(elem.dataset.product))
    })
  }, [])

  const renderProductSlot = (product: KlevuRecord, slot: string) => {
    if (slot === "bottom") {
      return ServerDom.renderToString(
        <KlevuButton data-product={JSON.stringify(product)}>
          Add to cart
        </KlevuButton>
      )
    }

    return null
  }

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
