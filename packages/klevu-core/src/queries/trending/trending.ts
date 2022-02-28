import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "../../model"
import {
  KlevuDefaultOptions,
  KlevuTrendingProductsQuery,
} from "../../connection/queryModels"
import { KlevuFetchFunction } from ".."
import { KlevuFetchModifer } from "../../modifiers"
import { lastClickedProducts } from "../../store/lastClickedProducts"

type Options = KlevuDefaultOptions & {
  /**
   * Tell algorithm which type or records we have last visited
   */
  recentType?: KlevuTypeOfRecord
  /**
   * The id's of those records
   */
  recent?: string[]
  /**
   * Do we want to limit to some category these trending products
   */
  categoryPath?: string
  /**
   * Use automatic last clicked products
   */
  useLastVisitedProducts?: boolean
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
      context: params.useLastVisitedProducts
        ? {
            recentObjects: [
              {
                typeOfRecord: KlevuTypeOfRecord.Product,
                records: lastClickedProducts.ids.map((id) => ({ id })),
              },
            ],
          }
        : params?.recent && params?.recentType
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
            term: "*",
            categoryPath: params?.categoryPath,
          }
        : {
            term: "*",
          },
    },
  }

  return {
    klevuFunctionId: "trending",
    queries: [query],
    modifiers,
  }
}
