import { KlevuFetchModifer } from "../index.js"

/**
 * Force include product ids on result
 *
 * @category Modifier
 * @param options
 * @returns
 */
export function include(ids: string[]): KlevuFetchModifer {
  const keyValueIdArray = ids.map((id) => ({
    key: "id",
    value: id,
  }))

  return {
    klevuModifierId: "include",
    modifyAfter: async (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        if (!q.settings) {
          q.settings = {}
        }
        if (!q.settings.includeIds) {
          q.settings.includeIds = keyValueIdArray
        } else {
          q.settings.includeIds.push(...keyValueIdArray)
        }
      }
      return copy
    },
  }
}
