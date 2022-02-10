import { KlevuFetchFunction } from ".."
import {
  FilterOrder,
  isKlevuSearchQuery,
  KlevuApplyFilter,
  KlevuListFilter,
  RangeFilterSettings,
} from "../../connection/queryModels"

type Options = {
  /**
   * Target query ids where filter is applied. If you define custom id then this
   * needs to be defined
   */
  targetIds: string[]

  /**
   * This is the list of filter keys that you do not want Klevu Search to
   * include in the response. If a filter is specified in both include and
   * exclude lists, include will take precedence.
   */
  exclude?: string[]
  /**
   * Order of results
   */
  order: FilterOrder
  /**
   *  Maximum number of options to be included per filter.
   */
  limit?: number
  /**
   * If the parameter minCount is present with a positive number, only the
   * options with an option count equal to or higher than the minCount are
   * included.
   */
  minCount?: number

  /*
   * This allows you to retrieve range filters for use with numeric values such
   * as price, so you can display bands of 0-99, 100-199, etc. or a price
   * slider.
   */
  rangeFilters?: RangeFilterSettings[]
}

const defaults: Options = {
  targetIds: ["search", "merchedising"],
  order: FilterOrder.Index,
  limit: 10,
}

/**
 *
 * @category Queries
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options
 * @returns
 */
export function listFilters(
  include: string[],
  options?: Partial<Options>
): KlevuFetchFunction {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuListFilter = {
    filtersToReturn: {
      enabled: true,
      include,
      exclude: params.exclude,
      options: {
        order: params.order,
        limit: params.limit,
        mincount: params.minCount,
      },
      rangeFilterSettings: params.rangeFilters,
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
  }
}
