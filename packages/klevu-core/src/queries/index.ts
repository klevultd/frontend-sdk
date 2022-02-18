import {
  AllRecordQueries,
  KlevuSuggestionQuery,
} from "../connection/queryModels"
import type { LiteralUnion } from "type-fest"
import { KlevuFetchModifer } from "../modifiers"

export type KlevuFetchId =
  | "search"
  | "suggestions"
  | "trending"
  | "newarrivals"
  | "merchendising"

export type KlevuFetchFunction = {
  klevuFunctionId: LiteralUnion<KlevuFetchId, string>
  queries?: AllRecordQueries[]
  suggestions?: KlevuSuggestionQuery[]
  modifiers?: KlevuFetchModifer[]
}

export * from "./merchendising/merchendising"
export * from "./newarrivals/newarrivals"
export * from "./search/search"
export * from "./suggestions/suggestions"
export * from "./trending/trending"
export * from "./trendingSearch/trendingSearch"
export * from "./products/products"
