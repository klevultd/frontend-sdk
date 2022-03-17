import { LiteralUnion } from "type-fest"
import { KlevuFetchFunctionReturnValue } from ".."
import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries"
import { KlevuFetchResponse } from "../models/KlevuFetchResponse"

/**
 * @ignore
 */
export type KlevuModifierId =
  | "listfilters"
  | "applyFilters"
  | "fallback"
  | "boostWithKeywords"
  | "boostWithFilterManager"
  | "boostWithFilters"
  | "personalisation"

/**
 * @ignore
 */
export type KlevuFetchModifer = {
  klevuModifierId: LiteralUnion<KlevuModifierId, string>
  modifyAfter?: (
    queries: Readonly<KlevuAllRecordQueries[]>
  ) => KlevuAllRecordQueries[]
  onResult?: (
    response: KlevuFetchResponse,
    query: KlevuFetchFunctionReturnValue
  ) => void
}

export * from "./applyFilter/applyFilter"
export * from "./applyFilterWithManager/applyFilterWithManager"
export * from "./fallback/fallback"
export * from "./listFilters/listFilters"
export * from "./boostWithKeywords/boostWithKeywords"
export * from "./boostWithRecords/boostWithRecords"
export * from "./boostWithFilters/boostWithFilters"
export * from "./boostWithFilterManager/boostWithFilterManager"
export * from "./include/include"
export * from "./top/top"
export * from "./sendSearchEvent/sendSearchEvent"
export * from "./debug/debug"
