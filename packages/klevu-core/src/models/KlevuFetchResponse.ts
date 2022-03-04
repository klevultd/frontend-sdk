import { FilterManager } from "../store/filterManager"
import { KlevuSuggestionResult } from "./KlevuSuggestionResult"
import { KlevuApiRawResponse, KlevuQueryResult } from "./KlevuApiRawResponse"

/**
 * Tools for operating results in easier way.
 */
export type KlevuFetchResponse = {
  /**
   * Raw response from Klevu API
   */
  apiResponse: null | KlevuApiRawResponse
  /**
   * Get suggestion by Id
   */
  suggestionsById: (id: string) => KlevuSuggestionResult | undefined
  /**
   * Get query result by id
   */
  queriesById: (id: string) => KlevuQueryResult | undefined
  /**
   * Next function is available if there are more results in the given query.
   * It is optimized function that removes parts from query that might slow down
   * the response and they are not needed after first request.
   */
  next?: (override?: {
    limit?: number
    filterManager?: FilterManager
  }) => Promise<KlevuFetchResponse>
}
