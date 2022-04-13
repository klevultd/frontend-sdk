import {
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  kmcRecommendation,
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
      kmcRecommendation("k-95d0920b-be19-4528-a5b9-6ff80ccedc69", {
        id: "alsobought",
        cartProductIds: cart.items.map((p) => p.id),
      })
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
