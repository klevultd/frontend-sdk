import { KlevuFetchModifer } from "../index.js"
import {
  KlevuEvents,
  RecommendationViewEventMetaData,
} from "../../events/index.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuRecommendationsEventV2Data } from "../../events/eventRequests.js"
import { KlevuRecord } from "../../models/KlevuRecord.js"

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
  eventData?: Partial<RecommendationViewEventMetaData> &
    Pick<RecommendationViewEventMetaData, "logic" | "recsKey" | "title">,
  override?: Partial<KlevuRecommendationsEventV2Data>
): KlevuFetchModifer {
  return {
    klevuModifierId: "sendMerchandisingViewEvent",
    onResult: (res, f) => {
      // is used with kmcRecommendation query
      if (f.klevuFunctionId === "kmcRecommendation") {
        let products: KlevuRecord[] | undefined
        if (res.queryExists(f.queries?.[0]?.id ?? "")) {
          products = res.queriesById(f.queries?.[0].id ?? "")?.records
        }

        const kmcData = f.params?.kmcConfig

        if (!kmcData) {
          console.warn(
            "Problem with kmcData fetching. Can't send recommendationViewEvent"
          )
          return res
        }

        KlevuEvents.recommendationView({
          recommendationMetadata: {
            ...kmcData.metadata,
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

      KlevuEvents.recommendationView({
        recommendationMetadata: eventData,
        products,
      })

      return res
    },
  }
}
