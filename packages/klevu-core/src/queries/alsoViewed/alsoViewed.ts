import { KlevuFetchFunction } from ".."
import {
  KlevuFetchModifer,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../.."
import { lastClickedProducts } from "../../store/lastClickedProducts"

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
): KlevuFetchFunction {
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
