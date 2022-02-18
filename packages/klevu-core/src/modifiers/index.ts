import { LiteralUnion } from "type-fest"
import { AllRecordQueries, KlevuResponse } from "../connection/queryModels"

export type KlevuModifierId = "listfilters" | "applyFilters" | "fallback"

export type KlevuFetchModifer = {
  klevuModifierId: LiteralUnion<KlevuModifierId, string>
  modifyAfter: (queries: Readonly<AllRecordQueries[]>) => AllRecordQueries[]
  onResult?: (response: KlevuResponse) => void
}

export * from "./applyFilter/applyFilter"
export * from "./applyFilterWithManager/applyFilterWithManager"
export * from "./fallback/fallback"
export * from "./listFilters/listFilters"
