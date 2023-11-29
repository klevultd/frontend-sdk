import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { KlevuLastClickedProducts } from "../../store/lastClickedProducts.js"
import { KlevuFetchFunctionReturnValue } from "../index.js"

type Options = {
  id: string
  amount?: number
  lastClickedProductIds?: string[]
}

const defaultOptions: Options = {
  id: "recentlyViewedProducts",
  amount: 10,
  lastClickedProductIds: [],
}

/**
 * Recently viewed products
 *
 * @category RecommendationQuery
 * @param {Options} options Allows to override amount of products to return or pass custom lastClickedProductIds
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

  const lastProducts =
    opts.lastClickedProductIds && opts.lastClickedProductIds.length > 0
      ? opts.lastClickedProductIds
      : KlevuLastClickedProducts.getLastClickedLatestsFirst(opts.amount)
  const query: KlevuBaseQuery = {
    id: opts.id,
    typeOfRequest: KlevuTypeOfRequest.Search,
    settings: {
      limit: lastProducts.length,
      typeOfRecords: [KlevuTypeOfRecord.Product],
      customANDQuery: `id:(${lastProducts.join(" OR ")})`,
      topIds: lastProducts.map((id) => ({ key: "id", value: id })),
    },
  }

  return {
    klevuFunctionId: "recommendation",
    queries: [query],
    modifiers,
  }
}
