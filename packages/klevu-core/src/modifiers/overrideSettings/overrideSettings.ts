import { KlevuBaseQuerySettings } from "../../models/KlevuBaseQuerySettings.js"
import { KlevuFetchModifer } from "../index.js"

/**
 * Tool to override any query settings. Be careful with this, as it can override any query settings and can cause unexpected results.
 *
 * @category Modifier
 * @param settingsToOverride
 * @returns
 */
export function overrideSettings(
  settingsToOverride: Partial<KlevuBaseQuerySettings>
): KlevuFetchModifer {
  return {
    klevuModifierId: "overrideSettings",
    modifyAfter: async (queries) => {
      const copy = Array.from(queries)

      for (const q of copy) {
        q.settings = {
          ...q.settings,
          ...settingsToOverride,
        }
      }

      return copy
    },
  }
}
