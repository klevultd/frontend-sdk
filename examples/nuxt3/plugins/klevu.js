import { KlevuConfig, KlevuKMCSettings } from "@klevu/core"
import useQuickSearch from "../stores/quickSearchStore"

export default defineNuxtPlugin((nuxtApp) => {
  if (!KlevuConfig.default) {
    KlevuConfig.init({
      url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
      apiKey: "klevu-164651914788114877",
    })
    KlevuKMCSettings()
  }

  // when loading Pinia in a plugin, you must pass in the $pinia instance from nuxtApp
  const quickSearchStore = useQuickSearch(nuxtApp.$pinia)

  // this is server-side (on refresh)
  nuxtApp.hook("app:rendered", () => {})

  // this is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {})

  // this is client-side (per-route)
  nuxtApp.hook("page:start", () => {
    // lets ensure we close the quicksearch in case it is open on every page load
    quickSearchStore.quickSearchOpen = false
  })

  // this is client-side (per-route)
  nuxtApp.hook("page:finish", () => {
    // lets reset the quicksearch submission state on every page load complete
    setTimeout(() => {
      quickSearchStore.submitting = false
    }, 1000)
  })
})
