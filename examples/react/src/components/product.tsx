import React from "react"
import { KlevuEvents } from "@klevu/core"
import type { KlevuRecord } from "@klevu/core"
import { Typography } from "@mui/material"
import { css } from "@emotion/react"
import { Link } from "react-router-dom"

const containerCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 180px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 6px;

  &:hover {
    border: 1px solid #e4e4e4;
  }

  .image {
    height: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .title {
    padding: 12px;
    height: 16px;
    font-size: 12px;
  }

  .price {
    padding: 12px;
    font-size: 18px;
    font-weight: bold;
  }
`

export function Product(props: {
  product: KlevuRecord
  onClick?: (product: KlevuRecord) => void
}) {
  const onClick = (event) => {
    const p = props.product
    KlevuEvents.productClick({
      klevu_productId: p.id,
      klevu_productName: p.name,
      klevu_productUrl: p.url,
      klevu_productGroupId: p.itemGroupId,
      klevu_productVariantId: "",
      klevu_keywords: "",
    })
    props.onClick && props.onClick(props.product)
    return false
  }
  const p = props.product
  return (
    <Link to={`/products/${p.id}`} onClick={onClick} css={containerCss}>
      <div
        className="image"
        style={{
          backgroundImage: `url(${p.imageUrl})`,
        }}
      ></div>
      <Typography variant="body2" className="title">
        {p.name}
      </Typography>
      <Typography variant="h6" className="price">
        {new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: p.currency,
        }).format(parseFloat(p.price))}
      </Typography>
    </Link>
  )
}
