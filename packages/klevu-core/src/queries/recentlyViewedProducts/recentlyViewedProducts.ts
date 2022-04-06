import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { lastClickedProducts } from "../../store/lastClickedProducts.js"
import { KlevuFetchFunctionReturnValue } from "../index.js"

type Options = {
  amount?: number
}

const defaultOptions: Options = {
  amount: 10,
}

/**
 * Recently viewed products
 *
 * @category RecommendationQuery
 * @param options
 * @param modifiers
 * @returns
 */
export function recentlyViewed(
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const opts: Options = {
    ...defaultOptions,
    ...options,
  }

  const lastProducts = lastClickedProducts.getLastClickedLatestsFirst(
    opts.amount
  )
  const query: KlevuBaseQuery = {
    id: "recentlyViewedProducts",
    typeOfRequest: KlevuTypeOfRequest.Search,
    settings: {
      limit: lastProducts.length,
      typeOfRecords: [KlevuTypeOfRecord.Product],
      customeANDQuery: `id:(${lastProducts.join(" OR ")})`,
      topIds: lastProducts.map((id) => ({ key: "id", value: id })),
    },
  }

  return {
    klevuFunctionId: "recommendation",
    queries: [query],
    modifiers,
  }
}
