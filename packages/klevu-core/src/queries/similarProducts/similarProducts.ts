import { KlevuFetchFunctionReturnValue } from "../index.js"
import {
  KlevuFetchModifer,
  KlevuRecord,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../index.js"

type Options = {
  limit: number
}

const defaultOptions: Options = {
  limit: 5,
}

/**
 * Fetch similiar products based on list of ids
 *
 * @category RecommendationQuery
 * @param ids similiar to these ids
 * @param options
 * @returns
 */
export function similarProducts(
  products: Array<Pick<KlevuRecord, "id" | "itemGroupId">>,
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  return {
    klevuFunctionId: "similarProducts",
    modifiers,
    queries: [
      {
        id: "similar",
        typeOfRequest: KlevuTypeOfRequest.SimilarProducts,
        settings: {
          limit: params.limit,
          excludeIds: products.map((p) => ({
            key: "itemGroupId",
            value: p.itemGroupId,
          })),
          context: {
            recentObjects: [
              {
                typeOfRecord: KlevuTypeOfRecord.Product,
                records: products.map((p) => ({
                  id: p.id,
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
