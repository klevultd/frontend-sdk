import { KlevuFetchFunctionReturnValue } from "../../models/KlevuFetchFunctionReturnValue.js"
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuBaseQuerySettingsQuery } from "../../models/KlevuBaseQuerySettingsQuery.js"
import {
  KlevuBaseQuerySettings,
  KlevuTypeOfRequest,
} from "../../models/index.js"
import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"

export type KlevuMerchandisingOptions = {
  id: string
  searchTerm: string
} & Omit<KlevuBaseQuerySettings, "query">

const defaults: KlevuMerchandisingOptions = {
  id: "categoryMerchandising",
  searchTerm: "*",
  limit: 24,
}

/**
 * Fetch products for a category listing page.
 * Default result id is "categoryMerchandising".
 *
 * @category Query
 * @param category
 * @param options
 * @returns
 */
export function categoryMerchandising(
  category: KlevuBaseQuerySettingsQuery["categoryPath"],
  options?: Partial<KlevuMerchandisingOptions>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: KlevuMerchandisingOptions = {
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
    params: {
      ...params,
      category,
    },
  }
}
