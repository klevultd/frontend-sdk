import { KlevuFetchFunction } from ".."
import { KlevuFetchModifer } from "../.."
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery"
import { KlevuBaseQuerySettingsQuery } from "../../models/KlevuBaseQuerySettingsQuery"
import { KlevuTypeOfRequest } from "../../models"

type Options = { id: string } & Omit<KlevuBaseQuery["settings"], "query">

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
  category: KlevuBaseQuerySettingsQuery["categoryPath"],
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunction {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuBaseQuery = {
    id: params.id,
    typeOfRequest: KlevuTypeOfRequest.CategoryNavigation,
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
