import Axios from "axios"
import { KlevuEvents } from "../events/events"
import { KlevuConfig } from "../index"
import { KlevuRecord, KlevuTypeOfRequest, KlevuTypeOfSearch } from "../model"
import {
  AllRecordQueries,
  isKlevuSearchQuery,
  KlevuSearchQuery,
  KlevuSuggestionQuery,
} from "./queryModels"

export type AllQueries = AllRecordQueries | KlevuSuggestionQuery

type KlevuPayload = {
  context: {
    apiKeys: string[]
  }
  recordQueries?: Array<AllRecordQueries>
  suggestions?: Array<KlevuSuggestionQuery>
}

type SuggestionResult = {
  id: string
  suggestions: Array<{
    suggest: string
  }>
}

enum FilterType {
  Options = "OPTIONS",
  Slider = "SLIDER",
}

type FilterResult = {
  key: string
  label: string
  type: FilterType
}

export type FilterResultOptions = FilterResult & {
  type: FilterType.Options
  options: Array<{
    name: string
    value: string
    count: number
    selected: boolean
  }>
}

function isFilterResultOptions(
  filter: FilterResultOptions | FilterResultSlider
): filter is FilterResultOptions {
  return filter.type === FilterType.Options
}

export type FilterResultSlider = FilterResult & {
  type: FilterType.Slider
  min: number
  max: number
  start: number
  end: number
}

function isFilterResultSlider(
  filter: FilterResultOptions | FilterResultSlider
): filter is FilterResultSlider {
  return filter.type === FilterType.Slider
}

type QueryResult = {
  id: string
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
     * Information that can be useful for debugging the query. For example, the actual query that was fired by the Klevu Search engine, inclusive of any synonyms or de-compounded words taken into consideration.
     */
    debuggingInformation: unknown

    /**
     * This may be populated with a code if any actions were taken on the record. Possible values are:
     * 1: Nothing to report.
     * 2: The price of the record is using the base currency.
     */
    notificationCode: number

    /**
     * The search term submitted for this query.
     */
    searchedTerm: string
  }
  records: Array<{ id: string } & KlevuRecord>
}

export type KlevuApiResponse = {
  meta: {
    qTime: number
    responseCode: number
  }
  suggestionResults?: SuggestionResult[]
  queryResults?: QueryResult[]
  filters?: Array<FilterResultOptions | FilterResultSlider>
}

export type KlevuResponse = {
  apiResponse: null | KlevuApiResponse
  filters?: Array<FilterResultOptions | FilterResultSlider>
  suggestionsById: (id: string) => SuggestionResult | undefined
  queriesById: (id: string) => QueryResult | undefined
  next?: () => Promise<KlevuResponse>
}

export async function KlevuFetch(
  ...queries: Array<AllQueries | AllQueries[]>
): Promise<KlevuResponse> {
  const flattenedQueries: AllQueries[] = []
  for (const q of queries) {
    if (Array.isArray(q)) {
      flattenedQueries.push(...q)
    } else {
      flattenedQueries.push(q)
    }
  }

  const searchQuery = flattenedQueries.find(
    (q) => q.typeOfRequest === KlevuTypeOfRequest.Search
  ) as KlevuSearchQuery | undefined

  // TODO: Check cache and send the result. If cached send still event at this point

  // Check for duplicate id's
  for (const query of flattenedQueries) {
    if (flattenedQueries.filter((q) => q.id === query.id).length !== 1) {
      throw new Error(
        "Duplicate ids in request. Please provider unique ids for requests"
      )
    }
  }

  const recordQueries = flattenedQueries.filter(
    (q) => q?.typeOfRequest !== KlevuTypeOfRequest.Suggestion
  ) as AllRecordQueries[]
  const suggestions = flattenedQueries.filter(
    (q) => q?.typeOfRequest === KlevuTypeOfRequest.Suggestion
  ) as KlevuSuggestionQuery[]

  const payload: KlevuPayload = {
    context: {
      apiKeys: [KlevuConfig.apiKey],
    },
    recordQueries: recordQueries.length > 0 ? recordQueries : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  }

  const response = await Axios.post<KlevuApiResponse>(
    KlevuConfig.url,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const responseObject: KlevuResponse = {
    apiResponse: response.data,
    filters: response.data.filters,
    suggestionsById: (id: string) =>
      response.data.suggestionResults?.find((q) => q.id === id),
    queriesById: (id: string) =>
      response.data.queryResults?.find((s) => s.id === id),
    next: fetchNextPage(response.data, flattenedQueries),
  }

  if (searchQuery) {
    sendSearchEvent(searchQuery, responseObject)
  }

  return responseObject
}

function fetchNextPage(response: KlevuApiResponse, queries: AllQueries[]) {
  if (response.queryResults && response.queryResults.length < 1) {
    return undefined
  }

  // find search queries for pagination
  const searchQueries = queries.filter(isKlevuSearchQuery)

  // If there is multiple then do not support paging
  if (searchQueries.length != 1) {
    return undefined
  }

  const searchQueryResponse = response.queryResults?.find(
    (r) => r.id === searchQueries[0].id
  )

  if (!searchQueryResponse) {
    return undefined
  }

  // Remove old filters
  const newQueries = queries.filter((q: any) => !q.filters)

  // TODO: Apply current filters somehow to queries

  return async () => {
    return await KlevuFetch(newQueries)
  }
}

function sendSearchEvent(
  searchQuery: KlevuSearchQuery,
  responseObject: KlevuResponse
) {
  const searchResponse = responseObject.queriesById(searchQuery.id)
  if (
    searchQuery.settings.query?.term &&
    searchResponse &&
    searchQuery.doNotSendEvent !== true
  ) {
    KlevuEvents.onSearch(
      searchQuery.settings.query.term,
      searchResponse.meta.totalResultsFound,
      searchResponse.meta.typeOfSearch
    )
  }
}
