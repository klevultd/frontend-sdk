import { KlevuTypeOfRecord, KlevuTypeOfSearch } from "../../models/index.js"
import { search } from "../search/search.js"

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
    id: "products",
    typeOfSearch: KlevuTypeOfSearch.Or,
    limit: productIds.length,
    includeIds: productIds.map((pId) => ({
      key: "id",
      value: pId,
    })),
    fields: undefined,
    typeOfRecords: [KlevuTypeOfRecord.Product],
  })
}
