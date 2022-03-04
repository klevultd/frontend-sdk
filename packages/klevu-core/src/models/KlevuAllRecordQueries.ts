import { KlevuBaseQuery } from "./KlevuBaseQuery"
import { KlevuSimilarProductsQuery } from "./KlevuSimilarProductsQuery"
import { KlevuTrendingProductsQuery } from "./KlevuTrendingProductsQuery"
import { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery"

export type KlevuAllRecordQueries =
  | KlevuBaseQuery
  | KlevuSimilarProductsQuery
  | KlevuTrendingProductsQuery
  | KlevuAlsoViewedQuery
