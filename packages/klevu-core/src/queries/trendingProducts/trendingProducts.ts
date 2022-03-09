import { search, SearchOptions } from "../search/search"
import { KlevuFetchFunction, KlevuFetchModifer, KlevuTypeOfRecord } from "../.."

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
): KlevuFetchFunction {
  return search(
    "*",
    {
      doNotSendEvent: true,
      id: "trendingProducts",
      typeOfRecords: [KlevuTypeOfRecord.Product],
      ...options,
    },
    ...modifiers
  )
}
