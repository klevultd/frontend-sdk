import { KlevuFetch, KlevuRecord, kmcRecommendation } from "@klevu/core"
import { Container, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { RecommendationBanner } from "../components/recommendationBanner"

export function HomePage() {
  const [trendingRecs, setTrendingRecs] = useState<KlevuRecord[]>([])

  const fetchData = async () => {
    const result = await KlevuFetch(
      kmcRecommendation("k-1c38efe1-143d-4768-a340-54cf422838bb", {
        id: "trendingrecs",
      })
    )

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
        />
      </Container>
    </Fragment>
  )
}
