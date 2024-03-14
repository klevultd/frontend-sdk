import {
  KMCRecommendationLogic,
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  KlevuResponseQueryObject,
  kmcRecommendation,
  sendRecommendationViewEvent,
} from "@klevu/core"
import { Button, Container, Grid, Typography } from "@mui/material"
import { CartItem, useCart } from "../cartContext"
import { Product } from "../components/product"
import groupBy from "lodash.groupby"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { RecommendationBanner } from "../components/recommendationBanner"
import { config } from "../config"
import { useNavigate } from "react-router-dom"
import { useGlobalVariables } from "../globalVariablesContext"

export function CheckoutPage() {
  const [alsoBoughtProducts, setAlsoBoughtProducts] = useState<KlevuRecord[]>(
    []
  )
  const [alsoBoughtResult, setAlsoBoughtResult] = useState<
    KlevuResponseQueryObject | undefined
  >()

  const cart = useCart()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { debugMode } = useGlobalVariables()

  const fetchData = async () => {
    const alsoBoughtId = "alsobought" + new Date().getTime()
    const result = await KlevuFetch(
      kmcRecommendation(
        config.checkoutPageRecommendationId,
        {
          id: alsoBoughtId,
          cartProductIds: cart.items.map((p) => p.id),
          mode: "demo",
          searchPrefs: debugMode ? ["debugQuery"] : undefined,
        },
        sendRecommendationViewEvent({
          logic: KMCRecommendationLogic.BoughtTogether,
          recsKey: "also-bought-together-demo",
          title: "Also bought together KMC recommendation",
        })
      )
    )

    setAlsoBoughtResult(result.queriesById(alsoBoughtId))
    setAlsoBoughtProducts(result.queriesById(alsoBoughtId).records)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const buy = () => {
    const groupedProducts = groupBy(cart.items, (i) => i.id)
    const toBuy = Object.entries(groupedProducts).map((entry) => {
      const data: KlevuRecord[] = entry[1] as KlevuRecord[]
      const item: Parameters<typeof KlevuEvents.buy>[0]["items"][number] = {
        product: data[0],
        amount: data.length,
      }
      return item
    })
    KlevuEvents.buy({ items: toBuy })

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
        productClick={(productId, variantId) => {
          alsoBoughtResult.recommendationClickEvent?.({
            productId,
            variantId,
          })
        }}
      />
    </Container>
  )
}
