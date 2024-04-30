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
  override?: Partial<KlevuRecommendationsEventV2Data>,
  isMobile?: boolean
): KlevuFetchModifer {
  return {
    klevuModifierId: "sendMerchandisingViewEvent",
    ssrOnResultFE: true,
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

        if (kmcData.staticContent && kmcData.staticContent.length !== 0) {
          const resolution = isMobile ? "mobile" : "desktop"
          const image =
            kmcData.staticContent[0].image.find(
              (image) => image.resolution === resolution
            ) ?? kmcData.staticContent[0].image[0]
          const bannerInfo = {
            resolution: resolution as "mobile" | "desktop",
            index: 1,
            banner_alt_tag: image.altTag,
            banner_image_url: image.url,
            content_type: "image" as const,
          }

          KlevuEvents.recommendationView({
            recommendationMetadata: {
              ...kmcData.metadata,
            },
            bannerInfo,
          })
        } else {
          KlevuEvents.recommendationView({
            recommendationMetadata: {
              ...kmcData.metadata,
            },
            products,
            override,
          })
        }

        return res
      }

      if (!eventData) {
        throw new Error(
          "Need to provide eventData parameter for custom view events"
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
