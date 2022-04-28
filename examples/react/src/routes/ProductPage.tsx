import {
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  products,
  similarProducts,
  KMCRecommendationLogic,
  kmcRecommendation,
} from "@klevu/core"
import { Button, Container, Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../cartContext"
import { RecommendationBanner } from "../components/recommendationBanner"
import { useSnackbar } from "notistack"
import { LoadingIndicator } from "../components/loadingIndicator"

let alsoBoughtClick

export function ProductPage() {
  const [product, setProduct] = useState<KlevuRecord>()
  const [similar, setSimilar] = useState<KlevuRecord[]>([])
  const [alsoBought, setAlsoBoought] = useState<KlevuRecord[]>([])
  const params = useParams()
  const cart = useCart()
  const { enqueueSnackbar } = useSnackbar()

  const fetchProduct = useCallback(async () => {
    const res = await KlevuFetch(
      products([params.id]),
      similarProducts([params.id]),
      kmcRecommendation("k-efd5337c-051e-44a2-810c-e23de2be513f", {
        id: "alsobought",
        currentProductId: params.id,
      })
    )
    const product = res.queriesById("products")?.records?.[0]
    const sim = res.queriesById("similar")
    const also = res.queriesById("alsobought")
    setProduct(product)
    setSimilar(sim?.records)
    setAlsoBoought(also?.records)

    alsoBoughtClick = also.getRecommendationClickSendEvent()
  }, [params.id])

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const addToCart: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    cart.add(product)
    enqueueSnackbar(`Added ${product.name} to shopport cart`, {
      variant: "success",
    })
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  if (!product) {
    return <LoadingIndicator />
  }

  return (
    <Container maxWidth="lg">
      <div>
        <Typography variant="h2" style={{ marginBottom: "2rem" }}>
          {product.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ maxWidth: "100%", border: "1px solid #ccc" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>{product.shortDesc || "No description 🤷‍♂️"}</p>
            <Button variant="contained" color="primary" onClick={addToCart}>
              Add to cart
            </Button>
          </Grid>
        </Grid>

        <RecommendationBanner
          products={similar}
          title="Similar products"
          productClick={(productId, variantId, product, index) => {
            // Example how to create custom recommendation event
            KlevuEvents.recommendationClick(
              {
                recsKey: "product-similar",
                logic: KMCRecommendationLogic.Similar,
                title: "Similar products",
              },
              product,
              index
            )
          }}
        />

        <RecommendationBanner
          products={alsoBought}
          title="Also bought together KMC recommendation"
          productClick={alsoBoughtClick}
        />
      </div>
    </Container>
  )
}
