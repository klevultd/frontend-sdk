import { KlevuFetchModifer } from "../index.js"

/**
 * Add given ids as first items in results
 *
 * @category Modifiers
 * @param options
 * @returns
 */
export function top(ids: string[]): KlevuFetchModifer {
  const keyValueIdArray = ids.map((id) => ({
    key: "id",
    value: id,
  }))

  return {
    klevuModifierId: "top",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        if (!q.settings) {
          q.settings = {}
        }
        if (!q.settings.topIds) {
          q.settings.topIds = keyValueIdArray
        } else {
          q.settings.topIds.push(...keyValueIdArray)
        }
      }
      return copy
    },
  }
}
