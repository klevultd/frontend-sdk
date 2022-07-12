import {
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  kmcRecommendation,
  personalisation,
  sendRecommendationViewEvent,
} from "@klevu/core"
import { Button, Container, Grid, Typography } from "@mui/material"
import { CartItem, useCart } from "../cartContext"
import { Product } from "../components/product"
import groupBy from "lodash.groupby"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { RecommendationBanner } from "../components/recommendationBanner"

let eventClick

export function CheckoutPage() {
  const [alsoBoughtProducts, setAlsoBoughtProducts] = useState<KlevuRecord[]>(
    []
  )

  const cart = useCart()
  const { enqueueSnackbar } = useSnackbar()

  const fetchData = async () => {
    const result = await KlevuFetch(
      kmcRecommendation(
        "k-ad471ddc-d8d0-4a5e-9fdf-702baf63b6b6",
        {
          id: "alsobought",
          cartProductIds: cart.items.map((p) => p.id),
        },
        sendRecommendationViewEvent("Also bought together KMC recommendation")
      )
    )

    eventClick = result
      .queriesById("alsobought")
      .getRecommendationClickSendEvent()
    setAlsoBoughtProducts(result.queriesById("alsobought").records)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const buy = () => {
    const groupedProducts = groupBy(cart.items, (i) => i.id)
    const toBuy = Object.entries(groupedProducts).map((entry) => {
      const data: KlevuRecord[] = entry[1] as KlevuRecord[]
      return {
        amount: data.length,
        product: data[0],
      }
    })
    KlevuEvents.buy(toBuy)

    enqueueSnackbar("Items bought!", {
      variant: "info",
    })
    cart.clear()
  }

  const clear = () => {
    enqueueSnackbar("Items cleared.", {
      variant: "warning",
    })
    cart.clear()
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" style={{ textAlign: "center" }}>
        Checkout - products in cart
      </Typography>
      <Grid
        container
        spacing={2}
        style={{
          margin: "24px",
        }}
      >
        {cart.items.map((p, i) => (
          <Grid item key={i}>
            <Product
              product={p}
              hideAddToCart
              onClick={(event) => {
                navigate(`/products/${p.itemGroupId}/${p.id}`)
                event.preventDefault()
                return false
              }}
            />
          </Grid>
        ))}
      </Grid>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <Button variant="outlined" color="secondary" onClick={clear}>
          Clear
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={buy}
          disabled={cart.items.length === 0}
        >
          Buy products
        </Button>
      </div>

      <RecommendationBanner
        products={alsoBoughtProducts}
        title="Also bought together KMC recommendation"
        productClick={eventClick}
      />
    </Container>
  )
}
