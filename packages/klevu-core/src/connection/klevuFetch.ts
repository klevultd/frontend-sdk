import Axios from "axios"
import cloneDeep from "lodash.clonedeep"
import { KlevuEvents } from "../events/KlevuEvents"
import {
  applyFilterWithManager,
  defaultKlevuConfig,
  KlevuConfig,
  KlevuFetchFunction,
} from "../index"
import { KlevuTypeOfRequest } from "../models"
import { KlevuAllRecordQueries } from "../models/KlevuAllRecordQueries"
import { KlevuPayload } from "../models/KlevuPayload"
import { KlevuApiRawResponse } from "../models/KlevuApiRawResponse"
import { KlevuFetchResponse } from "../models/KlevuFetchResponse"
import { KlevuSuggestionQuery } from "../models/KlevuSuggestionQuery"
import { KlevuBaseQuery } from "../models/KlevuBaseQuery"

/**
 * Function that makes query to KlevuBackend. It can take amount of queries.
 *
 * @category KlevuFetch
 * @param functions list of functions to execute
 * @returns Tools to operate results and get next results {@link KlevuFetchResponse}
 */
export async function KlevuFetch(
  ...functions: KlevuFetchFunction[]
): Promise<KlevuFetchResponse> {
  if (functions.length < 1) {
    throw new Error("At least one fetch function should be provided to fetch.")
  }

  const { recordQueries, suggestionQueries } =
    cleanAndProcessFunctions(functions)

  const payload: KlevuPayload = {
    context: {
      apiKeys: [defaultKlevuConfig.apiKey],
    },
    recordQueries: recordQueries.length > 0 ? recordQueries : undefined,
    suggestions: suggestionQueries.length > 0 ? suggestionQueries : undefined,
  }

  const withOverride = functions.find((f) => Boolean(f.configOverride))

  const response = await Axios.post<KlevuApiRawResponse>(
    withOverride?.configOverride?.apiKey ?? defaultKlevuConfig.url,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const responseObject: KlevuFetchResponse = {
    apiResponse: response.data,
    suggestionsById: (id: string) =>
      response.data.suggestionResults?.find((q) => q.id === id),
    queriesById: (id: string) =>
      response.data.queryResults?.find((s) => s.id === id),
    next: fetchNextPage(response.data, functions),
  }

  // Send event to functions on result
  for (const f of functions) {
    if (f.modifiers) {
      for (const modifier of f.modifiers) {
        if (modifier.onResult) {
          modifier.onResult(responseObject)
        }
      }
    }
  }

  const searchQuery = recordQueries.find(
    (q) => q.typeOfRequest === KlevuTypeOfRequest.Search && !q.isFallbackQuery
  ) as KlevuBaseQuery | undefined

  if (searchQuery) {
    sendSearchEvent(searchQuery, responseObject)
  }

  return responseObject
}

function fetchNextPage(
  response: KlevuApiRawResponse,
  functions: KlevuFetchFunction[]
) {
  if (response.queryResults && response.queryResults.length < 1) {
    return undefined
  }

  const searchFunctionsIndex = functions.findIndex((f) =>
    f.queries?.find((q) => !q.isFallbackQuery)
  )

  if (searchFunctionsIndex === -1) {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const queryIndex = functions[searchFunctionsIndex].queries!.findIndex(
    (q) => !q.isFallbackQuery
  )

  if (queryIndex === -1) {
    return undefined
  }

  const prevQuery: KlevuBaseQuery = functions[searchFunctionsIndex].queries?.[
    queryIndex
  ] as KlevuBaseQuery

  const prevQueryResponse = response.queryResults?.find(
    (q) => q.id === prevQuery.id
  )
  if (!prevQueryResponse) {
    return undefined
  }

  // no more pages
  if (
    prevQueryResponse.meta.totalResultsFound <
    prevQueryResponse.meta.offset + prevQueryResponse.meta.noOfResults
  ) {
    return undefined
  }

  const nextFunc: KlevuFetchResponse["next"] = async (override?) => {
    const lastLimit = override?.limit ?? prevQuery.settings?.limit ?? 5

    if (!prevQuery.settings) {
      prevQuery.settings = {}
    }

    if (!prevQuery.settings?.offset) {
      prevQuery.settings.offset = lastLimit
    } else {
      prevQuery.settings.offset += lastLimit
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    functions[searchFunctionsIndex].queries![queryIndex] = prevQuery

    // add previous filters with manager
    if (override?.filterManager) {
      // @TODO remove applyFilter modifer from functions as we are overriding it
      for (const f of functions) {
        if (!f.modifiers) {
          f.modifiers = []
        }
        f.modifiers.push(applyFilterWithManager(override.filterManager))
      }
    }

    return await KlevuFetch(...removeListFilters(functions))
  }

  return nextFunc
}

function sendSearchEvent(
  searchQuery: KlevuBaseQuery,
  responseObject: KlevuFetchResponse
) {
  const searchResponse = responseObject.queriesById(searchQuery.id)
  if (
    searchQuery.settings?.query?.term &&
    searchResponse &&
    searchQuery.doNotSendEvent !== true
  ) {
    KlevuEvents.search(
      searchQuery.settings.query.term,
      searchResponse.meta.totalResultsFound,
      searchResponse.meta.typeOfSearch
    )
  }
}

function cleanAndProcessFunctions(functions: KlevuFetchFunction[]) {
  let recordQueries: KlevuAllRecordQueries[] = []
  const suggestionQueries: KlevuSuggestionQuery[] = []
  for (const f of functions) {
    if (f.queries) {
      let qs = cloneDeep(f.queries)
      if (f.modifiers) {
        for (const modifier of f.modifiers) {
          if (modifier.modifyAfter) {
            qs = modifier.modifyAfter(qs)
          }
        }
      }
      recordQueries.push(...qs)
    }
    if (f.suggestions) {
      suggestionQueries.push(...cloneDeep(f.suggestions))
    }
  }

  // Check for duplicate id's
  for (const query of recordQueries) {
    if (recordQueries.filter((q) => q.id === query.id).length !== 1) {
      throw new Error(
        "Duplicate ids in request. Please provider unique ids for requests"
      )
    }
  }

  return {
    recordQueries,
    suggestionQueries,
  }
}

function removeListFilters(
  functions: KlevuFetchFunction[]
): KlevuFetchFunction[] {
  return functions
    .filter((f) => f.klevuFunctionId !== "listfilters")
    .map((f) => {
      f.queries = f.queries?.map((q) => {
        if (q.filters?.filtersToReturn) {
          delete q.filters?.filtersToReturn
        }
        return q
      })
      return f
    })
}
