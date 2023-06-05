import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { KlevuSearchPreference } from "../../models/KlevuSearchPreference.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuTypeOfRequest } from "../../models/KlevuTypeOfRequest.js"
import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"
import { KlevuFetchFunctionReturnValue } from "../../models/KlevuFetchFunctionReturnValue.js"

type Options = {
  limit?: number
}

const defaultOptions: Partial<Options> = {
  limit: 5,
}

/**
 * Visually similar recommendation query
 *
 * @category RecommendationQuery
 * @param options
 * @param modifiers
 * @returns
 */
export function visuallySimilar(
  itemGroupIds: string[],
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const opts = {
    ...defaultOptions,
    ...options,
  }

  const query: KlevuBaseQuery = {
    id: "visuallySimilar",
    typeOfRequest: KlevuTypeOfRequest.VisuallySimilar,
    settings: {
      limit: opts.limit,
      typeOfRecords: [KlevuTypeOfRecord.Product],
      context: {
        sourceObjects: [
          {
            typeOfRecord: KlevuTypeOfRecord.Product,
            records: itemGroupIds.map((itemGroupId) => ({ itemGroupId })),
          },
        ],
      },
      excludeIds: itemGroupIds.map((itemGroupId) => ({
        key: "itemGroupId",
        value: itemGroupId,
      })),
      searchPrefs: [KlevuSearchPreference.ignoreManualBoosting],
      query: {
        term: "*",
      },
    },
  }

  return {
    klevuFunctionId: "recommendation",
    queries: [query],
    modifiers,
  }
}
