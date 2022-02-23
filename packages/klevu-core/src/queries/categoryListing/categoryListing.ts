import { KlevuFetchFunction } from ".."
import { KlevuFetchModifer } from "../.."
import {
  KlevuDefaultOptions,
  KlevuBaseQuery,
} from "../../connection/queryModels"
import { KlevuTypeOfRequest } from "../../model"

type Options = KlevuDefaultOptions & Omit<KlevuBaseQuery["settings"], "query">

const defaults: Options = {
  id: "categoryListing",
}

/**
 * Fetch products for a category listing page.
 *
 * @category Queries
 * @param category
 * @param options
 * @returns
 */
export function categoryListing(
  category: string,
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunction {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuBaseQuery = {
    id: params.id,
    typeOfRequest: KlevuTypeOfRequest.Merchandising,
    doNotSendEvent: true,
    settings: {
      query: {
        categoryPath: category,
        term: "*",
      },
      ...params,
    },
  }

  return {
    klevuFunctionId: "categoryListing",
    queries: [query],
    modifiers,
  }
}
