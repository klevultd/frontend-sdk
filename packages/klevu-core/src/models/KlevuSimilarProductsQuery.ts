import type {
  KlevuBaseQuery,
  KlevuAnyTypeOfRecord,
  KlevuTypeOfRequest,
} from "./index.js"

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
