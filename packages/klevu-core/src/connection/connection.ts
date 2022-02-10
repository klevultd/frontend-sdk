import Axios from "axios"
import { KlevuEvents } from "../events/events"
import { KlevuConfig } from "../index"
import { KlevuTypeOfRequest } from "../model"
import {
  AllQueries,
  AllRecordQueries,
  isKlevuSearchQuery,
  KlevuApiResponse,
  KlevuPayload,
  KlevuResponse,
  KlevuSearchQuery,
  KlevuSuggestionQuery,
} from "./queryModels"

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

  const queryToModify = searchQueries[0]

  const searchQueryResponse = response.queryResults?.find(
    (r) => r.id === searchQueries[0].id
  )

  if (!searchQueryResponse) {
    return undefined
  }

  const lastLimit = queryToModify.settings.limit ?? 5

  if (!queryToModify.settings.offset) {
    queryToModify.settings.offset = lastLimit
  } else {
    queryToModify.settings.offset += lastLimit
  }

  // Remove old filters
  const newQueries = queries.filter((q: any) => !q.filters)

  // TODO: Apply current filters somehow to queries. See https://github.com/klevultd/frontend-sdk/issues/8

  // Change old query to new one
  const index = newQueries.findIndex((q) => q.id === queryToModify.id)
  newQueries[index] = queryToModify

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
