import { KlevuConfig } from "../index.js"
import { isBrowser } from "../utils/isBrowser.js"
import { KMCBannerRootObject } from "../models/KMCBanner.js"
import { KMCMapsRootObject } from "../models/KMCMaps.js"
import { KMCRootObject } from "../models/KMCRoot.js"
import { get } from "./fetch.js"
import { KlevuStorage } from "../utils/storage.js"

const url = "https://js.klevu.com/klevu-js-v1/klevu-js-api/"
export const STORAGE_KEY = "klevu-kmc-data"
export const STORAGE_TS_KEY = "klevu-kmc-data-ts"
const ONE_DAY = 86_400_000

/**
 * Fetches KMC settings from server. Caches data for a day.
 *
 * @category KlevuFetch
 * @param ignoreCache If true, will ignore cache and fetch data from server
 * @param cacheLength How long to cache data in milliseconds
 * @returns
 */
export async function KlevuKMCSettings(
  ignoreCache?: boolean,
  cacheLength = ONE_DAY
): Promise<{
  root?: KMCRootObject
  banner?: KMCBannerRootObject
  maps?: KMCMapsRootObject
}> {
  if (isBrowser() && window.localStorage && ignoreCache !== true) {
    const ts = KlevuStorage.getItem(STORAGE_TS_KEY)
    const res = KlevuStorage.getItem(STORAGE_KEY)
    if (res && ts && new Date().getTime() - parseInt(ts, 10) < cacheLength) {
      return JSON.parse(res)
    }
  }

  const start = `${url}${KlevuConfig.getDefault().apiKey}`
  const res = await Promise.all([
    get<KMCRootObject>(`${start}.json`),
    get<KMCBannerRootObject>(`${start}-banner.json`),
    get<KMCMapsRootObject>(`${start}-maps.json`),
  ])

  const data = {
    root: res[0],
    banner: res[1],
    maps: res[2],
  }

  if (isBrowser() && window.localStorage) {
    KlevuStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    KlevuStorage.setItem(STORAGE_TS_KEY, new Date().getTime().toString())
  }

  return data
}

export type { KMCRootObject, KMCBannerRootObject, KMCMapsRootObject }
