import {
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuFetchQueries,
  listFilters,
  search,
  sendMerchandisingViewEvent,
  sendSearchEvent,
} from "@klevu/core"

/**
 * Typical search query
 *
 * @param term
 * @param manager
 * @returns
 */
export const searchQuery = (
  term: string,
  manager: FilterManager
): KlevuFetchQueries => [
  search(
    term,
    { id: "search" },
    applyFilterWithManager(manager),
    listFilters({ filterManager: manager }),
    sendSearchEvent()
  ),
]

export const merchandisingQuery = (
  category: string,
  manager: FilterManager
): KlevuFetchQueries => [
  categoryMerchandising(
    category,
    {
      id: "categoryMerchandising",
    },
    applyFilterWithManager(manager),
    listFilters({
      filterManager: manager,
    }),
    sendMerchandisingViewEvent(category)
  ),
]
