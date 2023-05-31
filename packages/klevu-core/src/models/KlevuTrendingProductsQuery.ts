import type { KlevuTypeOfRequest } from "."
import type { KlevuBaseQuery } from "./KlevuBaseQuery.js"

export type KlevuTrendingProductsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.Trending
  settings?: {
    query?: {
      term: "*"
      categoryPath?: string
    }
  }
}
