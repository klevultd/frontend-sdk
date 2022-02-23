import { KlevuFetchFunction } from ".."
import { KlevuRecord, KlevuTypeOfRecord, KlevuTypeOfRequest } from "../.."

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
  options?: Partial<Options>
): KlevuFetchFunction {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  return {
    klevuFunctionId: "similarProducts",
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
