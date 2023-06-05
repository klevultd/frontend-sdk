import { KlevuFetchModifer } from "../index.js"
import { KlevuGroupConditions } from "../../models/KlevuGroupConditions.js"

/**
 * Create advanced filtering to the query.
 *
 * @category Modifier
 * @param conditions Array of conditions to apply to the query.
 * @param filterType How conditions should be applied. Default is ALL_OF
 * @returns
 */
export function advancedFiltering(
  conditions: KlevuGroupConditions["conditions"],
  filterType: KlevuGroupConditions["groupOperator"] = "ALL_OF"
): KlevuFetchModifer {
  return {
    klevuModifierId: "advancedFiltering",
    modifyAfter: async (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        if (!q.settings) {
          q.settings = {}
        }
        q.settings.groupCondition = {
          groupOperator: filterType,
          conditions,
        }
      }
      return copy
    },
  }
}
