import {
  fallback,
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  kmcRecommendation,
  personalisation,
  trendingProducts,
} from "@klevu/core"
import { Button, Container, Grid, Typography } from "@mui/material"
import { useCart } from "../cartContext"
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
        fallback(trendingProducts()),
        personalisation()
      )
    )

    const fallbackResults = result.queriesById("alsobought-fallback")

    if (fallbackResults) {
      setAlsoBoughtProducts(fallbackResults.records)
    } else {
      eventClick = result
        .queriesById("alsobought")
        .getRecommendationClickSendEvent()
      setAlsoBoughtProducts(result.queriesById("alsobought").records)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const buy = () => {
    const groupedProducts = groupBy(cart.items, (i) => i.id)
    console.log(groupedProducts)
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
            <Product product={p} hideAddToCart />
          </Grid>
        ))}
      </Grid>

      <RecommendationBanner
        products={alsoBoughtProducts}
        title="Also bought together KMC recommendation"
        productClick={eventClick}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={buy}
        disabled={cart.items.length === 0}
      >
        Buy products
      </Button>
    </Container>
  )
}
