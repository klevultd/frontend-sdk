import { KlevuBaseQuery } from "../../models/index.js"
import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"
import { KlevuFetchFunctionReturnValue } from "../../models/KlevuFetchFunctionReturnValue.js"

/**
 * Take control and write any kind of query you wish to Klevu API. For experts only.
 *
 * @category Query
 * @param query
 * @param modifiers
 * @returns
 */
export function raw(
  query: KlevuBaseQuery,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  return {
    klevuFunctionId: "raw",
    queries: [query],
    modifiers,
  }
}
