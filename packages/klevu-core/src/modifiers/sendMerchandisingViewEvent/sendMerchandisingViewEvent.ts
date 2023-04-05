import { KlevuFetchModifer } from "../index.js"
import { KlevuEvents } from "../../events/index.js"
import { extractActiveFilters } from "../../utils/extractActiveFilters.js"

/**
 * This modifier should be used with merchandising query. It sends
 * automatically correct event data to Klevu
 *
 * @category Modifier
 * @param title Title of the category page viewed
 * @returns
 */
export function sendMerchandisingViewEvent(title: string): KlevuFetchModifer {
  return {
    klevuModifierId: "sendMerchandisingViewEvent",
    onResult: (res, f) => {
      if (!f.params) {
        return res
      }

      const { id, abtest } = f.params

      if (f.klevuFunctionId !== "categoryMerchandising" || !id) {
        return res
      }

      const categoryFunction = f.queries?.find((q) =>
        Boolean(q.settings?.query?.categoryPath)
      )

      const category =
        categoryFunction?.settings?.query?.categoryPath ?? "unknown"

      const queryResult = res.queriesById(id)
      if (!queryResult) {
        return res
      }

      KlevuEvents.categoryMerchandisingView(
        title,
        category,
        queryResult.records,
        queryResult.meta.offset,
        abtest?.abTestId,
        abtest?.abTestVariantId,
        extractActiveFilters(queryResult)
      )

      return res
    },
  }
}
