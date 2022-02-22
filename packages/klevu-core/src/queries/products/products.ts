import { KlevuTypeOfRecord, KlevuTypeOfSearch } from "../../model"
import { search } from "../search/search"

/**
 * Fetches list of products. All fields are fetched.
 *
 * @category Queries
 * @param productIds
 * @returns
 */
export function products(productIds: string[]) {
  // @TODO: There is hard limit on fetching products throught search term
  if (productIds.length > 10) {
    throw Error("Too many products fetched")
  }
  return search(productIds.join(" "), {
    typeOfSearch: KlevuTypeOfSearch.Or,
    limit: productIds.length,
    fields: undefined,
    doNotSendEvent: true,
    typeOfRecords: [KlevuTypeOfRecord.Product],
  })
}
