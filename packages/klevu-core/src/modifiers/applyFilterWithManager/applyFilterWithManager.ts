import { FilterManager } from "../../store/filterManager"
import { ApplyFilterOptions, applyFilters } from "../applyFilter/applyFilter"

export function applyFilterWithManager(
  manager: FilterManager,
  options?: Partial<ApplyFilterOptions>
) {
  return applyFilters(manager.toApplyFilters(), options)
}
