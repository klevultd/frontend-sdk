import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries.js"
import { KlevuSuggestionQuery } from "../models/KlevuSuggestionQuery.js"
import { KlevuFetchModifer } from "../modifiers/index.js"
import { KlevuConfig, KlevuKMCRecommendations, KlevuRecord } from "../index.js"

/**
 * Internal. List of known KlevuFetchIds
 * @ignore
 */
export type KlevuFetchTypeId =
  | "search"
  | "suggestions"
  | "recommendation"
  | "categoryMerchandising"
  | "kmcRecommendation"
  | "raw"

export type KlevuFetchFunctionParams = {
  /**
   * Current id of function
   */
  id?: string

  /**
   * term used in the search
   */
  term?: string

  /**
   * KMC recommendation information
   */
  kmcConfig?: KlevuKMCRecommendations

  /**
   * A/B test information of request
   */
  abtest?: {
    abTestId: string
    abTestVariantId: string
  }

  /**
   * Which category merchandising was called
   */
  category?: string

  /**
   * If true modifier has sent a search event already
   */
  searchSendEventSent?: boolean
}

/**
 * What functions passed to KlevuFetch should implement
 */
export type KlevuFetchFunctionReturnValue = {
  /**
   * Id of function. Used only internally
   */
  klevuFunctionId: KlevuFetchTypeId

  /**
   * Some of the functions pass metadata that can be used in other places
   */
  params?: KlevuFetchFunctionParams

  /**
   * What queries should KlevuFetch do to backend
   */
  queries?: KlevuAllRecordQueries[]
  /**
   * What suggestions queries should do to backend
   */
  suggestions?: KlevuSuggestionQuery[]
  /**
   * List of modifiers set for this function
   */
  modifiers?: KlevuFetchModifer[]
  /**
   * Pass down the if config has been overridden.
   */
  configOverride?: KlevuConfig

  /**
   * Local memory cache products from previous results. Used by analytics when making page changes
   */
  previousResultRecords?: KlevuRecord[]
}

export * from "./categoryMerchandising/categoryMerchandising.js"
export * from "./newarrivals/newarrivals.js"
export * from "./search/search.js"
export * from "./suggestions/suggestions.js"
export * from "./trendingCategoryProducts/trendingCategoryProducts.js"
export * from "./trendingProducts/trendingProducts.js"
export * from "./products/products.js"
export * from "./similarProducts/similarProducts.js"
export * from "./searchCategory/searchCategory.js"
export * from "./searchCms/searchCms.js"
export * from "./kmcRecommendation/kmcRecommendation.js"
export * from "./raw/raw.js"
export * from "./recentlyViewedProducts/recentlyViewedProducts.js"
export * from "./boughtTogether/boughtTogether.js"
export * from "./visuallySimilar/visuallySimilar.js"
export * from "./alsoViewed/alsoViewed.js"
export * from "./imageSearch/imageSearch.js"
