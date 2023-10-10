import { KlevuFetchModifer } from "../index.js"
import {
  KlevuEvents,
  RecommendationViewEventMetaData,
} from "../../events/index.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuEventV2Data } from "../../events/eventRequests.js"

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
 * @category Modifier
 * @returns
 */
export function sendRecommendationViewEvent(
  title?: string,
  eventData?: RecommendationViewEventMetaData,
  override?: Partial<KlevuEventV2Data>
): KlevuFetchModifer {
  return {
    klevuModifierId: "sendMerchandisingViewEvent",
    onResult: (res, f) => {
      // is used with kmcRecommendation query
      if (f.klevuFunctionId === "kmcRecommendation") {
        if (!title) {
          title = f.params?.kmcConfig?.metadata.title ?? ""
        }

        if (
          f.params &&
          f.params.kmcConfig?.search.recsAction &&
          f.params.kmcConfig.search.recsAction === "STATIC_CONTENT"
        ) {
          console.log("Static image analytics")
          // Add the code to perform static image analytics here.
          return
        }

        const products = res.queriesById(f.queries?.[0].id ?? "")?.records

        if (!products) {
          console.warn(
            "No result in recommendations. Can't send recommendationViewEvent"
          )
          return res
        }

        const kmcData = f.params?.kmcConfig

        if (!kmcData) {
          console.warn(
            "Problem with kmcData fetching. Can't send recommendationViewEvent"
          )
          return res
        }

        if (products.length === 0) {
          return res
        }

        KlevuEvents.recommendationView({
          recommendationMetadata: {
            ...kmcData.metadata,
            title,
          },
          products,
          override,
        })
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

      eventData.title = title ?? eventData.title

      KlevuEvents.recommendationView({
        recommendationMetadata: eventData,
        products,
      })

      return res
    },
  }
}
