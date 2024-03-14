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
    const trendingRecsId = "trendingrecs" + new Date().getTime()
    const trendingRecsNonPersonalizedId =
      "trendingrecs-nopersonalisation" + new Date().getTime()
    const result = await KlevuFetch(
      kmcRecommendation(
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
      ),
      kmcRecommendation(
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
    )

    setTrendingResult(result.queriesById(trendingRecsId))
    setTrendingResultNoPersonalisation(
      result.queriesById(trendingRecsNonPersonalizedId)
    )

    setTrendingRecs(result.queriesById(trendingRecsId)?.records)
    setTrendingRecsNoPersonlisation(
      result.queriesById(trendingRecsNonPersonalizedId)?.records
    )
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
      </Container>
    </Fragment>
  )
}
