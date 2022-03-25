import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries.js"
import { KlevuSuggestionQuery } from "../models/KlevuSuggestionQuery.js"
import type { LiteralUnion } from "type-fest"
import { KlevuFetchModifer } from "../modifiers/index.js"
import { KlevuConfig } from "../index.js"

/**
 * Internal. List of known KlevuFetchIds
 * @ignore
 */
export type KlevuFetchId =
  | "search"
  | "suggestions"
  | "trending"
  | "newarrivals"
  | "categoryMerchandising"
  | "similarProducts"
  | "alsoViewed"
  | "kmcRecommendation"

/**
 * What functions passed to KlevuFetch should implement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KlevuFetchFunctionReturnValue<T = any> = {
  /**
   * Id of function. Used only internally
   */
  klevuFunctionId: LiteralUnion<KlevuFetchId, string>
  /**
   * Anything you wish to pass down as params incoming to function
   */
  params?: T
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
export * from "./trending/trending.js"
export * from "./trendingProducts/trendingProducts.js"
export * from "./products/products.js"
export * from "./similarProducts/similarProducts.js"
export * from "./searchCategory/searchCategory.js"
export * from "./searchCms/searchCms.js"
export * from "./kmcRecommendation/kmcRecommendation.js"
export * from "./raw/raw.js"
