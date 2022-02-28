import { KlevuFetchFunction } from ".."
import { KlevuTypeOfRecord } from "../.."
import { search, SearchOptions } from "../search/search"

/**
 * Search helper function that sets correct settings
 *
 * @param term cms page to find
 * @param options
 * @returns
 */
export function searchCms(
  term: string,
  options?: Partial<SearchOptions>
): KlevuFetchFunction {
  return search(term, {
    typeOfRecords: [KlevuTypeOfRecord.Cms],
    groupBy: "name",
    ...options,
  })
}
