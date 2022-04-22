import {
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  products,
  similarProducts,
  KMCRecommendationLogic,
} from "@klevu/core"
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../cartContext"
import { RecommendationBanner } from "../components/recommendationBanner"
import { useSnackbar } from "notistack"
import { LoadingIndicator } from "../components/loadingIndicator"

export function ProductPage() {
  const [product, setProduct] = useState<KlevuRecord>()
  const [similar, setSimilar] = useState<KlevuRecord[]>([])
  const params = useParams()
  const cart = useCart()
  const { enqueueSnackbar } = useSnackbar()

  const fetchProduct = useCallback(async () => {
    const res = await KlevuFetch(products([params.id]))
    const product = res.queriesById("products")?.records?.[0]
    setProduct(product)

    const similarRes = await KlevuFetch(similarProducts([product.id]))

    setSimilar(similarRes.queriesById("similar")?.records)
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
      </div>
    </Container>
  )
}
