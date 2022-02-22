import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "../../model"
import {
  KlevuDefaultOptions,
  KlevuTrendingProductsQuery,
} from "../../connection/queryModels"
import { KlevuFetchFunction } from ".."
import { KlevuFetchModifer } from "../../modifiers"

type Options = KlevuDefaultOptions & {
  enablePersonlisation?: boolean
  recentType?: KlevuTypeOfRecord
  recent?: string[]
  categoryPath?: string
}

const defaultOptions: Options = {
  id: "trending",
}

/**
 * Return trending recommendations
 *
 * @category RecommendationQuery
 * @param options
 * @param modifiers
 * @returns
 */
export function trending(
  options?: Options,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunction {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  const query: KlevuTrendingProductsQuery = {
    id: `trending`,
    typeOfRequest: KlevuTypeOfRequest.Trending,
    settings: {
      personalisation: params?.enablePersonlisation
        ? {
            enablePersonalisation: true,
          }
        : undefined,
      context:
        params?.recent && params?.recentType
          ? {
              recentObjects: [
                {
                  typeOfRecord: params.recentType,
                  records: params.recent.map((id) => ({ id })),
                },
              ],
            }
          : undefined,
      query: params?.categoryPath
        ? {
            categoryPath: params?.categoryPath,
          }
        : undefined,
    },
  }

  return {
    klevuFunctionId: "trending",
    queries: [query],
    modifiers,
  }
}
