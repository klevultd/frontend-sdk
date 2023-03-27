import { FilterManager } from "../store/filterManager.js"
import { KlevuSuggestionResult } from "./KlevuSuggestionResult.js"
import { KlevuApiRawResponse, KlevuQueryResult } from "./KlevuApiRawResponse.js"
import { KlevuResultEvent } from "./KlevuResultEvent.js"
import { KlevuFetchFunctionParams } from "../queries/index.js"

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

  /**
   * Use page index to load certain page instead of next available. 0 is first page
   */
  pageIndex?: number
}) => Promise<KlevuFetchResponse>

/**
 * Fetch query results
 */
export type KlevuFetchQueryResult = KlevuQueryResult &
  KlevuResultEvent & {
    /**
     * If there are multiple pages of results next function is defined. Calling this function will result new result
     *
     * @deprecated use `getPage()` function instead of next
     */
    next?: KlevuNextFunc

    /**
     * Same as next function, but it is always returned even on the last page. Without parameters returns next page.
     */
    getPage?: KlevuNextFunc
    /**
     * All parameters defined in that query function
     */
    functionParams?: KlevuFetchFunctionParams
    /**
     * Get annotations result by query id, product id and language code
     */
    annotationsById?: (
      productId: string,
      languageCode: string
    ) => Promise<undefined | KlevuAnnotations>
  }
/**
 * Fetch query results
 */
export type KlevuAnnotations = {
  /** Api key that was used  */
  apiKey?: string
  /** Object containing the processed data  */
  annotations?: {
    /** Full term extracted from query  */
    fullTerm?: string
    /** Subjects extracted from query  */
    subjects?: Array<string>
  }
  /**  Response Message to for error processing */
  responseMessage?: string
  /**  Query time for error processing */
  qTime?: number
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
