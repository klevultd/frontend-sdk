import { search, KlevuSearchOptions } from "../search/search.js"
import {
  KlevuFetchFunctionReturnValue,
  KlevuFetchModifer,
  KlevuTypeOfRecord,
} from "../../index.js"

/**
 * Create a trending products search query. Id for this query is `trendingProducts`
 *
 * @category Query
 * @param options {@link search}
 * @returns See {@link KlevuFetchFunction}
 *
 * @example Simple example
 * ```
 * const result = await KlevuFetch(
 *  trendingProducts()
 * )
 *
 * console.log(result.getQueries("trendingProducts").records)
 * ```
 */
export function trendingProducts(
  options?: Partial<KlevuSearchOptions>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  return search(
    "*",
    {
      id: "trendingProducts",
      typeOfRecords: [KlevuTypeOfRecord.Product],
      ...options,
    },
    ...modifiers
  )
}
