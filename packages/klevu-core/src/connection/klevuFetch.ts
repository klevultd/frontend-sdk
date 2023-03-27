import { KlevuConfig, KlevuFetchFunctionReturnValue } from "../index.js"
import {
  KlevuAllRecordQueries,
  KlevuPayload,
  KlevuApiRawResponse,
  KlevuFetchResponse,
  KlevuSuggestionQuery,
  KlevuQueryResult,
  KlevuFetchQueryResult,
} from "../models/index.js"
import { KlevuFetchQueries } from "../models/KlevuFetchQueries.js"
import { injectFilterResult } from "../modifiers/injectFilterResult/injectFilterResult.js"
import { KlevuFetchCache } from "../store/klevuFetchCache.js"
import { post } from "./fetch.js"
import { getAnnotationsForProduct } from "./resultHelpers/getAnnotationsForProduct.js"
import { fetchNextPage } from "./resultHelpers/fetchNextPage.js"
import { FetchResultEvents } from "./resultHelpers/FetchResultEvents.js"

export const klevuFetchCache = new KlevuFetchCache<
  KlevuPayload,
  KlevuApiRawResponse
>()

/**
 * Function that makes query to KlevuBackend. It can take amount of queries.
 *
 * @category KlevuFetch
 * @param functions list of functions to execute
 * @returns Tools to operate results and get next results {@link KlevuFetchResponse}
 */
export async function KlevuFetch(
  ...functionPromises: KlevuFetchQueries
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
        withOverride?.configOverride?.apiKey ?? KlevuConfig.getDefault().apiKey,
      ],
    },
    recordQueries: recordQueries.length > 0 ? recordQueries : undefined,
    suggestions: suggestionQueries.length > 0 ? suggestionQueries : undefined,
  }

  const cached = klevuFetchCache.check(payload)
  let response: KlevuApiRawResponse
  if (cached) {
    response = cached
  } else {
    const res = await post<KlevuApiRawResponse>(
      withOverride?.configOverride?.url ?? KlevuConfig.getDefault().url,
      payload
    )

    if (!res) {
      throw new Error("Couldn't fetch data")
    }

    response = res
    if (res.meta?.responseCode == 200) {
      klevuFetchCache.cache(payload, response)
    }
  }

  return KlevuCreateResponseObject(response, functions)
}

export function KlevuCreateResponseObject(
  response: KlevuApiRawResponse,
  queries: KlevuFetchFunctionReturnValue[]
): KlevuFetchResponse {
  let responseObject: KlevuFetchResponse = {
    apiResponse: response,
    suggestionsById: (id: string) =>
      response.suggestionResults?.find((q) => q.id === id),
    queriesById: (id: string) => KlevuQueriesById(id, response, queries),
  }

  // Send event to functions on result
  for (const f of queries) {
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

/**
 *
 * @param id Id if response to find
 * @param response Raw API response from server
 * @param queries Queries used to create API response
 * @returns
 */
function KlevuQueriesById(
  id: string,
  response: KlevuApiRawResponse,
  queries: KlevuFetchFunctionReturnValue[]
): KlevuFetchQueryResult | undefined {
  const res = response.queryResults?.find((s) => s.id === id)
  if (!res) {
    return undefined
  }
  const func = queries.find((f) => f.queries?.some((q) => q.id == res.id))
  if (!func) {
    return {
      ...res,
      annotationsById: (productId: string, languageCode: string) =>
        getAnnotationsForProduct(res, productId, languageCode),
    }
  }

  const result: KlevuFetchQueryResult = {
    ...res,
    ...FetchResultEvents(res, func),
    functionParams: func.params,
    annotationsById: (productId: string, languageCode: string) =>
      getAnnotationsForProduct(res, productId, languageCode),
    next: fetchNextPage({ response, func }),
    getPage: fetchNextPage({
      response,
      func,
      ignoreLastPageUndefined: true,
    }),
  }
  return result
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

/**
 * Removes list filters from query
 *
 * @param f
 * @param prevQueryResult
 * @returns
 */
export function removeListFilters(
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
