import { FilterManager } from "../store/filterManager.js"
import { KlevuSuggestionResult } from "./KlevuSuggestionResult.js"
import { KlevuApiRawResponse, KlevuQueryResult } from "./KlevuApiRawResponse.js"
import { KlevuResultEvent } from "./KlevuResultEvent.js"
import { KlevuFecthFunctionParams } from "../queries/index.js"

/**
 * Next function is available if there are more results in the given query.
 * It is optimized function that removes parts from query that might slow down
 * the response and they are not needed after first request.
 */
export type KlevuNextFunc = (override?: {
  /**
   * Limit number of results for next query. By default this is automatically calculated from previous result
   */
  limit?: number
  /**
   * Filter manager to apply for next function
   */
  filterManager?: FilterManager
}) => Promise<KlevuFetchResponse>

/**
 * Fetch query results
 */
export type KlevuFetchQueryResult = KlevuQueryResult &
  KlevuResultEvent & {
    /** If there are multiple pages of results next function is defined. Calling this function will result new result  */
    next?: KlevuNextFunc
    /**
     * All parameters defined in that query function
     */
    functionParams?: KlevuFecthFunctionParams
  }

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
  queriesById: (id: string) => KlevuFetchQueryResult | undefined
}
