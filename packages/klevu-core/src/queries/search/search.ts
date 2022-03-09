import { KlevuFetchFunction } from ".."
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery"
import { KlevuBaseQuerySettings } from "../../models/KlevuBaseQuerySettings"
import {
  KlevuAnyTypeOfRecord,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../models"
import { KlevuFetchModifer } from "../../modifiers"
import { cleanSearchQuery } from "../../utils"

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
 * @category Queries
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options {@link SearchOptions}
 * @returns
 */
export function search(
  term: string,
  options?: Partial<SearchOptions>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunction {
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
