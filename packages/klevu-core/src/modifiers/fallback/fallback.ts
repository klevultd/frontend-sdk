import { KlevuFetchModifer } from ".."
import {
  isKlevuSearchQuery,
  KlevuSearchQuery,
} from "../../connection/queryModels"
import { KlevuFetchFunction } from "../../queries"

export function fallback(func: KlevuFetchFunction): KlevuFetchModifer {
  if (func.queries?.length !== 1) {
    throw new Error("Fallback modifier can only be applied to single query")
  }

  const fallbackQuery: KlevuSearchQuery = func.queries[0] as KlevuSearchQuery
  fallbackQuery.isFallbackQuery = true

  return {
    klevuModifierId: "fallback",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)

      for (const query of copy) {
        if (isKlevuSearchQuery(query)) {
          fallbackQuery.id = `${query.id}-fallback`
          query.settings.fallbackQueryId = fallbackQuery.id
        }
      }
      copy.push(fallbackQuery)
      return copy
    },
  }
}
