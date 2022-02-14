import {
  AllRecordQueries,
  KlevuApiResponse,
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
  onResult?: (response: KlevuApiResponse) => void
}

export * from "./search"
export * from "./recommendation"
export * from "./filters"
export * from "./merchendising"
