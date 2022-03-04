import { KlevuBaseQuery } from "./KlevuBaseQuery"
import { KlevuSimilarProductsQuery } from "./KlevuSimilarProductsQuery"
import { KlevuTrendingProductsQuery } from "./KlevuTrendingProductsQuery"
import { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery"

/**
 * All possible record queries that can be used with {@link KlevuFetch} function
 */
export type KlevuAllRecordQueries =
  | KlevuBaseQuery
  | KlevuSimilarProductsQuery
  | KlevuTrendingProductsQuery
  | KlevuAlsoViewedQuery
