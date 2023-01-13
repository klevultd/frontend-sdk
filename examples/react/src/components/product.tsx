import React from "react"
import { Button, Typography } from "@mui/material"
import { css } from "@emotion/react"
import { CartItem, useCart } from "../cartContext"

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

/**
 * This product has been modified to be used with both React and Hydrogen example.
 * You should not use this component in your project.
 *
 * @param props
 * @returns
 */
export function Product(props: {
  product: CartItem
  onClick?: (event: React.MouseEvent) => void
  onAddToCart?: (product: CartItem) => void
  hideAddToCart?: boolean
}) {
  const p = props.product

  const cart = useCart()

  const addToCart: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    cart.add(props.product)

    event.preventDefault()
    event.stopPropagation()
    return false
  }

  return (
    <a
      href={`/products/${p.itemGroupId}/${p.id}`}
      onClick={(event) => {
        if (props.onClick) {
          props.onClick(event)
        }
      }}
      css={containerCss}
    >
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
        }).format(parseFloat(p.salePrice))}
      </Typography>
      {props.hideAddToCart ? null : (
        <Button variant="contained" color="primary" onClick={addToCart}>
          Add to cart
        </Button>
      )}
    </a>
  )
}
