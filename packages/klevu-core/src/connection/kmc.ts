import Axios from "axios"
import { defaultKlevuConfig } from ".."

const url = "https://js.klevu.com/klevu-js-v1/klevu-js-api/"

export async function KlevuKMCSettings() {
  const start = `${url}${defaultKlevuConfig.apiKey}`
  const res = await Promise.all([
    Axios.get<KMCRoot.RootObject>(`${start}.json`).then((r) => r.data),
    Axios.get<KMCBanner.RootObject>(`${start}-banner.json`).then((r) => r.data),
    Axios.get<KMCRoot.RootObject>(`${start}-maps.json`).then((r) => r.data),
  ])

  return {
    root: res[0],
    banner: res[1],
    maps: res[2],
  }
}
