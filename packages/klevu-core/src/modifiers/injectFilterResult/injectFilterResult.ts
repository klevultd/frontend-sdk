import { KlevuQueryResult } from "../../models/index.js"
import { KlevuFetchModifer } from "../index.js"

/**
 * Internal function to inject listFilter results back to result object when they are removed in next() function
 * Should not be used outside of library itself
 *
 * @category Modifier
 * @param prevQuery
 * @returns
 */
export function injectFilterResult(
  prevQuery: KlevuQueryResult
): KlevuFetchModifer {
  return {
    klevuModifierId: "injectFilteResult",
    onResult: (response) => {
      const copy = { ...response }
      const found = copy.apiResponse?.queryResults?.find(
        (q) => q.id === prevQuery.id
      )
      if (found) {
        found.filters = prevQuery.filters
      }
      return copy
    },
  }
}
