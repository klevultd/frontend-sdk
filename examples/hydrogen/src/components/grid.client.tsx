import React, { useState } from "react"
import { FilterManager, KlevuRecord } from "@klevu/core"
import { Button, Container, Grid } from "@mui/material"
import { FilterDrawer, Product } from "examples-react"
import { useNavigate } from "@shopify/hydrogen"
import { getRecordHandle } from "./klevu/utils"

export function ProductGrid(props: {
  products: KlevuRecord[]
  manager: FilterManager
  onClick: (product: KlevuRecord) => void
  hasMoreResults: boolean
  loadMore: () => void
}) {
  const navigate = useNavigate()
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <Container maxWidth="lg">
      <FilterDrawer
        manager={props.manager}
        onClose={() => setFiltersOpen(false)}
        open={filtersOpen}
        options={props.manager.options}
        sliders={props.manager.sliders}
      />
      <Button variant="contained" onClick={() => setFiltersOpen(true)}>
        Open filters
      </Button>
      <Grid container spacing={2}>
        {props.products.map((product) => (
          <Grid item key={product.id}>
            <Product
              product={product}
              onClick={(event) => {
                props.onClick(product)
                navigate(`/products/${getRecordHandle(product)}`)
                event.preventDefault()
                return false
              }}
              hideAddToCart
            />
          </Grid>
        ))}
      </Grid>
      {props.hasMoreResults && (
        <div
          style={{
            margin: "4rem auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={props.loadMore}>
            Load more
          </Button>
        </div>
      )}
    </Container>
  )
}
