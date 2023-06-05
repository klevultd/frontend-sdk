import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"

/**
 * Force exclude product ids on result
 *
 * @category Modifier
 * @param options
 * @returns
 */
export function exclude(itemGroupIds: string[]): KlevuFetchModifer {
  const keyValueIdArray = itemGroupIds.map((id) => ({
    key: "itemGroupId",
    value: id,
  }))

  return {
    klevuModifierId: "exclude",
    modifyAfter: async (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        if (!q.settings) {
          q.settings = {}
        }
        if (!q.settings.excludeIds) {
          q.settings.excludeIds = keyValueIdArray
        } else {
          q.settings.excludeIds.push(...keyValueIdArray)
        }
      }
      return copy
    },
  }
}
