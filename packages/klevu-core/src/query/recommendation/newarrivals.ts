import { KlevuTypeOfRequest } from "../../model"
import {
  KlevuDefaultOptions,
  KlevuNewArrivalsQuery,
} from "../../connection/queryModels"
import { KlevuFetchFunction } from ".."

type Options = KlevuDefaultOptions

const defaultOptions = {
  id: "newarrivals",
}

export function newArrivals(
  category?: string,
  options?: Partial<Options>
): KlevuFetchFunction {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  const query: KlevuNewArrivalsQuery = {
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
    queries: [query],
  }
}
