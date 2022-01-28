import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "../../model"
import {
  KlevuDefaultOptions,
  KlevuTrendingProductsQuery,
} from "../../connection/queryModels"

type Options = KlevuDefaultOptions & {
  enablePersonlisation?: boolean
  recentType?: KlevuTypeOfRecord
  recent?: string[]
  categoryPath?: string
}

const defaultOptions: Options = {
  id: "trending",
}

export function trending(options?: Options): KlevuTrendingProductsQuery {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  return {
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
}
