import { KlevuConfig } from "../../config.js"
import { post } from "../../connection/fetch.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuFetchModifer } from "../index.js"

const STORAGE_TS_KEY = "abtest-data-ts"
const STORAGE_KEY = "abtest-data"
const ONE_HOUR = 3600_000

/**
 * Enables AB test functionality. This will make extra request to Klevu servers and it is recommended only if you wish to use A/B testing feature.
 *
 * @category Modifier
 * @returns
 */
export function abTest(): KlevuFetchModifer {
  return {
    klevuModifierId: "abtest",
    modifyAfter: async (queries, func) => {
      const data = await fetchAbTestInfo()
      const copy = Array.from(queries)
      for (const q of copy) {
        if (q.typeOfRequest !== KlevuTypeOfRequest.CategoryNavigation) {
          throw new Error("abtest can only be applied to category navigation")
        }

        const path = q.settings?.query?.categoryPath
        if (!path) {
          throw new Error("missing category path from abtest")
        }

        const test = data.assigned.find(
          (a) => a.sourceId.toLocaleLowerCase() === path.toLocaleLowerCase()
        )

        if (!test) {
          continue
        }

        q.abTestId = test.abTestId
        q.abTestVariantId = test.abTestVariantId

        func.params.abtest = test
      }
      return copy
    },
  }
}

async function fetchAbTestInfo(): Promise<KlevuABDataModel> {
  const ts = window.localStorage.getItem(STORAGE_TS_KEY)
  const res = window.localStorage.getItem(STORAGE_KEY)
  if (res && ts && new Date().getTime() - parseInt(ts, 10) < ONE_HOUR) {
    return JSON.parse(res)
  }

  const data = await post<KlevuABDataModel>(
    `https://config-cdn.ksearchnet.com/abtest/public/allocation/${KlevuConfig.default.apiKey}/`,
    {}
  )

  window.localStorage.setItem(STORAGE_TS_KEY, new Date().getTime().toString())
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

  return data
}

type KlevuABDataModel = {
  assigned: Array<{
    sourceId: string
    abTestId: string
    abTestVariantId: string
    type: string
  }>
}
