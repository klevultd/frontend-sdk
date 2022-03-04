import { KlevuTypeOfRequest } from "."
import { KlevuBaseQuery } from "./KlevuBaseQuery"
import { KlevuAlsoViewedQuery } from "./KlevuAlsoViewedQuery"

/**
 * Backend API parameters relevat for Also Bought Recommendation query
 */
export type KlevuAlsoBoughtQuery = KlevuBaseQuery &
  KlevuAlsoViewedQuery & {
    typeOfRequest: KlevuTypeOfRequest.AlsoBought
  }
