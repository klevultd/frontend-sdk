import { search, SearchOptions } from "../search/search"
import {
  KlevuFetchFunctionReturnValue,
  KlevuFetchModifer,
  KlevuTypeOfRecord,
} from "../.."

/**
 * Create a trending products search query. Id for this query is `trendingProducts`
 *
 * @category Queries
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
  options?: Partial<SearchOptions>,
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
