import { KlevuFetchFunction } from ".."
import {
  KlevuDefaultOptions,
  KlevuBaseQuery,
  KlevuBaseQuerySettings,
} from "../../connection/queryModels"
import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "../../model"
import { KlevuFetchModifer } from "../../modifiers"
import { cleanSearchQuery } from "../../utils"

/**
 * Search options to modify the search query.
 */
export type SearchOptions = KlevuDefaultOptions & {
  /**
   * The type of records to search for.
   */
  typeOfRecords: KlevuTypeOfRecord[]
  doNotSendEvent?: boolean
} & Omit<KlevuBaseQuerySettings, "query">

const defaults: SearchOptions = {
  id: "search",
  limit: 5,
  typeOfRecords: [
    KlevuTypeOfRecord.Product,
    KlevuTypeOfRecord.Cms,
    KlevuTypeOfRecord.Category,
  ],
  fields: ["id", "image", "name", "url", "price", "currency"],
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
  const { doNotSendEvent, ...otherOptions } = options || {}

  const params: SearchOptions = {
    ...defaults,
    ...otherOptions,
  }

  const cleanedTerm = cleanSearchQuery(term)

  const query: KlevuBaseQuery = {
    id: params.id,
    typeOfRequest: KlevuTypeOfRequest.Search,
    doNotSendEvent,
    settings: {
      query: {
        term: cleanedTerm,
      },
      ...params,
    },
  }

  return {
    klevuFunctionId: "search",
    queries: [query],
    modifiers,
  }
}
