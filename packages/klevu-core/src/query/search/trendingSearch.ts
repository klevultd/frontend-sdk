import { search, SearchOptions } from "./search"
import { KlevuFetchFunction, KlevuTypeOfRecord } from "../.."

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
