import { KlevuFetchFunction } from ".."
import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "../.."

type Options = {
  limit: number
}

const defaultOptions: Options = {
  limit: 5,
}

export function similarProducts(
  ids: string[],
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
          context: {
            recentObjects: [
              {
                typeOfRecord: KlevuTypeOfRecord.Product,
                records: ids.map((pId) => ({
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
