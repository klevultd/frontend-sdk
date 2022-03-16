import { KlevuFetchFunctionReturnValue } from ".."
import { KlevuTypeOfRecord } from "../.."
import { search, SearchOptions } from "../search/search"

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
