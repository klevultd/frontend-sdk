import {
  KMCRecommendationLogic,
  KlevuFetch,
  KlevuRecord,
  KlevuResponseQueryObject,
  kmcRecommendation,
  newArrivals,
  personalisation,
  sendRecommendationViewEvent,
} from "@klevu/core"
import { Container, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { RecommendationBanner } from "../components/recommendationBanner"
import { config } from "../config"
import { useGlobalVariables } from "../globalVariablesContext"

export function HomePage() {
  const [newArrivalRecords, setNewArrivalRecords] = useState<KlevuRecord[]>([])
  const [newArrivalsRecs, setNewArrivalsRecs] = useState<
    KlevuResponseQueryObject | undefined
  >()
  const [trendingRecs, setTrendingRecs] = useState<KlevuRecord[]>([])
  useState<KlevuResponseQueryObject | undefined>()
  const [trendingRecsNoPersonlisation, setTrendingRecsNoPersonlisation] =
    useState<KlevuRecord[]>([])
  const [trendingResult, setTrendingResult] = useState<
    KlevuResponseQueryObject | undefined
  >()
  const [trendingResultNoPersonalisation, setTrendingResultNoPersonalisation] =
    useState<KlevuResponseQueryObject | undefined>()
  const { debugMode } = useGlobalVariables()

  const fetchData = async () => {
    if (!config.homePageRecommendationId1 && !config.homePageRecommendationId2)
      return
    let trendingPersonalisedPayload, trendingPayload
    const trendingRecsId = "trendingrecs" + new Date().getTime()
    const trendingRecsNonPersonalizedId =
      "trendingrecs-nopersonalisation" + new Date().getTime()
    try {
      if (config.homePageRecommendationId1) {
        trendingPersonalisedPayload = await kmcRecommendation(
          config.homePageRecommendationId1,
          {
            id: trendingRecsId,
            mode: "demo",
            searchPrefs: debugMode ? ["debugQuery"] : undefined,
          },
          sendRecommendationViewEvent({
            logic: KMCRecommendationLogic.Trending,
            recsKey: "trending-recs-personalised-demo",
            title: "Trending recommendations using KMC builder personalised",
          })
        )
      }
      if (config.homePageRecommendationId2) {
        trendingPayload = await kmcRecommendation(
          config.homePageRecommendationId2,
          {
            id: trendingRecsNonPersonalizedId,
            mode: "demo",
            searchPrefs: debugMode ? ["debugQuery"] : undefined,
          },
          sendRecommendationViewEvent({
            logic: KMCRecommendationLogic.Trending,
            recsKey: "trending-recs-demo",
            title: "Trending recommendations using KMC builder",
          })
        )
      }
    } catch (error) {
      console.log("*********")
      console.error("Failed to load recs on home page", error)
    }
    console.log("Generated payloads", {
      trendingPersonalisedPayload,
      trendingPayload,
    })
    if (
      !trendingPersonalisedPayload?.queries ||
      trendingPersonalisedPayload.queries.length === 0
    ) {
      console.log(
        "personalized trending recs not found for id ",
        config.homePageRecommendationId1
      )
      trendingPersonalisedPayload = {
        queries: await personalisation().modifyAfter(
          [
            {
              id: trendingRecsId,
              typeOfRequest: "RECS_TRENDING",
              settings: {
                typeOfRecords: ["KLEVU_PRODUCT"],
                limit: 8,
                id: trendingRecsId,
                mode: "demo",
              },
            },
          ],
          "kmcRecommendation"
        ),
      }
      console.log("Updated personalised trending payload", {
        trendingPersonalisedPayload,
      })
    }
    if (!trendingPayload?.queries || trendingPayload.queries.length === 0) {
      console.log(
        "trending recs not found for id ",
        config.homePageRecommendationId2
      )
      trendingPayload = {
        queries: [
          {
            id: trendingRecsNoPersonlisation,
            typeOfRequest: "RECS_TRENDING",
            settings: {
              typeOfRecords: ["KLEVU_PRODUCT"],
              limit: 8,
              id: trendingRecsNoPersonlisation,
              mode: "demo",
            },
          },
        ],
      }
      console.log("Updated trending payload", {
        trendingPersonalisedPayload,
      })
    }

    const result = await KlevuFetch(
      trendingPersonalisedPayload || {},
      trendingPayload || {},
      newArrivals(undefined, { id: "newArrivals" })
    )
    if (trendingPersonalisedPayload?.queries?.length > 0) {
      setTrendingResult(result.queriesById(trendingRecsId))
      setTrendingRecs(result.queriesById(trendingRecsId)?.records)
    }
    if (trendingPayload?.queries?.length > 0) {
      setTrendingResultNoPersonalisation(
        result.queriesById(trendingRecsNonPersonalizedId)
      )
      setTrendingRecsNoPersonlisation(
        result.queriesById(trendingRecsNonPersonalizedId)?.records
      )
    }
    setNewArrivalRecords(result.queriesById("newArrivals").records)
    setNewArrivalsRecs(result.queriesById("newArrivals"))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Typography variant="h1" style={{ textAlign: "center" }}>
          Welcome to React Klevu Shop homepage
        </Typography>

        <Typography
          variant="body1"
          style={{
            marginTop: "2rem",
          }}
        >
          This is a demo store build with React, React Router, Material UI and
          @klevu/core. It displays all the features of the @klevu/core and
          implement everything as a example.
        </Typography>

        {trendingRecs.length > 0 && (
          <RecommendationBanner
            products={trendingRecs}
            title="Trending products for you"
            productClick={(productId, variantId) => {
              trendingResult.recommendationClickEvent?.({
                productId,
                variantId,
              })
            }}
          />
        )}

        {trendingRecsNoPersonlisation.length > 0 && (
          <RecommendationBanner
            products={trendingRecsNoPersonlisation}
            title="Trending products"
            productClick={(productId, variantId) => {
              trendingResultNoPersonalisation.recommendationClickEvent?.({
                productId,
                variantId,
              })
            }}
          />
        )}
        {trendingRecsNoPersonlisation.length > 0 && (
          <RecommendationBanner
            products={newArrivalRecords}
            title="New Arrivals"
            productClick={(productId, variantId) => {
              newArrivalsRecs.recommendationClickEvent?.({
                productId,
                variantId,
              })
            }}
          />
        )}
      </Container>
    </Fragment>
  )
}
