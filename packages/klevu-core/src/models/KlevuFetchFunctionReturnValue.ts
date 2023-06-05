import { KlevuConfig } from "../config.js"
import {
  KlevuRecord,
  KlevuFetchModifer,
  KlevuFetchTypeId,
  KlevuFetchFunctionParams,
  KlevuSuggestionQuery,
  KlevuAllRecordQueries,
} from "./index.js"

/**
 * What functions passed to KlevuFetch should implement
 */

export type KlevuFetchFunctionReturnValue = {
  /**
   * Id of function. Used only internally
   */
  klevuFunctionId: KlevuFetchTypeId

  /**
   * Some of the functions pass metadata that can be used in other places
   */
  params?: KlevuFetchFunctionParams

  /**
   * What queries should KlevuFetch do to backend
   */
  queries?: KlevuAllRecordQueries[]
  /**
   * What suggestions queries should do to backend
   */
  suggestions?: KlevuSuggestionQuery[]
  /**
   * List of modifiers set for this function
   */
  modifiers?: KlevuFetchModifer[]
  /**
   * Pass down the if config has been overridden.
   */
  configOverride?: KlevuConfig

  /**
   * Local memory cache products from previous results. Used by analytics when making page changes
   */
  previousResultRecords?: KlevuRecord[]
}
