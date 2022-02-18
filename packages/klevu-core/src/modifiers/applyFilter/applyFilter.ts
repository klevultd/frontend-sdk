import { KlevuFetchModifer } from ".."
import {
  isKlevuSearchQuery,
  KlevuApplyFilter,
  KlevuListFilter,
} from "../../connection/queryModels"

export type ApplyFilterOptions = {}

const defaults: ApplyFilterOptions = {}

export type ApplyFilter = {
  key: string
  values: string[] | [number, number]
  settings: {
    singleSelect: boolean
  }
}

/**
 *
 * @category Queries
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options
 * @returns
 */
export function applyFilters(
  filters: ApplyFilter[],
  options?: Partial<ApplyFilterOptions>
): KlevuFetchModifer {
  const params: ApplyFilterOptions = {
    ...defaults,
    ...options,
  }

  const query: KlevuApplyFilter = {
    applyFilters: {
      filters,
    },
  }

  return {
    klevuModifierId: "applyFilters",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)
      if (filters.length == 0) {
        return copy
      }
      for (const q of copy) {
        if (!isKlevuSearchQuery(q)) {
          continue
        }
        const filters: KlevuListFilter & KlevuApplyFilter = {
          ...q.filters,
          applyFilters: query.applyFilters,
        }
        q.filters = filters
      }
      return copy
    },
  }
}
