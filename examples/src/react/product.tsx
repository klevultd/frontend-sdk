import React from "react"
import type { KlevuRecord } from "@klevu/core"
import { Typography } from "@mui/material"

export function Product(props: { product: KlevuRecord; onClick?: () => void }) {
  const p = props.product
  return (
    <div
      onClick={props.onClick}
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
