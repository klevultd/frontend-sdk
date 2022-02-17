import { KlevuFetchFunction } from ".."
import {
  KlevuDefaultOptions,
  KlevuSearchQuery,
} from "../../connection/queryModels"
import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "../../model"
import { cleanSearchQuery } from "../../utils"

/**
 * Search options to modify the search query.
 */
export type SearchOptions = KlevuDefaultOptions & {
  /**
   * The type of records to search for.
   */
  typeOfRecords: KlevuTypeOfRecord[]
  /**
   * Optional fallback query in case that there are less results than defined in option {@link KlevuSearchQuery.settings.fallbackWhenCountLessThan}.
   *
   * Type of the KlevuFetchFunction has to be search. Returning search query will have automatic fallback id. Format is "{your-id}-fallback"
   *
   * @example Fallback query
   * ```ts
   * const result = await KlevuFetch(
   *   search("hoodies", {
   *     id: "search-hoodies",
   *     fallbackWhenCountLessThan: 300,
   *     fallbackQuery: trendingSearchProducts(),
   *   })
   * )
   *
   * console.log(result.getQueries("search-hoodies-fallback").records)
   * ```
   */
  fallbackQuery?: KlevuFetchFunction
  doNotSendEvent?: boolean
} & Omit<KlevuSearchQuery["settings"], "query">

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
  options?: Partial<SearchOptions>
): KlevuFetchFunction {
  const { doNotSendEvent, ...otherOptions } = options || {}

  const params: SearchOptions = {
    ...defaults,
    ...otherOptions,
  }

  const cleanedTerm = cleanSearchQuery(term)

  const query: KlevuSearchQuery = {
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

  let fallbackQuery: KlevuSearchQuery | undefined = undefined

  if (
    options?.fallbackQuery &&
    options.fallbackQuery.queries &&
    options.fallbackQuery.queries.length == 1
  ) {
    fallbackQuery = options.fallbackQuery.queries[0] as KlevuSearchQuery
    fallbackQuery.isFallbackQuery = true
    fallbackQuery.id = `${query.id}-fallback`
    query.settings.fallbackQueryId = fallbackQuery.id
  }

  return {
    klevuFunctionId: "search",
    queries: fallbackQuery !== undefined ? [query, fallbackQuery] : [query],
  }
}
