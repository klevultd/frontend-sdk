import { KlevuFetchFunctionReturnValue } from "../../models/KlevuFetchFunctionReturnValue.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { search, KlevuSearchOptions } from "../search/search.js"

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
  options?: Partial<KlevuSearchOptions>
): KlevuFetchFunctionReturnValue {
  return search(term, {
    typeOfRecords: [KlevuTypeOfRecord.Category],
    groupBy: "name",
    ...options,
  })
}
