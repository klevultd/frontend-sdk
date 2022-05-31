import {
  KlevuSearchSorting,
  listFilters,
  applyFilterWithManager,
  KlevuFetch,
  KlevuDomEvents,
  sendMerchandisingViewEvent,
  FilterManager,
  categoryMerchandising,
  KlevuConfig,
} from "@klevu/core"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const ret = {}
  KlevuConfig.init({
    url: config.klevuUrl,
    apiKey: config.klevuApikey,
  })

  return {
    ret,
  }
})
