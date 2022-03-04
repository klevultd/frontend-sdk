import { KlevuRecord, KlevuTypeOfSearch } from "."
import { KlevuSuggestionResult } from "./KlevuSuggestionResult"

/**
 * Filter types Klevu support
 */
export enum KlevuFilterType {
  Options = "OPTIONS",
  Slider = "SLIDER",
}

/**
 * Generic keys for all filter types
 */
type KlevuFilterResult = {
  /**
   * Key of the filter
   */
  key: string
  /**
   * Label of the filter
   */
  label: string
  /**
   * Type of the filter
   */
  type: KlevuFilterType
}

export type KlevuFilterResultOptions = KlevuFilterResult & {
  type: KlevuFilterType.Options
  /**
   * Options of filter
   */
  options: Array<{
    /**
     * Name / label of filter
     */
    name: string
    /**
     * Value of filter. That will be sent to backend
     */
    value: string
    /**
     *
     */
    count: number
    /**
     * Was this filter selected on the query
     */
    selected: boolean
  }>
}

export type KlevuFilterResultSlider = KlevuFilterResult & {
  type: KlevuFilterType.Slider
  /**
   * Minimum value of slider
   */
  min: string
  /**
   * Maxium value of slider
   */
  max: string
  /**
   * Current start value slider
   */
  start: string
  /**
   * Current end value of slider
   */
  end: string
}

export type KlevuQueryResult = {
  /**
   * Id used when defining query
   */
  id: string
  /**
   * Currently available filters
   */
  filters?: Array<KlevuFilterResultOptions | KlevuFilterResultSlider>
  meta: {
    /**
     * Klevu API key
     */
    apiKey: string
    isPersonalised: boolean
    /**
     * The time taken by the Klevu Search engine to fetch the response.
     */
    qTime: number

    /**
     * The number of results requested to be returned for this query.
     */
    noOfResults: number

    /**
     * The total number of results found for this query.
     */
    totalResultsFound: number

    /**
     * The index of the first result returned in this response.
     */
    offset: number

    /**
     * The query type that was executed by Klevu to retrieve the results.
     */
    typeOfSearch: KlevuTypeOfSearch

    /**
     * Information that can be useful for debugging the query. For example, the
     * actual query that was fired by the Klevu Search engine, inclusive of any
     * synonyms or de-compounded words taken into consideration.
     */
    debuggingInformation: unknown

    /**
     * This may be populated with a code if any actions were taken on the
     * record. Possible values are: 1: Nothing to report. 2: The price of the
     * record is using the base currency.
     */
    notificationCode: number

    /**
     * The search term submitted for this query.
     */
    searchedTerm: string
  }
  records: Array<{ id: string } & KlevuRecord>
}

/**
 * Raw response from Klevu API
 */
export type KlevuApiRawResponse = {
  meta: {
    qTime: number
    responseCode: number
  }
  suggestionResults?: KlevuSuggestionResult[]
  queryResults?: KlevuQueryResult[]
}
