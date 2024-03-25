import React from "react"
import { Button, Table, Tooltip, Typography } from "@mui/material"
import { css } from "@emotion/react"
import { CartItem, useCart } from "../cartContext"
import { useGlobalVariables } from "../globalVariablesContext"
import isUndefined from "lodash.isundefined"

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

const ScoreCard = ({
  label,
  value,
  tooltip = false,
}: {
  tooltip?: boolean
  label: string
  value: string | number | JSX.Element
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
      }}
    >
      <Typography
        style={{
          padding: "3px 0 0 0",
          fontWeight: "bold",
          color: tooltip ? "white" : "#2b556e",
          textAlign: tooltip ? "start" : "end",
          // border: "1px solid red",
          flex: 1,
          maxWidth: tooltip ? "30%" : "100%",
        }}
        variant="caption"
      >
        {label}:
      </Typography>
      <Typography
        style={{
          padding: "3px 0 0 0",
          textAlign: "start",
          flex: 1,
          // border: "1px solid red",
        }}
        variant="caption"
      >
        {value}
      </Typography>
    </div>
  )
}

const ProductCard = (props: {
  product: CartItem
  addToCart: (event) => void
  onClick?: (event: React.MouseEvent) => void
  onAddToCart?: (product: CartItem) => void
  hideAddToCart?: boolean
  debugMode: boolean
}) => {
  const p = props.product

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
      <Typography
        variant="body2"
        className="title"
        dangerouslySetInnerHTML={{ __html: p.name }}
      ></Typography>
      <Typography variant="h6" className="price">
        {new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: p.currency,
        }).format(parseFloat(p.salePrice))}
      </Typography>

      {props.debugMode && (
        <Table>
          {!isUndefined(p.score) && (
            <ScoreCard
              label="Score"
              value={p.score ? (+p.score).toFixed(5) : p.score}
            />
          )}
          {!isUndefined(p.klevu_product_boosting) && (
            <ScoreCard
              label="Product Boosting"
              value={
                p.klevu_product_boosting
                  ? (+p.klevu_product_boosting).toFixed(5)
                  : p.klevu_product_boosting
              }
            />
          )}
          {!isUndefined(p.klevu_bulk_boosting) && (
            <ScoreCard
              label="Rule-Based"
              value={
                p.klevu_bulk_boosting
                  ? (+p.klevu_bulk_boosting).toFixed(5)
                  : p.klevu_bulk_boosting
              }
            />
          )}
          {!isUndefined(p.klevu_selflearning_boosting) && (
            <ScoreCard
              label="SelfLearning"
              value={
                p.klevu_selflearning_boosting
                  ? (+p.klevu_selflearning_boosting).toFixed(5)
                  : p.klevu_selflearning_boosting
              }
            />
          )}
          {!isUndefined(p.klevu_manual_boosting) && (
            <ScoreCard
              label="Manual"
              value={
                p.klevu_manual_boosting
                  ? (+p.klevu_manual_boosting).toFixed(5)
                  : p.klevu_manual_boosting
              }
            />
          )}
        </Table>
      )}
      {props.hideAddToCart ? null : (
        <Button variant="contained" color="primary" onClick={props.addToCart}>
          Add to cart
        </Button>
      )}
    </a>
  )
}

const TooltipContent = (props: {
  klevu_applied_filter_boosts: string
  klevu_applied_keyword_boosts: string
}) => {
  console.log({ props })
  return (
    <div>
      {!isUndefined(props.klevu_applied_filter_boosts) && (
        <ScoreCard
          label="Filter Boosts"
          value={
            <ul style={{ padding: 0 }}>
              {props.klevu_applied_filter_boosts
                .split(";;")
                .filter((s) => s)
                .map((s) => {
                  const [one, two] = s.split("^")
                  return (
                    <li style={{ padding: 0 }}>
                      {one}(<span style={{ fontWeight: "bold" }}>{two}</span>)
                    </li>
                  )
                })}
            </ul>
          }
          tooltip
        />
      )}
      {!isUndefined(props.klevu_applied_keyword_boosts) && (
        <ScoreCard
          label="Keyword Boosts"
          value={
            <ul style={{ padding: 0 }}>
              {props.klevu_applied_keyword_boosts
                .split(";;")
                .filter((s) => s)
                .map((s) => {
                  const [one, two] = s.split("^")
                  return (
                    <li style={{ padding: 0 }}>
                      {one}(<span style={{ fontWeight: "bold" }}>{two}</span>)
                    </li>
                  )
                })}
            </ul>
          }
          tooltip
        />
      )}
    </div>
  )
}

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
  const { debugMode } = useGlobalVariables()
  const cart = useCart()

  const addToCart: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    cart.add(props.product)

    event.preventDefault()
    event.stopPropagation()
    return false
  }
  return debugMode &&
    (props.product.klevu_applied_filter_boosts ||
      props.product.klevu_applied_keyword_boosts) ? (
    <Tooltip placement="bottom" title={<TooltipContent {...props.product} />}>
      <div>
        <ProductCard {...props} debugMode={debugMode} addToCart={addToCart} />
      </div>
    </Tooltip>
  ) : (
    <ProductCard {...props} debugMode={debugMode} addToCart={addToCart} />
  )
}
