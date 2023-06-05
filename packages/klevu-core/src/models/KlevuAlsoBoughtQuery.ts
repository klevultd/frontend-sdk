import type {
  KlevuTypeOfRequest,
  KlevuBaseQuery,
  KlevuAlsoViewedQuery,
} from "./index.js"

/**
 * Backend API parameters relevat for Also Bought Recommendation query
 */
export type KlevuAlsoBoughtQuery = KlevuBaseQuery &
  KlevuAlsoViewedQuery & {
    typeOfRequest: KlevuTypeOfRequest.AlsoBought
  }
