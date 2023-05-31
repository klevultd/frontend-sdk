import { KlevuFetchModifer } from "../index.js"
import { KlevuSearchSorting } from "../../models/KlevuSearchSorting.js"
import { KlevuBaseQuerySettings } from "../../models/KlevuBaseQuerySettings.js"

/**
 * Set advanced sorting to request.
 * Does not apply if sort is something else than AdvancedSort or undefined.
 *
 * @category Modifier
 * @param sorts Array of sorts to apply to the query.
 * @returns
 */
export function advancedSorting(
  sorts: KlevuBaseQuerySettings["advancedSorting"]
): KlevuFetchModifer {
  return {
    klevuModifierId: "advancedSorting",
    modifyAfter: async (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        if (!q.settings) {
          q.settings = {}
        }
        if (
          q.settings.sort === undefined ||
          q.settings.sort === KlevuSearchSorting.AdvancedSorting
        ) {
          q.settings.sort = KlevuSearchSorting.AdvancedSorting
          q.settings.advancedSorting = sorts
        }
      }
      return copy
    },
  }
}
