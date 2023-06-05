import type { KlevuBaseQuery } from "./KlevuBaseQuery.js"
import type { KlevuSimilarProductsQuery } from "./KlevuSimilarProductsQuery.js"
import type { KlevuTrendingProductsQuery } from "./KlevuTrendingProductsQuery.js"
import type { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery.js"

/**
 * All possible record queries that can be used with {@link KlevuFetch} function
 */
export type KlevuAllRecordQueries =
  | KlevuBaseQuery
  | KlevuSimilarProductsQuery
  | KlevuTrendingProductsQuery
  | KlevuAlsoViewedQuery
