import { KlevuFetchModifer } from "../index.js"
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuFetchFunctionReturnValue } from "../../queries/index.js"

/**
 * If original query doesn't return enough results then fallback query is run added to results
 *
 * @category Modifier
 * @param func
 * @returns
 */
export function fallback(
  func: KlevuFetchFunctionReturnValue
): KlevuFetchModifer {
  if (func.queries?.length !== 1) {
    throw new Error("Fallback modifier can only be applied to single query")
  }

  const fallbackQuery: KlevuBaseQuery = func.queries[0] as KlevuBaseQuery
  fallbackQuery.isFallbackQuery = true

  return {
    klevuModifierId: "fallback",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)

      for (const query of copy) {
        if (!query.id || query.isFallbackQuery === true) {
          continue
        }
        fallbackQuery.id = `${query.id}-fallback`
        if (!query.settings) {
          query.settings = {}
        }
        query.settings.fallbackQueryId = fallbackQuery.id
        copy.push(fallbackQuery)
      }
      return copy
    },
  }
}
