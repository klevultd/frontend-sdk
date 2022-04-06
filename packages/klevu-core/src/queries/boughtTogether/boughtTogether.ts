import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { KlevuFetchFunctionReturnValue } from "../index.js"

type Options = {
  limit?: number
}

const defaultOptions: Partial<Options> = {
  limit: 5,
}

/**
 * Bought together recommendation on checkout page
 *
 * @category RecommendationQuery
 * @param options
 * @param modifiers
 * @returns
 */
export function boughtTogether(
  productIdsInCart: string[],
  options: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const opts = {
    ...defaultOptions,
    ...options,
  }

  const query: KlevuBaseQuery = {
    id: "boughtTogether",
    typeOfRequest: KlevuTypeOfRequest.AlsoBought,
    settings: {
      limit: opts.limit,
      typeOfRecords: [KlevuTypeOfRecord.Product],
      context: {
        recentObjects: [
          {
            typeOfRecord: KlevuTypeOfRecord.Product,
            records: productIdsInCart.map((id) => ({ id })),
          },
        ],
      },
    },
  }

  return {
    klevuFunctionId: "recommendation",
    queries: [query],
    modifiers,
  }
}
