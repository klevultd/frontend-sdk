import { search, SearchOptions } from "./search"
import { KlevuFetchFunction, KlevuTypeOfRecord } from "../.."

/**
 * Create a trending search query. Id for this query is `trendingSearchProducts`
 *
 * @category Queries
 * @param options {@link search}
 * @returns See {@link KlevuFetchFunction}
 *
 * @example Simple example
 * ```
 * const result = await KlevuFetch(
 *  trendingSearchProducts()
 * )
 *
 * console.log(result.getQueries("trendingSearchProducts").records)
 * ```
 */
export function trendingSearchProducts(
  options?: Partial<SearchOptions>
): KlevuFetchFunction {
  return search("*", {
    doNotSendEvent: true,
    id: "trendingSearchProducts",
    typeOfRecords: [KlevuTypeOfRecord.Product],
    ...options,
  })
}
