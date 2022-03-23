import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuTypeOfRecord } from "../../index.js"
import { search, SearchOptions } from "../search/search.js"

/**
 * Search helper function that sets correct settings
 *
 * @category RecommendationQuery
 * @param term cms page to find
 * @param options
 * @returns
 */
export function searchCms(
  term: string,
  options?: Partial<SearchOptions>
): KlevuFetchFunctionReturnValue {
  return search(term, {
    typeOfRecords: [KlevuTypeOfRecord.Cms],
    groupBy: "name",
    ...options,
  })
}
