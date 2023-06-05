import type { KlevuTypeOfRequest } from "."
import type { KlevuBaseQuery } from "./KlevuBaseQuery.js"
import type { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery.js"

/**
 * Backend API parameters relevat for Also Bought Recommendation query
 */
export type KlevuAlsoBoughtQuery = KlevuBaseQuery &
  KlevuAlsoViewedQuery & {
    typeOfRequest: KlevuTypeOfRequest.AlsoBought
  }
