import { KlevuFetchQueryResult, KlevuQueryResult } from "../../models/index.js"
import {
  KlevuResultEvent,
  KlevuResultEventOnResult,
} from "../../models/KlevuResultEvent.js"
import { KlevuFetchFunctionReturnValue } from "../../queries/index.js"
import { KlevuEvents } from "../../events/KlevuEvents.js"
import { extractActiveFilters } from "../../utils/extractActiveFilters.js"
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
  result: KlevuFetchQueryResult,
  func: KlevuFetchFunctionReturnValue
): KlevuFetchQueryResult {
  let searchViewSent = false
  const config = func.params?.kmcConfig

  switch (func.klevuFunctionId) {
    case "search": {
      result.getSearchClickSendEvent = function (
        productId,
        variantId?,
        override?
      ) {
        if (!searchViewSent) {
          KlevuEvents.search({
            term: result.meta.searchedTerm,
            totalResults: result.meta.noOfResults,
            typeOfSearch: result.meta.typeOfSearch,
            activeFilters: extractActiveFilters(result),
            override,
          })
          searchViewSent = true
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

        KlevuEvents.searchProductClick({
          product: record,
          searchTerm: result.meta.searchedTerm,
          variantId,
        })

        for (const hook of this.hooks ?? []) {
          hook({ type: "search", productId, variantId })
        }
      }
      break
    }

    case "categoryMerchandising": {
      result.getCategoryMerchandisingClickSendEvent = function (
        productId,
        categoryTitle,
        variantId?,
        override?
      ) {
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
          extractActiveFilters(result),
          override
        )

        for (const hook of this.hooks ?? []) {
          hook({ type: "categoryMerchandising", productId, variantId })
        }
      }

      break
    }

    case "kmcRecommendation": {
      result.getRecommendationClickSendEvent = function (
        productId,
        variantId?,
        override?
      ) {
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
          throw new Error("KlevuEvents: Recommendation kmcConfig not available")
        }

        const index = result.records.findIndex((r) => r.id === productId)
        KlevuEvents.recommendationClick({
          recommendationMetadata: config.metadata,
          product: record,
          productIndexInList: index + 1,
          variantId,
          override,
        })

        for (const hook of this.hooks ?? []) {
          hook({ type: "recommendation", productId, variantId })
        }
      }
    }
  }
  return result
}
