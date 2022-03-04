import { KlevuRecord, KlevuTypeOfSearch } from "."
import { KlevuSuggestionResult } from "./KlevuSuggestionResult"

export enum KlevuFilterType {
  Options = "OPTIONS",
  Slider = "SLIDER",
}

type KlevuFilterResult = {
  key: string
  label: string
  type: KlevuFilterType
}

export type KlevuFilterResultOptions = KlevuFilterResult & {
  type: KlevuFilterType.Options
  options: Array<{
    name: string
    value: string
    count: number
    selected: boolean
  }>
}

export type KlevuFilterResultSlider = KlevuFilterResult & {
  type: KlevuFilterType.Slider
  min: string
  max: string
  start: string
  end: string
}

export type KlevuQueryResult = {
  id: string
  filters?: Array<KlevuFilterResultOptions | KlevuFilterResultSlider>
  meta: {
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

export type KlevuApiRawResponse = {
  meta: {
    qTime: number
    responseCode: number
  }
  suggestionResults?: KlevuSuggestionResult[]
  queryResults?: KlevuQueryResult[]
}
