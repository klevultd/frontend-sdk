import { SetRequired } from "type-fest"
import { KlevuFetchModifer } from ".."
import {
  FilterOrder,
  isKlevuSearchQuery,
  KlevuApplyFilter,
  KlevuListFilter,
} from "../../connection/queryModels"
import { FilterManager } from "../../store/filterManager"

type FilterType = SetRequired<
  KlevuListFilter,
  "filtersToReturn"
>["filtersToReturn"]

type Options = {
  /**
   * Automatically apply filters to manager
   */
  filterManager?: FilterManager
} & Pick<FilterType, "include" | "exclude" | "rangeFilterSettings"> &
  FilterType["options"]

const defaults: Options = {
  order: FilterOrder.Index,
  limit: 10,
}

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
    modifyAfter: (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        if (!isKlevuSearchQuery(q)) {
          continue
        }
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
        return
      }

      for (const qr of result.apiResponse?.queryResults ?? []) {
        if (qr.filters) {
          options.filterManager.initFromListFilters(qr.filters)
        }
      }
    },
  }
}
