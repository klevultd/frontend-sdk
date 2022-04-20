import Axios from "axios"
import { KlevuConfig } from "../index.js"
import { isBrowser } from "../utils/isBrowser.js"
import { KMCBannerRootObject } from "./kmcmodels/KMCBanner.js"
import { KMCMapsRootObject } from "./kmcmodels/KMCMaps.js"
import { KMCRootObject } from "./kmcmodels/KMCRoot.js"

const url = "https://js.klevu.com/klevu-js-v1/klevu-js-api/"
const STORAGE_KEY = "klevu-kmc-data"
const STORAGE_TS_KEY = "klevu-kmc-data-ts"
const ONE_DAY = 86_400_000

/**
 * Fetches KMC settings from server. Caches data for a day.
 *
 * @param ignoreCache If true, will ignore cache and fetch data from server
 * @returns
 */
export async function KlevuKMCSettings(ignoreCache?: boolean) {
  if (isBrowser() && window.localStorage && ignoreCache !== true) {
    const ts = window.localStorage.getItem(STORAGE_TS_KEY)
    const res = window.localStorage.getItem(STORAGE_KEY)
    if (res && ts && new Date().getTime() - parseInt(ts, 10) < ONE_DAY) {
      return JSON.parse(res)
    }
  }

  const start = `${url}${KlevuConfig.default.apiKey}`
  const res = await Promise.all([
    Axios.get<KMCRootObject>(`${start}.json`).then((r) => r.data),
    Axios.get<KMCBannerRootObject>(`${start}-banner.json`).then((r) => r.data),
    Axios.get<KMCMapsRootObject>(`${start}-maps.json`).then((r) => r.data),
  ])

  const data = {
    root: res[0],
    banner: res[1],
    maps: res[2],
  }

  if (isBrowser() && window.localStorage) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.localStorage.setItem(STORAGE_TS_KEY, new Date().getTime().toString())
  }

  return data
}

export type { KMCRootObject, KMCBannerRootObject, KMCMapsRootObject }
