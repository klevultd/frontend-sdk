import { SetRequired } from "type-fest"
import { KlevuFetchFunction } from ".."
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
   * Target query ids where filter is applied. If you define custom id then this
   * needs to be defined
   */
  targetIds: string[]

  /**
   * Automatically apply filters to manager
   */
  manager?: FilterManager
} & Pick<FilterType, "include" | "exclude" | "rangeFilterSettings"> &
  FilterType["options"]

const defaults: Options = {
  targetIds: ["search", "merchedising", "trendingSearchProducts"],
  order: FilterOrder.Index,
  limit: 10,
}

export function listFilters(options?: Partial<Options>): KlevuFetchFunction {
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
    klevuFunctionId: "listfilters",
    modifyAfter: (queries) => {
      for (const q of queries) {
        if (!isKlevuSearchQuery(q)) {
          continue
        }
        if (params.targetIds.includes(q.id)) {
          const filters: KlevuListFilter & KlevuApplyFilter = {
            ...q.filters,
            filtersToReturn: query.filtersToReturn,
          }
          q.filters = filters
        }
      }
      return queries
    },
    onResult: (result) => {
      if (!options?.manager) {
        return
      }
      const q = result.queryResults?.find((q) =>
        options?.targetIds?.includes(q.id)
      )
      if (!q || !q.filters) {
        return
      }
      options.manager.initFromListFilters(q.filters)
    },
  }
}
