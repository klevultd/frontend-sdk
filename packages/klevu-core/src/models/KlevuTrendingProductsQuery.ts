import type { KlevuBaseQuery, KlevuTypeOfRequest } from "./index.js"

export type KlevuTrendingProductsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.Trending
  settings?: {
    query?: {
      term: "*"
      categoryPath?: string
    }
  }
}
