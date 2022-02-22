import { FilterManager } from "../../store/filterManager"
import { ApplyFilterOptions, applyFilters } from "../applyFilter/applyFilter"

/**
 * Apply filters to query based on Filter Manager
 *
 * @category Modifiers
 * @param manager
 * @param options
 * @returns
 */
export function applyFilterWithManager(
  manager: FilterManager,
  options?: Partial<ApplyFilterOptions>
) {
  return applyFilters(manager.toApplyFilters(), options)
}
