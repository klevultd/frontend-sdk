import { KlevuFetchFunctionReturnValue } from "../index.js"
import {
  KlevuFetchModifer,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../index.js"

type Options = {
  id: string
  limit: number
}

const defaultOptions: Options = {
  id: "similar",
  limit: 5,
}

/**
 * Fetch similiar products based on list of ids
 *
 * @category RecommendationQuery
 * @param ids similiar to these ids or itemgroupids
 * @param options
 * @returns
 */
export function similarProducts(
  ids: string[],
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  return {
    klevuFunctionId: "recommendation",
    modifiers,
    queries: [
      {
        id: params.id,
        typeOfRequest: KlevuTypeOfRequest.SimilarProducts,
        settings: {
          limit: params.limit,
          excludeIds: ids.map((id) => ({
            key: "itemGroupId",
            value: id,
          })),
          context: {
            recentObjects: [
              {
                typeOfRecord: KlevuTypeOfRecord.Product,
                records: ids.map((id) => ({ id })),
              },
            ],
          },
          typeOfRecords: [KlevuTypeOfRecord.Product],
        },
      },
    ],
  }
}
