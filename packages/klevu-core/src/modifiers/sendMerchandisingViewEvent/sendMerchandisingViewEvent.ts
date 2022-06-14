import { KlevuFetchModifer } from "../index.js"
import { KlevuEvents } from "../../events/index.js"

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
      const { id, abtest } = f.params as {
        id?: string
        abtest?: {
          abTestId: string
          abTestVariantId: string
        }
      }

      if (!f.params || !id) {
        return res
      }

      if (f.klevuFunctionId !== "categoryMerchandising") {
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
        abtest?.abTestVariantId
      )

      return res
    },
  }
}
