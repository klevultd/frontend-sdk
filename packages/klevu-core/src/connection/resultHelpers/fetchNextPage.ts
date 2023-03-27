import {
  applyFilterWithManager,
  KlevuFetchFunctionReturnValue,
} from "../../index.js"
import {
  KlevuApiRawResponse,
  KlevuBaseQuery,
  KlevuNextFunc,
} from "../../models/index.js"
import { KlevuFetch, removeListFilters } from "../klevuFetch.js"

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
