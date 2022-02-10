import { KlevuTypeOfRequest } from "../../model"
import {
  KlevuDefaultOptions,
  KlevuNewArrivalsQuery,
} from "../../connection/queryModels"

type Options = KlevuDefaultOptions

const defaultOptions = {
  id: "newarrivals",
}

export function newArrivals(
  category?: string,
  options?: Partial<Options>
): KlevuNewArrivalsQuery {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  return {
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
}
