import { KlevuAnyTypeOfRecord, KlevuTypeOfRequest } from "."
import { KlevuBaseQuery } from "./KlevuBaseQuery.js"

/**
 * Klevu API query specific for Also Viewed recommendation
 */
export type KlevuAlsoViewedQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.AlsoViewed
  settings?: {
    context?: {
      recentObjects: Array<{
        typeOfRecord: KlevuAnyTypeOfRecord
        records: Array<{ id: string }>
      }>
    }
  }
}
