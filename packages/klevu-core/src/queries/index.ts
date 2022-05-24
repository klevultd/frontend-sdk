import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries.js"
import { KlevuSuggestionQuery } from "../models/KlevuSuggestionQuery.js"
import { KlevuFetchModifer } from "../modifiers/index.js"
import { KlevuConfig } from "../index.js"

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

/**
 * What functions passed to KlevuFetch should implement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KlevuFetchFunctionReturnValue = {
  /**
   * Id of function. Used only internally
   */
  klevuFunctionId: KlevuFetchTypeId
  /**
   * Anything you wish to pass down as params incoming to function
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
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
