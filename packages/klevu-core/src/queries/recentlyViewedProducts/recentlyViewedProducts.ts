import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"
import { KlevuLastClickedProducts } from "../../store/lastClickedProducts.js"
import { KlevuFetchFunctionReturnValue } from "../../models/KlevuFetchFunctionReturnValue.js"

type Options = {
  id: string
  amount?: number
}

const defaultOptions: Options = {
  id: "recentlyViewedProducts",
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

  const lastProducts = KlevuLastClickedProducts.getLastClickedLatestsFirst(
    opts.amount
  )
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
