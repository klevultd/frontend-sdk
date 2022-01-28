import { KlevuEvents } from "../events/events"
import { KlevuConfig } from "../index"
import { KlevuRecord, KlevuTypeOfRequest, KlevuTypeOfSearch } from "../model"
import { cacheResult, getCachedResult } from "./cache"
import {
  AllRecordQueries,
  KlevuSearchQuery,
  KlevuSuggestionQuery,
} from "./queryModels"
import Axios from "axios"

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

type FilterResultOptions = FilterResult & {
  type: FilterType.Options
  options: Array<{
    name: string
    value: string
    count: number
    selected: boolean
  }>
}

type FilterResultSlider = FilterResult & {
  type: FilterType.Slider
  min: number
  max: number
  start: number
  end: number
}

type QueryResult = {
  id: string
  meta: {
    apiKey: string
    debuggingInformation: unknown
    isPersonalised: boolean
    noOfResults: number
    notificationCode: number
    offset: number
    qTime: number
    searchedTerm: string
    totalResultsFound: number
    typeOfSearch: KlevuTypeOfSearch
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
  suggestionResults?: {
    [id: string]: SuggestionResult
  }
  queryResults?: {
    [id: string]: QueryResult
  }
  filters?: Array<FilterResultOptions | FilterResultSlider>
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

  const result: KlevuResponse | undefined = getCachedResult(flattenedQueries)
  if (result) {
    if (searchQuery) {
      sendSearchEvent(searchQuery, result)
    }
    return result
  }

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

  const response = await Axios.post(KlevuConfig.url, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const responseObject = transformFromApiToResponse(response.data)

  if (searchQuery) {
    sendSearchEvent(searchQuery, responseObject)
  }

  cacheResult(flattenedQueries, responseObject)
  return responseObject
}

function sendSearchEvent(
  searchQuery: KlevuSearchQuery,
  responseObject: KlevuResponse
) {
  if (
    searchQuery.settings.query?.term &&
    responseObject.queryResults &&
    responseObject.queryResults[searchQuery.id] &&
    searchQuery.doNotSendEvent !== true
  ) {
    const searchResponse: QueryResult =
      responseObject.queryResults[searchQuery.id]
    KlevuEvents.search(
      searchQuery.settings.query.term,
      searchResponse.meta.totalResultsFound,
      searchResponse.meta.typeOfSearch
    )
  }
}

function transformFromApiToResponse(
  responseJson: KlevuApiResponse
): KlevuResponse {
  let suggestionResults: KlevuResponse["suggestionResults"] | undefined
  let queryResults: KlevuResponse["queryResults"] | undefined

  if (responseJson.suggestionResults) {
    suggestionResults = {}
    for (const s of responseJson.suggestionResults) {
      suggestionResults[s.id] = s
    }
  }

  if (responseJson.queryResults) {
    queryResults = {}
    for (const q of responseJson.queryResults) {
      queryResults[q.id] = q
    }
  }

  const responseObject: KlevuResponse = {
    suggestionResults,
    queryResults,
    filters: responseJson.filters,
  }

  return responseObject
}
