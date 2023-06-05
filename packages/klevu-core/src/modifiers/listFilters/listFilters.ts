import { KlevuFetchModifer } from "../../models/KlevuFetchModifer.js"
import { KlevuApplyFilter } from "../../models/KlevuApplyFilter.js"
import type {
  KlevuListFilter,
  KlevuListFiltersToReturn,
} from "../../models/KlevuListFilter.js"
import { KlevuFilterOrder } from "../../models/KlevuFilterOrder.js"
import { FilterManager } from "../../store/filterManager.js"

type Options = {
  /**
   * Automatically apply filters to manager
   */
  filterManager?: FilterManager
} & Pick<
  KlevuListFiltersToReturn,
  "include" | "exclude" | "rangeFilterSettings"
> &
  KlevuListFiltersToReturn["options"]

const defaults: Options = {
  order: KlevuFilterOrder.Index,
  limit: 10,
}

/**
 * List filters that can affect given query
 *
 * @category Modifier
 * @param options
 * @returns
 */
export function listFilters(options?: Partial<Options>): KlevuFetchModifer {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuListFilter = {
    filtersToReturn: {
      enabled: true,
      include: params.include,
      exclude: params.exclude,
      options: {
        order: params.order,
        limit: params.limit,
        mincount: params.mincount,
      },
      rangeFilterSettings: params.rangeFilterSettings,
    },
  }

  return {
    klevuModifierId: "listfilters",
    modifyAfter: async (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        const filters: KlevuListFilter & KlevuApplyFilter = {
          ...q.filters,
          filtersToReturn: query.filtersToReturn,
        }
        q.filters = filters
      }
      return copy
    },
    onResult: (result) => {
      if (!options?.filterManager) {
        return result
      }

      for (const qr of result.apiResponse?.queryResults ?? []) {
        if (qr.filters && qr.filters.length > 0) {
          options.filterManager.initFromListFilters(qr.filters)
        }
      }

      return result
    },
  }
}
