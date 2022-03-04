import { search, SearchOptions } from "../search/search"
import { KlevuFetchFunction, KlevuFetchModifer, KlevuTypeOfRecord } from "../.."
import { KlevuSearchPreference } from "../../models/KlevuSearchPreference"

/**
 * Create a trending search query. Id for this query is `trendingSearch`
 *
 * @category Queries
 * @param options {@link search}
 * @returns See {@link KlevuFetchFunction}
 *
 * @example Simple example
 * ```
 * const result = await KlevuFetch(
 *  trendingSearch()
 * )
 *
 * console.log(result.getQueries("trendingSearch").records)
 * ```
 */
export function trendingSearch(
  options?: Partial<SearchOptions>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunction {
  return search(
    "*",
    {
      doNotSendEvent: true,
      id: "trendingSearch",
      typeOfRecords: [KlevuTypeOfRecord.Product],
      ...options,
    },
    ...modifiers
  )
}
