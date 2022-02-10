import murmur32 from "murmur-32"
import { KlevuConfig } from ".."
import { AllQueries, KlevuResponse } from "./queryModels"

const cache = new Map<
  ArrayBuffer,
  {
    ts: Date
    data: KlevuResponse
  }
>()

function stringifiedPayload(queries: AllQueries[]) {
  return queries.map((q) => JSON.stringify(q)).join("|")
}

export function getCachedResult(queries: AllQueries[]) {
  if (KlevuConfig.cacheMaxTTL === 0) {
    return undefined
  }

  const hash = murmur32(stringifiedPayload(queries))

  const result = cache.get(hash)
  if (!result) {
    return undefined
  }
  if (new Date().getTime() - result.ts.getTime() > KlevuConfig.cacheMaxTTL) {
    return undefined
  }

  return result.data
}

export function cacheResult(queries: AllQueries[], response: KlevuResponse) {
  if (KlevuConfig.cacheMaxTTL === 0) {
    return
  }
  const hash = murmur32(stringifiedPayload(queries))
  cache.set(hash, {
    ts: new Date(),
    data: response,
  })
}
