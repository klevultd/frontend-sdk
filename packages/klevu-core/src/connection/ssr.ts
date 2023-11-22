import { KlevuApiRawResponse } from "../models/KlevuApiRawResponse.js"
import type { KlevuFetchQueries } from "../models/KlevuFetchQueries.js"
import { KlevuPackFetchResult } from "./hydration.js"
import { KlevuFetch, KlevuFetchOption } from "./klevuFetch.js"
import { KlevuResponseObject } from "./responseObject.js"

/**
 * Klevu SSR Fetch will do the queries, but will do not do analytical requests.
 * They need to be hydrated on frontend.
 *
 * @param queries queries to be done
 */
export async function KlevuSSRFetch(queries: KlevuFetchQueries) {
  const result = await KlevuFetch(
    ...[...queries, new KlevuFetchOption({ isSSR: true })]
  )
  return {
    result,
    packed: KlevuPackFetchResult(result),
    identifier: result.packProcessedFunctionsToString(),
  }
}

/**
 * Hydrates result to response object from server side results.
 * Will also run sideeffects that are pending from backend request.
 *
 * @param packed Packed result on the backend side
 * @param functions queries made on the backend side
 * @returns
 */
export async function KlevuSSRHydrate(
  packed: KlevuApiRawResponse,
  functions: KlevuFetchQueries,
  identifier: string
) {
  return new KlevuResponseObject(
    packed,
    await Promise.all(functions),
    new KlevuFetchOption({
      FEHydrate: true,
    }),
    identifier
  )
}
