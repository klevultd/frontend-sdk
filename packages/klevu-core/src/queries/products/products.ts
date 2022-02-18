import { KlevuTypeOfRecord, KlevuTypeOfSearch } from "../../model"
import { search } from "../search/search"

/**
 * Fetches list of products. All fields are fetched.
 *
 * @param productIds
 * @returns
 */
export function products(productIds: string[]) {
  return search(productIds.join(" "), {
    includeIds: productIds.map((k) => ({
      key: "id",
      value: k,
    })),
    typeOfSearch: KlevuTypeOfSearch.Or,
    limit: productIds.length,
    fields: undefined,
    doNotSendEvent: true,
    typeOfRecords: [KlevuTypeOfRecord.Product],
  })
}
