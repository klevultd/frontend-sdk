import type { KlevuApiRawResponse, KlevuFetchQueries } from "../models/index.js"
import { KlevuResponseObject } from "./responseObject.js"

/**
 * Returns only JSON from KlevuFetch that can be sent to client in SSR process to hydrate
 *
 * @param response Response value of KlevuFetch
 * @returns JSON only raw response
 */
export function KlevuPackFetchResult(response: KlevuResponseObject) {
  if (!response.apiResponse) {
    throw new Error("No result to pack")
  }
  return response.apiResponse
}

/**
 * This function hydrates KlevuFetch response object from raw JSON that was fetched on server side.
 * It doesn't do request to Klevu API, but it will do requests that are made with logic of queries.
 * For example all analytical requests are automatically sent from client.
 *
 * @param packed Raw JSON from KlevuFetch
 * @param functions Query functions used to create KlevuFetch query in backend.
 * @returns KlevuFetch response without making any request to servers
 */
export async function KlevuHydratePackedFetchResult(
  packed: KlevuApiRawResponse,
  functions: KlevuFetchQueries
) {
  return new KlevuResponseObject(packed, await Promise.all(functions))
}
