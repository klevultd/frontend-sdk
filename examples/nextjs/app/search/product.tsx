/* eslint-disable @next/next/no-img-element */
"use client"

import { KlevuRecord, KlevuResponseQueryObject } from "@klevu/core"

export function Product(props: {
  product: KlevuRecord
  searchResults: KlevuResponseQueryObject
}) {
  const clickProduct = (event: any) => {
    event.preventDefault()
    props.searchResults.searchClickEvent?.({
      productId: props.product.id,
      variantId: props.product.itemGroupId,
      autoSendViewEvent: false,
    })
    alert("Sent a analytical event for click")
  }

  return (
    <a href={props.product.url} onClick={clickProduct}>
      <img
        style={{ width: "100%" }}
        src={props.product.image}
        alt={props.product.name}
      />
      <h2>{props.product.name}</h2>
    </a>
  )
}
