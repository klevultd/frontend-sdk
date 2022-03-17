import { KlevuFetchFunctionReturnValue } from ".."
import { KlevuTypeOfRecord } from "../.."
import { search, SearchOptions } from "../search/search"

/**
 * Search helper function that sets correct settings
 *
 * @category RecommendationQuery
 * @param term category to find
 * @param options
 * @returns
 */
export function searchCategory(
  term: string,
  options?: Partial<SearchOptions>
): KlevuFetchFunctionReturnValue {
  return search(term, {
    typeOfRecords: [KlevuTypeOfRecord.Category],
    groupBy: "name",
    ...options,
  })
}
