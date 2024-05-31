import {
  KMCRecommendationLogic,
  KlevuFetch,
  KlevuRecord,
  KlevuResponseQueryObject,
  kmcRecommendation,
  sendRecommendationViewEvent,
} from "@klevu/core"
import { Container, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { RecommendationBanner } from "../components/recommendationBanner"
import { config } from "../config"
import { useGlobalVariables } from "../globalVariablesContext"

export function HomePage() {
  const [trendingRecs, setTrendingRecs] = useState<KlevuRecord[]>([])
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
    let recsPayload1, recsPayload2
    const trendingRecsId = "trendingrecs" + new Date().getTime()
    const trendingRecsNonPersonalizedId =
      "trendingrecs-nopersonalisation" + new Date().getTime()
    try {
      if (config.homePageRecommendationId1) {
        recsPayload1 = await kmcRecommendation(
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
        recsPayload2 = await kmcRecommendation(
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
      console.error("Failed to load recs on home page", error)
    }
    const result = await KlevuFetch(recsPayload1 || {}, recsPayload2 || {})
    if (recsPayload1?.queries?.length > 0) {
      setTrendingResult(result.queriesById(trendingRecsId))
      setTrendingRecs(result.queriesById(trendingRecsId)?.records)
    }
    if (recsPayload2?.queries?.length > 0) {
      setTrendingResultNoPersonalisation(
        result.queriesById(trendingRecsNonPersonalizedId)
      )
      setTrendingRecsNoPersonlisation(
        result.queriesById(trendingRecsNonPersonalizedId)?.records
      )
    }
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
            title="Trending recommendations using KMC builder personalised"
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
            title="Trending recommendations using KMC builder"
            productClick={(productId, variantId) => {
              trendingResultNoPersonalisation.recommendationClickEvent?.({
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
