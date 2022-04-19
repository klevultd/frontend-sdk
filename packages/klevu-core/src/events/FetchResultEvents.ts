import { KlevuQueryResult } from "../models/index.js"
import { KlevuResultEvent } from "../models/KlevuResultEvent.js"
import {
  KlevuFetchFunctionReturnValue,
  KlevuKMCRecommendations,
} from "../queries/index.js"
import { KlevuEvents } from "./KlevuEvents.js"

export function FetchResultEvents(
  object: KlevuQueryResult,
  func: KlevuFetchFunctionReturnValue
): KlevuQueryResult & KlevuResultEvent {
  switch (func.klevuFunctionId) {
    case "search": {
      return {
        ...object,
        ...{
          getSearchClickSendEvent: () => {
            let viewSent = false
            return (productId: string, variantId?: string) => {
              if (!viewSent) {
                KlevuEvents.search(
                  object.meta.searchedTerm,
                  object.meta.noOfResults,
                  object.meta.typeOfSearch
                )
                viewSent = true
              }

              const record = object.records.find((r) => r.id === productId)
              if (!record) {
                throw new Error(
                  `KlevuEvents: Given "${productId}" doesn't exists in results`
                )
              }
              KlevuEvents.searchProductClick(
                record,
                object.meta.searchedTerm,
                variantId
              )
            }
          },
        },
      }
    }

    case "categoryMerchandising": {
      return {
        ...object,
        ...{
          getCategoryMerchandisingClickSendEvent: () => {
            return (
              productId: string,
              categoryTitle: string,
              variantId?: string
            ) => {
              const record = object.records.find((r) => r.id === productId)
              if (!record) {
                throw new Error(
                  `KlevuEvents: Given "${productId}" doesn't exists in results`
                )
              }

              const index = object.records.findIndex((r) => r.id === productId)

              const q = func.queries?.find((q) =>
                Boolean(q.settings?.query?.categoryPath)
              )

              KlevuEvents.categoryMerchandisingProductClick(
                record,
                categoryTitle,
                q?.settings?.query?.categoryPath ?? "unknown",
                variantId,
                index + 1
              )
            }
          },
        },
      }
    }

    case "kmcRecommendation": {
      const config = (func.params as { kmcConfig: KlevuKMCRecommendations })
        .kmcConfig
      return {
        ...object,
        ...{
          getRecommendationClickSendEvent: () => {
            return (productId: string) => {
              const record = object.records.find((r) => r.id === productId)
              if (!record) {
                throw new Error(
                  `KlevuEvents: Given "${productId}" doesn't exists in results`
                )
              }
              const index = object.records.findIndex((r) => r.id === productId)
              KlevuEvents.recommendationClick(
                config.metadata,
                record,
                index + 1
              )
            }
          },
        },
      }
    }

    default:
      return object
  }
}
