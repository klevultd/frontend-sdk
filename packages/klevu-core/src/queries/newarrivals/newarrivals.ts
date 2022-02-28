import { KlevuTypeOfRequest } from "../../model"
import {
  KlevuBaseQuery,
  KlevuDefaultOptions,
} from "../../connection/queryModels"
import { KlevuFetchFunction } from ".."
import { KlevuFetchModifer } from "../../modifiers"

type Options = KlevuDefaultOptions

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
): KlevuFetchFunction {
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
    klevuFunctionId: "newarrivals",
    modifiers,
    queries: [query],
  }
}
