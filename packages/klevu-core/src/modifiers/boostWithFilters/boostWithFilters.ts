import { KlevuFetchModifer } from ".."

export function boostWithFilters(
  boosts: Array<{
    key: string
    values: string[]
    weight: number
  }>
): KlevuFetchModifer {
  return {
    klevuModifierId: "boostWithFilters",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)

      for (const q of copy) {
        if (!q.boost) {
          q.boost = {}
        }
        q.boost.filters = boosts
      }

      return copy
    },
  }
}
