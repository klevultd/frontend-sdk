import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "."
import { KlevuBaseQuery } from "./KlevuBaseQuery"

export type KlevuAlsoViewedQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.AlsoViewed
  settings?: {
    context?: {
      recentObjects: Array<{
        typeOfRecord: KlevuTypeOfRecord
        records: Array<{ id: string }>
      }>
    }
  }
}
