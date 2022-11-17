import { KlevuProduct, KlevuRecommendations } from "@klevu/ui-react"
import React, { Fragment } from "react"

export function HomePage() {
  return (
    <Fragment>
      <h1>Welcome to React components Klevu Shop homepage</h1>

      <p>
        This is a demo store that uses only Klevu React components (
        <a href="https://www.npmjs.com/package/@klevu/ui-react" target="_blank">
          @klevu/ui-react
        </a>
        )
      </p>

      <KlevuRecommendations
        recommendationTitle="Trending recommendations using KMC builder personalised"
        recommendationId="k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d"
      ></KlevuRecommendations>
      <KlevuRecommendations
        recommendationTitle="Trending recommendations using KMC builder"
        recommendationId="k-97cece7f-34de-4b3a-b0bc-8e3bfec86e72"
      ></KlevuRecommendations>
    </Fragment>
  )
}
