import {
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

export function HomePage() {
  const [trendingRecs, setTrendingRecs] = useState<KlevuRecord[]>([])
  const [trendingRecsNoPersonlisation, setTrendingRecsNoPersonlisation] =
    useState<KlevuRecord[]>([])
  const [trendingResult, setTrendingResult] = useState<
    KlevuResponseQueryObject | undefined
  >()
  const [trendingResultNoPersonalisation, setTrendingResultNoPersonalisation] =
    useState<KlevuResponseQueryObject | undefined>()

  const fetchData = async () => {
    const result = await KlevuFetch(
      kmcRecommendation(
        config.homePageRecommendationId1,
        {
          id: "trendingrecs",
        },
        sendRecommendationViewEvent(
          "Trending recommendations using KMC builder personalised"
        )
      ),
      kmcRecommendation(
        config.homePageRecommendationId2,
        {
          id: "trendingrecs-nopersonalisation",
        },
        sendRecommendationViewEvent(
          "Trending recommendations using KMC builder"
        )
      )
    )

    setTrendingResult(result.queriesById("trendingrecs"))
    setTrendingResultNoPersonalisation(
      result.queriesById("trendingrecs-nopersonalisation")
    )

    setTrendingRecs(result.queriesById("trendingrecs")?.records)
    setTrendingRecsNoPersonlisation(
      result.queriesById("trendingrecs-nopersonalisation")?.records
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
