import { LiteralUnion } from "type-fest"
import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries.js"
import { KlevuFetchResponse } from "../models/KlevuFetchResponse.js"

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
    response: Readonly<KlevuFetchResponse>,
    query: KlevuFetchFunctionReturnValue
  ) => KlevuFetchResponse
}

export * from "./applyFilter/applyFilter.js"
export * from "./applyFilterWithManager/applyFilterWithManager.js"
export * from "./fallback/fallback.js"
export * from "./listFilters/listFilters.js"
export * from "./boostWithKeywords/boostWithKeywords.js"
export * from "./boostWithRecords/boostWithRecords.js"
export * from "./boostWithFilters/boostWithFilters.js"
export * from "./boostWithFilterManager/boostWithFilterManager.js"
export * from "./include/include.js"
export * from "./top/top.js"
export * from "./sendSearchEvent/sendSearchEvent.js"
export * from "./debug/debug.js"
export * from "./sendMerchandisingViewEvent/sendMerchandisingViewEvent.js"
