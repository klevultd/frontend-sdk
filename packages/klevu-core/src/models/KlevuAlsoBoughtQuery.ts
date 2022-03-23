import { KlevuTypeOfRequest } from "."
import { KlevuBaseQuery } from "./KlevuBaseQuery.js"
import { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery.js"

/**
 * Backend API parameters relevat for Also Bought Recommendation query
 */
export type KlevuAlsoBoughtQuery = KlevuBaseQuery &
  KlevuAlsoViewedQuery & {
    typeOfRequest: KlevuTypeOfRequest.AlsoBought
  }
