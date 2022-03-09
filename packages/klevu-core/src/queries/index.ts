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
  | "categoryListing"
  | "similarProducts"
  | "alsoViewed"

/**
 * @ignore
 */
export type KlevuFetchFunction = {
  klevuFunctionId: LiteralUnion<KlevuFetchId, string>
  params?: any
  queries?: KlevuAllRecordQueries[]
  suggestions?: KlevuSuggestionQuery[]
  modifiers?: KlevuFetchModifer[]
  configOverride?: KlevuConfig
}

export * from "./categoryListing/categoryListing"
export * from "./newarrivals/newarrivals"
export * from "./search/search"
export * from "./suggestions/suggestions"
export * from "./trending/trending"
export * from "./trendingProducts/trendingProducts"
export * from "./products/products"
export * from "./similarProducts/similarProducts"
export * from "./searchCategory/searchCategory"
export * from "./searchCms/searchCms"
