import { FilterManager } from "../../store/filterManager.js"
import { applyFilters } from "../applyFilter/applyFilter.js"

/**
 * Apply filters to query based on Filter Manager
 *
 * @category Modifiers
 * @param manager
 * @param options
 * @returns
 */
export function applyFilterWithManager(manager: FilterManager) {
  return applyFilters(manager.toApplyFilters())
}
