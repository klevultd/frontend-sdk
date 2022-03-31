import { KlevuTypeOfRequest } from "../../models/index.js"
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"

type Options = { id: string }

const defaultOptions = {
  id: "newarrivals",
}

/**
 * Get new arrival recommendations
 *
 * @category RecommendationQuery
 * @param category
 * @param options
 * @param modifiers
 * @returns
 */
export function newArrivals(
  category?: string,
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  const query: KlevuBaseQuery = {
    id: params.id,
    typeOfRequest: KlevuTypeOfRequest.NewArrivals,
    settings: category
      ? {
          query: {
            categoryPath: category,
          },
        }
      : undefined,
  }

  return {
    klevuFunctionId: "recommendation",
    modifiers,
    queries: [query],
  }
}
