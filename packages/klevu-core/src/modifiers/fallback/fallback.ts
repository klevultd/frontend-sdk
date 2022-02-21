import { KlevuFetchModifer } from ".."
import { KlevuBaseQuery } from "../../connection/queryModels"
import { KlevuFetchFunction } from "../../queries"

export function fallback(func: KlevuFetchFunction): KlevuFetchModifer {
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
