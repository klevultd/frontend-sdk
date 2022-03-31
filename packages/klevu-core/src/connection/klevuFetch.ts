import Axios from "axios"
import cloneDeep from "lodash.clonedeep"
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
} from "../models/index.js"
import { injectFilterResult } from "../modifiers/injectFilterResult/injectFilterResult.js"

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

  const { recordQueries, suggestionQueries } =
    cleanAndProcessFunctions(functions)

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

  const response = await Axios.post<KlevuApiRawResponse>(
    withOverride?.configOverride?.url ?? KlevuConfig.default.url,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  let responseObject: KlevuFetchResponse = {
    apiResponse: response.data,
    suggestionsById: (id: string) =>
      response.data.suggestionResults?.find((q) => q.id === id),
    queriesById: (id: string) => {
      const res = response.data.queryResults?.find((s) => s.id === id)
      if (!res) {
        return undefined
      }
      const func = functions.find((f) => f.queries?.some((q) => q.id == res.id))
      if (!func) {
        return undefined
      }
      return FetchResultEvents(res, func)
    },
    next: fetchNextPage(response.data, functions),
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

function fetchNextPage(
  response: KlevuApiRawResponse,
  functions: KlevuFetchFunctionReturnValue[]
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

    return await KlevuFetch(...removeListFilters(functions, prevQueryResponse))
  }

  return nextFunc
}

function cleanAndProcessFunctions(functions: KlevuFetchFunctionReturnValue[]) {
  const recordQueries: KlevuAllRecordQueries[] = []
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
  functions: KlevuFetchFunctionReturnValue[],
  prevQueryResult: KlevuQueryResult
): KlevuFetchFunctionReturnValue[] {
  return functions.map((f) => {
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
  })
}
