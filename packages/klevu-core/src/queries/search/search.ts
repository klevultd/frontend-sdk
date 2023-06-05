import { KlevuFetchFunctionReturnValue } from "../../models/KlevuFetchFunctionReturnValue.js"
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuBaseQuerySettings } from "../../models/KlevuBaseQuerySettings.js"
import {
  KlevuAnyTypeOfRecord,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../models/index.js"
import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"
import { cleanSearchQuery } from "../../utils/index.js"

/**
 * Search options to modify the search query.
 */
export type KlevuSearchOptions = {
  id: string
  /**
   * The type of records to search for.
   */
  typeOfRecords: KlevuAnyTypeOfRecord[]
} & Omit<KlevuBaseQuerySettings, "query">

const defaults: KlevuSearchOptions = {
  id: "search",
  limit: 5,
  typeOfRecords: [KlevuTypeOfRecord.Product],
}

/**
 * Create a basic search to Klevu backend. Default ID for this query is `search`
 *
 *
 * @category Query
 * @param term Search term from input
 * @param options {@link KlevuSearchOptions}
 * @returns
 */
export function search(
  term: string,
  options?: Partial<KlevuSearchOptions>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: KlevuSearchOptions = {
    ...defaults,
    ...options,
  }

  const cleanedTerm = cleanSearchQuery(term)

  const query: KlevuBaseQuery = {
    id: params.id,
    typeOfRequest: KlevuTypeOfRequest.Search,
    settings: {
      query: {
        term: cleanedTerm,
      },
      ...params,
    },
  }

  return {
    klevuFunctionId: "search",
    params: {
      ...params,
      term,
    },
    queries: [query],
    modifiers,
  }
}
