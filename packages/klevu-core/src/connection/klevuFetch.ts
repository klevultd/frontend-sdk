import { FetchResultEvents } from "../events/FetchResultEvents.js"
import {
  applyFilterWithManager,
  KlevuConfig,
  KlevuFetchFunctionReturnValue,
} from "../index.js"
import {
  KlevuAllRecordQueries,
  KlevuPayload,
  KlevuApiRawResponse,
  KlevuFetchResponse,
  KlevuSuggestionQuery,
  KlevuBaseQuery,
  KlevuQueryResult,
  KlevuNextFunc,
} from "../models/index.js"
import { injectFilterResult } from "../modifiers/injectFilterResult/injectFilterResult.js"
import { KlevuFetchCache } from "../store/klevuFetchCache.js"
import { post } from "./fetch.js"

const cache = new KlevuFetchCache<KlevuPayload, KlevuApiRawResponse>()

/**
 * Function that makes query to KlevuBackend. It can take amount of queries.
 *
 * @category KlevuFetch
 * @param functions list of functions to execute
 * @returns Tools to operate results and get next results {@link KlevuFetchResponse}
 */
export async function KlevuFetch(
  ...functionPromises: Array<
    Promise<KlevuFetchFunctionReturnValue> | KlevuFetchFunctionReturnValue
  >
): Promise<KlevuFetchResponse> {
  if (functionPromises.length < 1) {
    throw new Error("At least one fetch function should be provided to fetch.")
  }

  const functions = await Promise.all(functionPromises)

  const { recordQueries, suggestionQueries } = await cleanAndProcessFunctions(
    functions
  )

  const withOverride = functions.find((f) => Boolean(f.configOverride))

  const payload: KlevuPayload = {
    context: {
      apiKeys: [
        withOverride?.configOverride?.apiKey ?? KlevuConfig.default.apiKey,
      ],
    },
    recordQueries: recordQueries.length > 0 ? recordQueries : undefined,
    suggestions: suggestionQueries.length > 0 ? suggestionQueries : undefined,
  }

  const cached = cache.check(payload)
  let response: KlevuApiRawResponse
  if (cached) {
    response = cached
  } else {
    response = await post<KlevuApiRawResponse>(
      withOverride?.configOverride?.url ?? KlevuConfig.default.url,
      payload
    )
    cache.cache(payload, response)
  }

  let responseObject: KlevuFetchResponse = {
    apiResponse: response,
    suggestionsById: (id: string) =>
      response.suggestionResults?.find((q) => q.id === id),
    queriesById: (id: string) => {
      const res = response.queryResults?.find((s) => s.id === id)
      if (!res) {
        return undefined
      }
      const func = functions.find((f) => f.queries?.some((q) => q.id == res.id))
      if (!func) {
        return res
      }
      return {
        ...FetchResultEvents(res, func),
        next: fetchNextPageSingleFunc(response, func),
      }
    },
  }

  // Send event to functions on result
  for (const f of functions) {
    if (f.modifiers) {
      for (const modifier of f.modifiers) {
        if (modifier.onResult) {
          responseObject = modifier.onResult(responseObject, f)
        }
      }
    }
  }

  return responseObject
}

function fetchNextPageSingleFunc(
  response: KlevuApiRawResponse,
  func: KlevuFetchFunctionReturnValue
) {
  if (!func.queries) {
    return undefined
  }

  const queryIndex = func.queries.findIndex((q) => !q.isFallbackQuery)

  if (queryIndex === -1) {
    return undefined
  }

  const prevQuery: KlevuBaseQuery = func.queries[queryIndex] as KlevuBaseQuery

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

  const nextFunc: KlevuNextFunc = async (override?) => {
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
    func.queries![queryIndex] = prevQuery

    // add previous filters with manager
    if (override?.filterManager) {
      if (!func.modifiers) {
        func.modifiers = []
      }
      func.modifiers.push(applyFilterWithManager(override.filterManager))
    }

    return await KlevuFetch(removeListFilters(func, prevQueryResponse))
  }

  return nextFunc
}

async function cleanAndProcessFunctions(
  functions: KlevuFetchFunctionReturnValue[]
) {
  const recordQueries: KlevuAllRecordQueries[] = []
  const suggestionQueries: KlevuSuggestionQuery[] = []
  for (const f of functions) {
    if (f.queries) {
      let qs = [...f.queries]
      if (f.modifiers) {
        for (const modifier of f.modifiers) {
          if (modifier.modifyAfter) {
            qs = await modifier.modifyAfter(qs, f)
          }
        }
      }
      recordQueries.push(...qs)
    }
    if (f.suggestions) {
      suggestionQueries.push(...f.suggestions)
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
  f: KlevuFetchFunctionReturnValue,
  prevQueryResult: KlevuQueryResult
): KlevuFetchFunctionReturnValue {
  f.queries = f.queries?.map((q) => {
    if (q.filters?.filtersToReturn) {
      delete q.filters?.filtersToReturn
    }
    return q
  })
  if (f.modifiers) {
    const index = f.modifiers.findIndex(
      (m) => m.klevuModifierId == "listfilters"
    )
    if (index > -1) {
      f.modifiers.splice(index, 1)
    }
    f.modifiers.push(injectFilterResult(prevQueryResult))
  }
  return f
}
