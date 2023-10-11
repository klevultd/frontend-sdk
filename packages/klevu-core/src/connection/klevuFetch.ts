import { KlevuConfig, KlevuFetchFunctionReturnValue } from "../index.js"
import {
  KlevuAllRecordQueries,
  KlevuPayload,
  KlevuApiRawResponse,
  KlevuSuggestionQuery,
  KlevuQueryResult,
} from "../models/index.js"
import { KlevuFetchQueries } from "../models/KlevuFetchQueries.js"
import { injectFilterResult } from "../modifiers/injectFilterResult/injectFilterResult.js"
import { KlevuFetchCache } from "../store/klevuFetchCache.js"
import { post } from "./fetch.js"
import { KlevuResponseObject } from "./responseObject.js"

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
): Promise<KlevuResponseObject> {
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
  let response: KlevuApiRawResponse | undefined

  const withoutSkip = recordQueries.filter((q) => q.typeOfRequest !== "SKIP")

  if (withoutSkip.length > 0 || suggestionQueries.length > 0) {
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
  }

  return new KlevuResponseObject(
    response ?? {
      meta: {
        qTime: 0,
        responseCode: 204,
      },
      queryResults: recordQueries.map((r) => ({
        id: r.id,
        meta: {} as any,
        records: [],
      })),
      suggestionResults: [],
    },
    functions
  )
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
