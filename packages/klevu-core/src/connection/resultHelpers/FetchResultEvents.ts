import { KlevuQueryResult } from "../../models/index.js"
import { KlevuResultEvent } from "../../models/KlevuResultEvent.js"
import { KlevuFetchFunctionReturnValue } from "../../queries/index.js"
import { KlevuEvents } from "../../events/KlevuEvents.js"

/**
 * Automatically injects events helpers to klevuFetch result object.
 *
 * @ignore
 * @category KlevuEvents
 * @param result
 * @param func
 * @returns
 */
export function FetchResultEvents(
  result: KlevuQueryResult,
  func: KlevuFetchFunctionReturnValue
): KlevuResultEvent {
  switch (func.klevuFunctionId) {
    case "search": {
      return {
        getSearchClickSendEvent: () => {
          let viewSent = false
          return (productId, variantId?, override?) => {
            if (!viewSent) {
              KlevuEvents.search(
                result.meta.searchedTerm,
                result.meta.noOfResults,
                result.meta.typeOfSearch,
                override
              )
              viewSent = true
            }

            const record = [
              ...result.records,
              ...(func.previousResultRecords ?? []),
            ].find((r) => r.id === productId)
            if (!record) {
              throw new Error(
                `KlevuEvents: Given "${productId}" doesn't exists in results`
              )
            }

            KlevuEvents.searchProductClick(
              record,
              result.meta.searchedTerm,
              variantId
            )
          }
        },
      }
    }

    case "categoryMerchandising": {
      return {
        getCategoryMerchandisingClickSendEvent: () => {
          return (productId, categoryTitle, variantId?, override?) => {
            const record = [
              ...result.records,
              ...(func.previousResultRecords ?? []),
            ].find((r) => r.id === productId)

            if (!record) {
              throw new Error(
                `KlevuEvents: Given "${productId}" doesn't exists in results`
              )
            }

            const index = result.records.findIndex((r) => r.id === productId)

            const q = func.queries?.find((q) =>
              Boolean(q.settings?.query?.categoryPath)
            )

            let abTestId, abTestVariantId

            if (!func.params) {
              func.params = {}
            }

            if (func.params.abtest) {
              abTestId = func.params.abtest.abTestId
              abTestVariantId = func.params.abtest.abTestVariantId
            }

            KlevuEvents.categoryMerchandisingProductClick(
              record,
              categoryTitle,
              q?.settings?.query?.categoryPath ?? "unknown",
              variantId,
              index + 1,
              abTestId,
              abTestVariantId,
              override
            )
          }
        },
      }
    }

    case "kmcRecommendation": {
      const config = func.params?.kmcConfig

      return {
        getRecommendationClickSendEvent: () => {
          return (productId, variantId?, override?) => {
            const record = [
              ...result.records,
              ...(func.previousResultRecords ?? []),
            ].find((r) => r.id === productId)
            if (!record) {
              throw new Error(
                `KlevuEvents: Given "${productId}" doesn't exists in results`
              )
            }

            if (!config) {
              throw new Error(
                "KlevuEvents: Recommendation kmcConfig not available"
              )
            }

            const index = result.records.findIndex((r) => r.id === productId)
            KlevuEvents.recommendationClick(
              config.metadata,
              record,
              index + 1,
              variantId,
              override
            )
          }
        },
      }
    }

    default:
      return {}
  }
}
