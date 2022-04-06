import {
  KlevuBaseQuery,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../models/index.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { KlevuFetchFunctionReturnValue } from "../index.js"

/**
 * Fetches list of products. All fields are fetched.
 *
 * @category Queries
 * @param productIds
 * @returns
 */
export function products(
  productIds: string[],
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  if (productIds.length > 20) {
    throw Error("Too many products fetched")
  }
  const query: KlevuBaseQuery = {
    id: "products",
    typeOfRequest: KlevuTypeOfRequest.Search,
    settings: {
      limit: productIds.length,
      customeANDQuery: `id:(${productIds.join(" OR ")})`,
      topIds: productIds.map((id) => ({ key: "id", value: id })),
      typeOfRecords: [KlevuTypeOfRecord.Product],
    },
  }

  return {
    klevuFunctionId: "search",
    queries: [query],
    modifiers,
  }
}
