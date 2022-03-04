import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "."
import { KlevuBaseQuery } from "./KlevuBaseQuery"

export type KlevuSimilarProductsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.SimilarProducts
  settings: {
    context: {
      recentObjects: Array<{
        typeOfRecord: KlevuTypeOfRecord
        records: Array<{ id: string }>
      }>
    }
  }
}
