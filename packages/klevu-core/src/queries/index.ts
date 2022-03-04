import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries"
import { KlevuSuggestionQuery } from "../models/KlevuSuggestionQuery"
import type { LiteralUnion } from "type-fest"
import { KlevuFetchModifer } from "../modifiers"

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
  queries?: KlevuAllRecordQueries[]
  suggestions?: KlevuSuggestionQuery[]
  modifiers?: KlevuFetchModifer[]
}

export * from "./categoryListing/categoryListing"
export * from "./newarrivals/newarrivals"
export * from "./search/search"
export * from "./suggestions/suggestions"
export * from "./trending/trending"
export * from "./trendingSearch/trendingSearch"
export * from "./products/products"
export * from "./similarProducts/similarProducts"
export * from "./searchCategory/searchCategory"
export * from "./searchCms/searchCms"
