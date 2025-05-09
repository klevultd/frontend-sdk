import {
  KlevuEvents,
  KlevuFetch,
  KlevuRecord,
  products,
  similarProducts,
  KMCRecommendationLogic,
  kmcRecommendation,
  sendRecommendationViewEvent,
  exclude,
  KlevuResponseQueryObject,
  alsoViewed,
} from "@klevu/core"
import { Button, Container, Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useState, Fragment } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../cartContext"
import { RecommendationBanner } from "../components/recommendationBanner"
import { useSnackbar } from "notistack"
import { LoadingIndicator } from "../components/loadingIndicator"
import { config } from "../config"
import { InspireMe } from "../components/inspireMe"
import { useGlobalVariables } from "../globalVariablesContext"

export function ProductPage() {
  const [product, setProduct] = useState<KlevuRecord>()
  const [similar, setSimilar] = useState<KlevuRecord[]>([])
  const [alsoviewed, setAlsoBoought] = useState<KlevuRecord[]>([])
  const [alsoResult, setAlsoResult] = useState<
    KlevuResponseQueryObject | undefined
  >()
  const params = useParams()
  const cart = useCart()
  const { enqueueSnackbar } = useSnackbar()
  const { debugMode } = useGlobalVariables()

  const fetchProduct = useCallback(async () => {
    const alsoViewedId = "alsoviewed" + new Date().getTime()
    let queryId = alsoViewedId
    const similarId = "similar" + new Date().getTime()
    let recsPayload
    try {
      if (config.productPageRecommendationId) {
        recsPayload = await kmcRecommendation(
          config.productPageRecommendationId,
          {
            id: queryId,
            currentProductId: params.id,
            itemGroupId: params.groupId,
            mode: "demo",
            searchPrefs: debugMode ? ["debugQuery"] : undefined,
          },
          sendRecommendationViewEvent({
            logic: KMCRecommendationLogic.OtherAlsoViewed,
            recsKey: "also-viewed-demo",
            title: "Also viewed KMC recommendation",
          })
        )
      }
    } catch (e) {
      console.error("Failed to load product page", e)
    }
    if (!recsPayload?.queries || recsPayload.queries.length === 0) {
      console.log(
        "product recs not found for id ",
        config.homePageRecommendationId1
      )
      recsPayload = alsoViewed()
      queryId = "alsoviewed"
      recsPayload.queries[0].settings.mode = "demo"
      console.log("Updated product recs payload", {
        recsPayload,
      })
    }
    const res = await KlevuFetch(
      products([params.id]),
      similarProducts(
        [params.id],
        {
          id: similarId,
          mode: "demo",
          searchPrefs: debugMode ? ["debugQuery"] : undefined,
        },
        exclude([params.groupId || ""])
      ),
      recsPayload || {}
    )

    const product = res.queriesById("products")?.records?.[0]
    const sim = res.queriesById(similarId)
    setProduct(product)
    setSimilar(sim?.records)
    if (recsPayload?.queries?.length > 0) {
      const also = res.queriesById(queryId)
      setAlsoBoought(also?.records)
      setAlsoResult(also)
    }
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
          <Grid
            item
            xs={12}
            sm={6}
            style={{ textAlign: "center", position: "relative" }}
          >
            <img
              srcSet={`${product.image.replace(
                "needtochange/",
                ""
              )}, ${product.image.replace("needtochange/", "pub/")}`}
              alt={product.name}
              style={{ maxWidth: "100%", width: "100%" }}
            />
            {params.groupId && (
              <InspireMe
                id={params.groupId}
                style={{ position: "absolute", top: "0", right: "0" }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {product.shortDesc?.length > 0 ? (
              <p>{product.shortDesc}</p>
            ) : (
              <Fragment>
                <p>
                  Perfect for leveling up your ecommerce style. Klevu Product
                  Discovery Platform captures e-commerce shoppers’ intent and
                  then leverages AI to provide highly relevant, personalized
                  online search and discovery experiences that go well beyond
                  keywords typed into the search box.
                </p>
                <p>
                  Using Klevu on your customer-facing ecommerce interfaces can
                  help you improve revenue per web session by 37%.
                </p>
                <p>
                  The Klevu Product Discovery Suite is equipped with the
                  following:
                </p>
                <ul>
                  <li>
                    Harness the power of real-time shopper intent with Smart
                    Search
                  </li>
                  <li>
                    Balance AI magic and strategic control with Smart Category
                    Merchandising
                  </li>
                  <li>
                    Delight shoppers with hyper-relevant Smart Product
                    Recommendations
                  </li>
                </ul>
                <p>
                  Using Klevu on your ecommerce website may cause product
                  discovery superpowers.
                </p>
              </Fragment>
            )}
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
            KlevuEvents.recommendationClick({
              product,
              productIndexInList: index,
              recommendationMetadata: {
                recsKey: "product-similar",
                logic: KMCRecommendationLogic.Similar,
                title: "Similar products",
                maxProducts: 1,
                productThreshold: 0,
                spotKey: "product-similar",
                spotName: "product-similar",
                segmentKey: null,
                segmentName: null,
                pageType: null,
                enabled: true,
              },
              variantId,
            })
          }}
        />

        {alsoviewed.length > 0 && (
          <RecommendationBanner
            products={alsoviewed}
            title="Also viewed"
            productClick={(productId, variantId, product, index) => {
              alsoResult.recommendationClickEvent?.({
                productId,
                variantId,
              })
            }}
          />
        )}
      </div>
    </Container>
  )
}
