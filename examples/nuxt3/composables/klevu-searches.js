import {
  applyFilterWithManager,
  categoryMerchandising,
  listFilters,
  search,
  sendMerchandisingViewEvent,
  sendSearchEvent,
} from "@klevu/core"
// useHello = () => {
//     const nuxtApp = useNuxtApp()
//     return nuxtApp.$hello
//   }

export const merchandisingQuery = (category, sorting, manager) => [
  categoryMerchandising(
    category,
    {
      id: "categoryMerchandising",
      limit: 36,
      sort: sorting,
    },
    applyFilterWithManager(manager),
    listFilters({
      filterManager: manager,
    }),
    sendMerchandisingViewEvent(category)
  ),
]
export const searchQuery = (term, sorting, manager) => [
  search(
    term,
    { id: "search", limit: 36, sort: sorting },
    applyFilterWithManager(manager),
    listFilters({
      rangeFilterSettings: [
        {
          key: "klevu_price",
          minMax: true,
        },
      ],
      filterManager: manager,
    }),
    sendSearchEvent()
  ),
]
