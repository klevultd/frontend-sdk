import { KlevuBaseQuery } from "./KlevuBaseQuery.js"
import { KlevuSimilarProductsQuery } from "./KlevuSimilarProductsQuery.js"
import { KlevuTrendingProductsQuery } from "./KlevuTrendingProductsQuery.js"
import { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery.js"

/**
 * All possible record queries that can be used with {@link KlevuFetch} function
 */
export type KlevuAllRecordQueries =
  | KlevuBaseQuery
  | KlevuSimilarProductsQuery
  | KlevuTrendingProductsQuery
  | KlevuAlsoViewedQuery
