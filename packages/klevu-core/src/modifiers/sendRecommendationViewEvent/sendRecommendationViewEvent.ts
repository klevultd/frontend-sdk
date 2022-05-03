import { KlevuFetchModifer } from "../index.js"
import {
  KlevuEvents,
  RecommendationViewEventMetaData,
} from "../../events/index.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuKMCRecommendations } from "../../queries/index.js"

const recommendationTypeOfRequests: KlevuTypeOfRequest[] = [
  KlevuTypeOfRequest.AlsoBought,
  KlevuTypeOfRequest.AlsoViewed,
  KlevuTypeOfRequest.NewArrivals,
  KlevuTypeOfRequest.SimilarProducts,
  KlevuTypeOfRequest.Trending,
]

/**
 * This modifier should be used with all recommendation requests. It sends
 * correct event data to klevu backend on recommendation view
 *
 * @category Modifiers
 * @returns
 */
export function sendRecommendationViewEvent(
  title: string,
  eventData?: RecommendationViewEventMetaData
): KlevuFetchModifer {
  return {
    klevuModifierId: "sendMerchandisingViewEvent",
    onResult: (res, f) => {
      // is used with kmcRecommendation query
      if (f.klevuFunctionId === "kmcRecommendation") {
        const products = res.queriesById(f.queries?.[0].id ?? "")?.records

        if (!products) {
          console.warn(
            "No result in recommendations. Can't send recommendationViewEvent"
          )
          return res
        }

        const kmcData = (f.params as { kmcConfig: KlevuKMCRecommendations })
          .kmcConfig

        if (!kmcData) {
          console.warn(
            "Problem with kmcData fetching. Can't send recommendationViewEvent"
          )
          return res
        }

        KlevuEvents.recommendationView(
          {
            ...kmcData.metadata,
            title,
          },
          products
        )
        return res
      }

      if (!eventData) {
        throw new Error(
          "Need to provider eventData parameter for custom view events"
        )
      }

      const queries = f.queries?.filter((q) =>
        recommendationTypeOfRequests.includes(q.typeOfRequest)
      )

      if (!queries || queries?.length == 0) {
        return res
      }

      const products = res.queriesById(queries[0].id)?.records

      if (!products) {
        console.warn(
          "No products in result. Can't send recommendationViewEvent"
        )
        return res
      }

      KlevuEvents.recommendationView(
        {
          ...eventData,
          title,
        },
        products
      )

      return res
    },
  }
}
