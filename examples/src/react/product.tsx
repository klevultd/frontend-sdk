import React from "react"
import { KlevuEvents } from "@klevu/core"
import type { KlevuRecord } from "@klevu/core"
import { Typography } from "@mui/material"

export function Product(props: {
  product: KlevuRecord
  onClick?: (product: KlevuRecord) => void
}) {
  const onClick = () => {
    const p = props.product
    KlevuEvents.onProductClick({
      klevu_productId: p.id,
      klevu_productName: p.name,
      klevu_productUrl: p.url,
      klevu_productGroupId: p.itemGroupId,
      klevu_productVariantId: "",
      klevu_keywords: "",
    })
    props.onClick && props.onClick(props.product)
  }
  const p = props.product
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "150px",
        textAlign: "center",
        verticalAlign: "top",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img src={p.imageUrl} style={{ height: "120px" }} />
      </div>
      <Typography variant="body2">{p.name}</Typography>
    </div>
  )
}
