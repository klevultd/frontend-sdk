import { KlevuFetchFunction } from ".."
import {
  KlevuDefaultOptions,
  KlevuSearchQuery,
} from "../../connection/queryModels"
import { KlevuTypeOfRecord, KlevuTypeOfRequest } from "../../model"
import { cleanSearchQuery } from "../../utils"

type Options = KlevuDefaultOptions & {
  typeOfRecords: KlevuTypeOfRecord[]
  fallbackQuery?: KlevuSearchQuery
  doNotSendEvent?: boolean
} & Omit<KlevuSearchQuery["settings"], "query">

const defaults: Options = {
  id: "search",
  limit: 5,
  typeOfRecords: [
    KlevuTypeOfRecord.Product,
    KlevuTypeOfRecord.Cms,
    KlevuTypeOfRecord.Category,
  ],
  fields: ["id", "image", "name", "url"],
}

/**
 *
 * @category Queries
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options
 * @returns
 */
export function search(
  term: string,
  options?: Partial<Options>
): KlevuFetchFunction {
  const { doNotSendEvent, ...otherOptions } = options || {}

  const params: Options = {
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

  return {
    klevuFunctionId: "search",
    queries: [query],
  }
}
