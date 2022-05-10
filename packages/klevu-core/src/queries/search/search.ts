import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuBaseQuerySettings } from "../../models/KlevuBaseQuerySettings.js"
import {
  KlevuAnyTypeOfRecord,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../models/index.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { cleanSearchQuery } from "../../utils/index.js"

/**
 * Search options to modify the search query.
 */
export type SearchOptions = {
  id: string
  /**
   * The type of records to search for.
   */
  typeOfRecords: KlevuAnyTypeOfRecord[]
} & Omit<KlevuBaseQuerySettings, "query">

const defaults: SearchOptions = {
  id: "search",
  limit: 5,
  typeOfRecords: [KlevuTypeOfRecord.Product],
}

/**
 * Create a basic search to Klevu backend. Id for this query is `search`
 *
 *
 * @category Query
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options {@link SearchOptions}
 * @returns
 */
export function search(
  term: string,
  options?: Partial<SearchOptions>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: SearchOptions = {
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
