import { KlevuFetchModifer } from ".."
import { KlevuTypeOfRecord, KlevuRecordFields } from "../../models"
import { lastClickedProducts } from "../../store/lastClickedProducts"

/**
 * Enable personlisation to the query
 *
 * @category Modifiers
 * @param options
 * @returns
 */
export function personalisation(options?: {
  /**
   * This is an optional field. By default, Klevu will analyse all attributes of
   * the records the customer has interacted with, in order to determine the
   * common patterns. If you prefer to focus on particular aspects, for example
   * brand or price, specify those attributes within this object.
   */
  fields?: KlevuRecordFields[]
  /**
   * Override last clicked product id's with your own selection. First item
   * should be the latest product clicked. By default @klevu/core uses internal
   * store to keep track of last clicked products. It is important use
   * KlevuEvent class to store all interactions.
   */
  lastClickedProductIds?: string[]
}): KlevuFetchModifer {
  return {
    klevuModifierId: "personalisation",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)
      for (const q of queries) {
        if (!q.settings) {
          q.settings = {}
        }
        q.settings.personalisation = {
          enablePersonalisation: true,
          fields: options?.fields,
        }
        q.settings.context = {
          recentObjects: [
            {
              typeOfRecord: KlevuTypeOfRecord.Product,
              records:
                options?.lastClickedProductIds?.map((pId) => ({
                  id: pId,
                })) ??
                lastClickedProducts.ids.map((pId) => ({
                  id: pId,
                })),
            },
          ],
        }
      }
      return copy
    },
  }
}
