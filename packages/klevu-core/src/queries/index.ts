import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries"
import { KlevuSuggestionQuery } from "../models/KlevuSuggestionQuery"
import type { LiteralUnion } from "type-fest"
import { KlevuFetchModifer } from "../modifiers"
import { KlevuConfig } from ".."

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

export * from "./categoryMerchandising/categoryMerchandising"
export * from "./newarrivals/newarrivals"
export * from "./search/search"
export * from "./suggestions/suggestions"
export * from "./trending/trending"
export * from "./trendingProducts/trendingProducts"
export * from "./products/products"
export * from "./similarProducts/similarProducts"
export * from "./searchCategory/searchCategory"
export * from "./searchCms/searchCms"
export * from "./kmcRecommendation/kmcRecommendation"
