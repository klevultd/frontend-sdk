import Axios from "axios"
import { KlevuConfig } from ".."
import { KMCBannerRootObject } from "./kmcmodels/KMCBanner"
import { KMCMapsRootObject } from "./kmcmodels/KMCMaps"
import { KMCRootObject } from "./kmcmodels/KMCRoot"

const url = "https://js.klevu.com/klevu-js-v1/klevu-js-api/"

export async function KlevuKMCSettings() {
  const start = `${url}${KlevuConfig.default.apiKey}`
  const res = await Promise.all([
    Axios.get<KMCRootObject>(`${start}.json`).then((r) => r.data),
    Axios.get<KMCBannerRootObject>(`${start}-banner.json`).then((r) => r.data),
    Axios.get<KMCMapsRootObject>(`${start}-maps.json`).then((r) => r.data),
  ])

  return {
    root: res[0],
    banner: res[1],
    maps: res[2],
  }
}
