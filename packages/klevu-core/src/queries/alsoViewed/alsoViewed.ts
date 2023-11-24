import { KlevuFetchFunctionReturnValue } from "../index.js"
import {
  KlevuFetchModifer,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../index.js"
import { KlevuLastClickedProducts } from "../../store/lastClickedProducts.js"

type Options = {
  limit: number
  lastClickedProductIds?: string[]
}

const defaultOptions: Options = {
  limit: 5,
  lastClickedProductIds: [],
}

/**
 * Shows products that visitor should also see. Automatically applies products that user has already clicked.
 *
 * @category RecommendationQuery
 * @param options
 * @returns
 */
export function alsoViewed(
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }
  const lastProducts =
    params.lastClickedProductIds && params.lastClickedProductIds.length > 0
      ? params.lastClickedProductIds
      : KlevuLastClickedProducts.getLastClickedLatestsFirst()
  return {
    klevuFunctionId: "recommendation",
    modifiers,
    queries: [
      {
        id: "alsoviewed",
        typeOfRequest: KlevuTypeOfRequest.AlsoViewed,
        settings: {
          limit: params.limit,
          context: {
            recentObjects: [
              {
                typeOfRecord: KlevuTypeOfRecord.Product,
                records: lastProducts.map((id) => ({
                  id,
                })),
              },
            ],
          },
          typeOfRecords: [KlevuTypeOfRecord.Product],
        },
      },
    ],
  }
}
