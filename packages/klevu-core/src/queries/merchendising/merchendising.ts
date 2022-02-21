import { KlevuFetchFunction } from ".."
import {
  KlevuDefaultOptions,
  KlevuBaseQuery,
} from "../../connection/queryModels"
import { KlevuTypeOfRequest } from "../../model"

type Options = KlevuDefaultOptions & Omit<KlevuBaseQuery["settings"], "query">

const defaults: Options = {
  id: "merchendising",
}

export function merchendising(
  category: string,
  options?: Partial<Options>
): KlevuFetchFunction {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuBaseQuery = {
    id: params.id,
    typeOfRequest: KlevuTypeOfRequest.Search,
    doNotSendEvent: true,
    settings: {
      query: {
        categoryPath: category,
      },
      ...params,
    },
  }

  return {
    klevuFunctionId: "merchendising",
    queries: [query],
  }
}
