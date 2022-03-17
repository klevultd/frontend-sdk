import { KlevuFetchFunctionReturnValue } from ".."
import { KlevuFetchModifer } from "../.."
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery"
import { KlevuBaseQuerySettingsQuery } from "../../models/KlevuBaseQuerySettingsQuery"
import { KlevuBaseQuerySettings, KlevuTypeOfRequest } from "../../models"

type Options = { id: string; searchTerm: string } & Omit<
  KlevuBaseQuerySettings,
  "query"
>

const defaults: Options = {
  id: "categoryMerchandising",
  searchTerm: "*",
}

/**
 * Fetch products for a category listing page.
 *
 * @category Queries
 * @param category
 * @param options
 * @returns
 */
export function categoryMerchandising(
  category: KlevuBaseQuerySettingsQuery["categoryPath"],
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
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
        term: params.searchTerm,
      },
      ...params,
    },
  }

  return {
    klevuFunctionId: "categoryMerchandising",
    queries: [query],
    modifiers,
  }
}
