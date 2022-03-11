import { KlevuFetchModifer } from ".."
import { KlevuApplyFilter } from "../../models/KlevuApplyFilter"
import { KlevuListFilter } from "../../models/KlevuListFilter"

export type ApplyFilter = {
  key: string
  values: string[] | [number, number]
  settings?: {
    singleSelect: boolean
  }
}

/**
 *
 * @category Modifiers
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options
 * @returns
 */
export function applyFilters(filters: ApplyFilter[]): KlevuFetchModifer {
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
