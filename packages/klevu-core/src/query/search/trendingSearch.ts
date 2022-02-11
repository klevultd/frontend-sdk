import { search, SearchOptions } from "./search"
import { KlevuFetchFunction, KlevuTypeOfRecord } from "../.."

export function trendingSearchProducts(
  options?: Partial<SearchOptions>
): KlevuFetchFunction {
  return search("*", {
    id: "trendingSearchProducts",
    typeOfRecords: [KlevuTypeOfRecord.Product],
    ...options,
  })
}
