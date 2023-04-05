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
  result.filters?.forEach(function (filter) {
    if (filter.type === KlevuFilterType.Slider) {
      if (
        filter.start !== null &&
        typeof filter.start !== "undefined" &&
        filter.end !== null &&
        typeof filter.end !== "undefined"
      ) {
        if (filter.start != filter.min || filter.end != filter.max) {
          if (isAnyFilterSelected) {
            selectedFiltersStr += ";;"
          }
          isAnyFilterSelected = true
          selectedFiltersStr +=
            filter.key + ":" + filter.start + " - " + filter.end
        }
      }
    } else {
      filter.options.forEach(function (option) {
        if (option.selected) {
          if (isAnyFilterSelected) {
            selectedFiltersStr += ";;"
          }
          isAnyFilterSelected = true
          selectedFiltersStr += filter.key + ":" + option.name
        }
      })
    }
  })

  return isAnyFilterSelected ? selectedFiltersStr : undefined
}
