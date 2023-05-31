import type { KlevuFilterOrder } from "./KlevuFilterOrder.js"
import type { KlevuRangeFilterSettings } from "./KlevuRangeFilterSettings.js"

export type KlevuListFiltersToReturn = {
  /**
   * Whether or not to return any filters with this query. This defaults to
   *  false so no filters are returned unless requested.
   */
  enabled: boolean
  /**
   * This is the list of filter keys that you would like to retrieve as
   * filters. A filter may also not be returned if there aren't enough
   * applicable records in the result set.
   */
  include?: string[]
  /**
   * This is the list of filter keys that you do not want Klevu Search to
   * include in the response. If a filter is specified in both include and
   * exclude lists, include will take precedence.
   */
  exclude?: string[]
  options: {
    /**
     * A value of 'FREQ' will sort options based on the number of records
     * each option has in the result set. 'INDEX' will sort the options
     * alphabetically.
     */
    order: KlevuFilterOrder
    /**
     * Specify the maximum number of options to be included per filter.
     */
    limit?: number
    /**
     *  If the parameter minCount is present with a positive number, only
     * the options with an option count equal to or higher than the minCount
     * are included.
     */
    mincount?: number
  }
  /**
   * When minMax is false, this setting allows you to retrieve range filters
   * for use with numeric values such as price, so you can display bands of
   * 0-99, 100-199, etc. or a price slider.
   *
   * By default all attributes submitted to Klevu are indexed as STRING
   * attributes, which means they cannot be used as range filters. The
   * product sale price field is the only exception to this rule, which is
   * filtered using the key klevu_price. If you have explicitly requested
   * and Klevu has approved that certain attributes be indexed as numerical
   * attributes, you can also retrieve those as range filters.
   */
  rangeFilterSettings?: KlevuRangeFilterSettings[]
}

export type KlevuListFilter = {
  filtersToReturn?: KlevuListFiltersToReturn
}
