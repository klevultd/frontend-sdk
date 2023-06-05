import type { KlevuAnyTypeOfRecord, KlevuTypeOfRequest } from "."
import type { KlevuBaseQuery } from "./KlevuBaseQuery.js"

export type KlevuSimilarProductsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.SimilarProducts
  settings: {
    context: {
      recentObjects: Array<{
        typeOfRecord: KlevuAnyTypeOfRecord
        records: Array<{ id: string }>
      }>
    }
  }
}
