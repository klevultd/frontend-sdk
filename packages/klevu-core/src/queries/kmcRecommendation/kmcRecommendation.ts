import Axios from "axios"
import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuConfig } from "../../config.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"

type KlevuKMCRecommendation = {
  metadata: {
    title: string
    recsKey: string
    pageType: string
    logic: string
    maxProducts: number
    productThreshold: number
    enabled: boolean
  }
  search: {
    basePath: string
    payload: string
  }
  templates: {
    base: string
  }
  styles: {
    base: string
  }
  scripts: {
    recsObject?: unknown
  }
}

/**
 * Fetches products based on
 *
 * @param recommendationId Id of recommendation in the backend
 * @returns
 */
export async function kmcRecommendation(
  recommendationId: string,
  ...modifiers: KlevuFetchModifer[]
): Promise<KlevuFetchFunctionReturnValue> {
  const recsResult = await Axios.get<KlevuKMCRecommendation>(
    `https://config-cdn.ksearchnet.com/recommendations/${KlevuConfig.default.apiKey}/settings/${recommendationId}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  )

  const kmcConfig = recsResult.data

  const configOverride = new KlevuConfig({
    apiKey: KlevuConfig.default.apiKey,
    url: `https://${kmcConfig.search.basePath}`,
  })

  const payload = JSON.parse(recsResult.data.search.payload)

  return {
    klevuFunctionId: "kmcRecommendation",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queries: payload.recordQueries.map((query: any) => ({
      ...query,
      id: "kmcrecommendation",
    })),
    modifiers,
    configOverride,
  }
}
