import { KlevuConfig, KlevuKMCSettings } from "@klevu/core"
import useCart from "~~/stores/cartStore"
import useQuickSearch from "../stores/quickSearchStore"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (!KlevuConfig.default) {
    KlevuConfig.init({
      url: config.klevuUrl,
      apiKey: config.klevuApikey,
    })
    KlevuKMCSettings()
  }
  const cartStore = useCart(nuxtApp.$pinia)
  const quickSearchStore = useQuickSearch(nuxtApp.$pinia)

  const route = useRoute()

  // this is server-side (on refresh)
  nuxtApp.hook("app:rendered", () => {})

  // this is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {})

  // this is client-side (per-route)
  nuxtApp.hook("page:start", () => {
    //lets ensure we close the quicksearch in case it is open
    quickSearchStore.quickSearchOpen = false
  })

  // this is client-side (per-route)
  nuxtApp.hook("page:finish", () => {
    setTimeout(() => {
      quickSearchStore.submitting = false
    }, 1000)
    // nuxtApp.$validateImages()
  })
})
