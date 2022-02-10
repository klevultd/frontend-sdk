import {
  KlevuDefaultOptions,
  KlevuSearchQuery,
} from "../../connection/queryModels"
import { KlevuTypeOfRequest } from "../../model"

type Options = KlevuDefaultOptions & Omit<KlevuSearchQuery["settings"], "query">

const defaults: Options = {
  id: "merchendising",
}

export function merchendising(category: string, options?: Partial<Options>) {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuSearchQuery = {
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

  return query
}
