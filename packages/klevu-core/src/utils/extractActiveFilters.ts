import { KlevuFilterType, KlevuQueryResult } from "../models/index.js"
/**
 * build a string|undefined from active filters in format that is required by Klevu API
 *
 * @param result the api result object
 */
export function extractActiveFilters(
  result: KlevuQueryResult
): string | undefined {
  let selectedFiltersStr = ""
  let isAnyFilterSelected = false

  if (!result.filters || result.filters.length === 0) {
    return undefined
  }
  result.filters?.forEach((filter) => {
    if (filter.type === KlevuFilterType.Slider) {
      if (!filter.start || !filter.end) {
        return
      }
      if (filter.start != filter.min || filter.end != filter.max) {
        if (isAnyFilterSelected) {
          selectedFiltersStr += ";;"
        }
        isAnyFilterSelected = true
        selectedFiltersStr +=
          filter.key + ":" + filter.start + " - " + filter.end
      }
    } else {
      filter.options.forEach((option) => {
        if (!option.selected) {
          return
        }

        if (isAnyFilterSelected) {
          selectedFiltersStr += ";;"
        }
        isAnyFilterSelected = true
        selectedFiltersStr += filter.key + ":" + option.name
      })
    }
  })

  return isAnyFilterSelected ? selectedFiltersStr : undefined
}
