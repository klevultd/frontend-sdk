import { KlevuFetchFunctionReturnValue } from "../index.js"
import {
  KlevuFetchModifer,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../index.js"
import { lastClickedProducts } from "../../store/lastClickedProducts.js"

type Options = {
  limit: number
}

const defaultOptions: Options = {
  limit: 5,
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

  return {
    klevuFunctionId: "alsoViewed",
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
                records: lastClickedProducts.ids.map((pId) => ({
                  id: pId,
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
