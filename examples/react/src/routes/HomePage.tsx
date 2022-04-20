import {
  KlevuFetch,
  KlevuRecord,
  kmcRecommendation,
  personalisation,
  sendRecommendationViewEvent,
} from "@klevu/core"
import { Container, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { RecommendationBanner } from "../components/recommendationBanner"

let eventClick

export function HomePage() {
  const [trendingRecs, setTrendingRecs] = useState<KlevuRecord[]>([])

  const fetchData = async () => {
    const result = await KlevuFetch(
      kmcRecommendation(
        "k-97cece7f-34de-4b3a-b0bc-8e3bfec86e72",
        {
          id: "trendingrecs",
        },
        sendRecommendationViewEvent(
          "Trending recommendations using KMC builder"
        ),
        personalisation()
      )
    )

    eventClick = result
      .queriesById("trendingrecs")
      .getRecommendationClickSendEvent()
    setTrendingRecs(result.queriesById("trendingrecs").records)
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
          @klevu/core. It should all the features of the @klevu/core and
          implement everything as a example.
        </Typography>

        <RecommendationBanner
          products={trendingRecs}
          title="Trending recommendations using KMC builder"
          productClick={eventClick}
        />
      </Container>
    </Fragment>
  )
}
