import React, { useState } from "react"
import {
  FetchResultEvents,
  FilterManager,
  KlevuQueryResult,
  KlevuRecord,
} from "@klevu/core"
import { Button, Container, Grid } from "@mui/material"
import { FilterDrawer, Product } from "examples-react"
import { useNavigate } from "@shopify/hydrogen"
import { getRecordHandle } from "./klevu/utils"

export function ProductGrid(props: {
  result: KlevuQueryResult
  products: KlevuRecord[]
  manager: FilterManager
  type: "search" | "categoryMerchandising" | "kmcRecommendation"
  loadMore: () => void
}) {
  const navigate = useNavigate()
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Manually create result events since we received raw response from server component
  const resultEvents = FetchResultEvents(props.result, {
    klevuFunctionId: props.type,
  })

  // Decide what function we should use to get product click event
  let clickEvent: (productId: string, variantId: string) => void
  if (resultEvents.getSearchClickSendEvent) {
    clickEvent = resultEvents.getSearchClickSendEvent()
  } else if (resultEvents.getRecommendationClickSendEvent) {
    clickEvent = resultEvents.getRecommendationClickSendEvent()
  } else if (resultEvents.getCategoryMerchandisingClickSendEvent) {
    clickEvent = resultEvents.getCategoryMerchandisingClickSendEvent()
  }

  // calculate this manually as there are no helpers from SDK due to server - client transfer
  const hasMoreResults =
    props.result.meta.totalResultsFound >
    props.result.meta.offset + props.result.meta.noOfResults

  return (
    <Container maxWidth="lg">
      <FilterDrawer
        manager={props.manager}
        onClose={() => setFiltersOpen(false)}
        open={filtersOpen}
        options={props.manager.options}
        sliders={props.manager.sliders}
      />
      <Button onClick={() => setFiltersOpen(true)}>Open filters</Button>
      <Grid container spacing={2}>
        {props.products.map((product) => (
          <Grid item key={product.id}>
            <Product
              product={product}
              onClick={(event) => {
                clickEvent(product.id, product.itemGroupId)
                navigate(`/products/${getRecordHandle(product)}`)
                event.preventDefault()
                return false
              }}
            />
          </Grid>
        ))}
      </Grid>
      {hasMoreResults && (
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
