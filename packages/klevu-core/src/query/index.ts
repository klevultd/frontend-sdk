import {
  AllRecordQueries,
  KlevuSuggestionQuery,
} from "../connection/queryModels"
import type { LiteralUnion } from "type-fest"

export type KlevuFetchIds =
  | "search"
  | "suggestions"
  | "trending"
  | "newarrivals"
  | "merchendising"
  | "listfilters"
  | "applyFilters"

export type KlevuFetchFunction = {
  klevuFunctionId: LiteralUnion<KlevuFetchIds, string>
  queries?: AllRecordQueries[]
  suggestions?: KlevuSuggestionQuery[]
  modifyAfter?: (queries: AllRecordQueries[]) => AllRecordQueries[]
}

export * from "./search"
export * from "./recommendation"
export * from "./filters"
export * from "./merchendising"
