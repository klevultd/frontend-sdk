import { KlevuConfig } from "../../config.js"
import { post } from "../../connection/fetch.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { isBrowser } from "../../utils/isBrowser.js"
import { KlevuFetchModifer } from "../index.js"

const STORAGE_TS_KEY = "abtest-data-ts"
const STORAGE_KEY = "abtest-data"
const STORAGE_PERMANENT_KEY = "abtest-permanent-data"
const HALF_HOUR = 1800_000

/**
 * Enables AB test functionality. This will make extra request to Klevu servers and it is recommended only if you wish to use A/B testing feature.
 *
 * Currently not supported in server side rendering.
 *
 * @category Modifier
 * @returns
 */
export function abTest(): KlevuFetchModifer {
  return {
    klevuModifierId: "abtest",
    modifyAfter: async (queries, func) => {
      // A/B test is not supported in the serverside
      if (!isBrowser()) {
        return Array.from(queries)
      }

      const data = await fetchAbTestInfo()
      const permanent: KlevuABDataModel["assigned"] = JSON.parse(
        window.localStorage.getItem(STORAGE_PERMANENT_KEY) ?? "[]"
      )

      if (!data) {
        throw new Error("Failed to fetch AB test data")
      }

      // clean permanent data
      const newpermanent: KlevuABDataModel["assigned"] = []
      for (const perm of permanent) {
        if (
          data.assigned.some(
            (a) => a.abTestId === perm.abTestId && a.sourceId === perm.sourceId
          )
        ) {
          newpermanent.push(perm)
        }
      }

      const copy = Array.from(queries)
      for (const q of copy) {
        if (q.typeOfRequest !== KlevuTypeOfRequest.CategoryNavigation) {
          throw new Error("abtest can only be applied to category navigation")
        }

        const path = q.settings?.query?.categoryPath
        if (!path) {
          throw new Error("missing category path from abtest")
        }

        const perm = newpermanent.find(
          (a) => a.sourceId.toLocaleLowerCase() === path.toLocaleLowerCase()
        )

        if (!func.params) {
          func.params = {}
        }

        if (perm) {
          q.abTestId = perm.abTestId
          q.abTestVariantId = perm.abTestVariantId
          func.params.abtest = perm
          continue
        }

        const test = data.assigned.find(
          (a) => a.sourceId.toLocaleLowerCase() === path.toLocaleLowerCase()
        )

        if (!test) {
          continue
        }

        if (
          !newpermanent.some(
            (a) => a.abTestId === test.abTestId && a.sourceId === test.sourceId
          )
        ) {
          newpermanent.push(test)
          post(
            `https://api.ksearchnet.com/abtest/public/usage/${
              KlevuConfig.getDefault().apiKey
            }`,
            test,
            true
          )
        }

        q.abTestId = test.abTestId
        q.abTestVariantId = test.abTestVariantId

        func.params.abtest = test
      }

      window.localStorage.setItem(
        STORAGE_PERMANENT_KEY,
        JSON.stringify(newpermanent)
      )

      return copy
    },
  }
}

/**
 * This function never wait for result if there is one in cache. Returns new results on next time.
 *
 * @returns
 */
async function fetchAbTestInfo(): Promise<KlevuABDataModel | undefined> {
  const ts = window.localStorage.getItem(STORAGE_TS_KEY)
  const res = window.localStorage.getItem(STORAGE_KEY)

  const fetch = async () => {
    const data = await post<KlevuABDataModel>(
      `https://api.ksearchnet.com/abtest/public/allocation/${
        KlevuConfig.getDefault().apiKey
      }/`,
      {}
    )

    window.localStorage.setItem(STORAGE_TS_KEY, new Date().getTime().toString())
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return data
  }

  if (res && ts) {
    if (new Date().getTime() - parseInt(ts, 10) > HALF_HOUR) {
      // do not wait
      fetch()
    }
    return JSON.parse(res)
  }

  return fetch()
}

type KlevuABDataModel = {
  assigned: Array<{
    sourceId: string
    abTestId: string
    abTestVariantId: string
    type: string
  }>
}
