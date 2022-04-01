import { KlevuFetchModifer } from "../index.js"
import { KlevuEvents } from "../../events/index.js"

/**
 *
 * @param title Title of the category page viewed
 * @param category Category search term used
 * @returns
 */
export function sendMerchandisingViewEvent(title: string): KlevuFetchModifer {
  return {
    klevuModifierId: "sendMerchandisingViewEvent",
    onResult: (res, f) => {
      if (!f.params || !f.params?.id) {
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

      const queryResult = res.queriesById(f.params.id)
      if (!queryResult) {
        return res
      }

      KlevuEvents.categoryMerchandisingView(
        title,
        category,
        queryResult.records,
        queryResult.meta.offset
      )

      return res
    },
  }
}
