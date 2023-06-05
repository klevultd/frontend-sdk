import {
  KlevuApiRawResponse,
  KlevuBaseQuery,
  KlevuNextFunc,
  KlevuQueryResult,
} from "../../models/index.js"
import { applyFilterWithManager } from "../../modifiers/applyFilterWithManager/applyFilterWithManager.js"
import { KlevuFetchFunctionReturnValue } from "../../models/KlevuFetchFunctionReturnValue.js"
import { KlevuFetch } from "../klevuFetch.js"
import { injectFilterResult } from "../../modifiers/injectFilterResult/injectFilterResult.js"

export function fetchNextPage({
  response,
  func,
  ignoreLastPageUndefined = false,
}: {
  response: KlevuApiRawResponse
  func: KlevuFetchFunctionReturnValue
  ignoreLastPageUndefined?: boolean
}) {
  const newFunc: KlevuFetchFunctionReturnValue = func

  if (!newFunc.queries) {
    return undefined
  }

  const queryIndex = newFunc.queries.findIndex((q) => !q.isFallbackQuery)

  if (queryIndex === -1) {
    return undefined
  }

  const prevQuery: KlevuBaseQuery = newFunc.queries[
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
    !ignoreLastPageUndefined &&
    prevQueryResponse.meta.totalResultsFound <=
      prevQueryResponse.meta.offset + prevQueryResponse.meta.noOfResults
  ) {
    return undefined
  }

  const nextFunc: KlevuNextFunc = async (override?) => {
    if (!prevQuery.settings) {
      prevQuery.settings = {}
    }

    if (override?.pageIndex !== undefined) {
      prevQuery.settings.offset =
        prevQueryResponse.meta.noOfResults * override.pageIndex
    } else {
      prevQuery.settings.offset =
        prevQueryResponse.meta.noOfResults + prevQueryResponse.meta.offset
    }
    prevQuery.settings.limit = override?.limit ?? prevQuery.settings?.limit ?? 5

    // existance of prevQuery has checked in function before
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    newFunc.queries![queryIndex] = prevQuery

    // add previous filters with manager
    if (override?.filterManager) {
      if (!newFunc.modifiers) {
        newFunc.modifiers = []
      }
      newFunc.modifiers.push(applyFilterWithManager(override.filterManager))
    }

    newFunc.previousResultRecords = [
      ...(func.previousResultRecords ?? []),
      ...prevQueryResponse.records,
    ]

    return await KlevuFetch(removeListFilters(newFunc, prevQueryResponse))
  }

  return nextFunc
}

/**
 * Removes list filters from query
 *
 * @param f
 * @param prevQueryResult
 * @returns
 */
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
