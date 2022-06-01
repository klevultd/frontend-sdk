import { KlevuConfig } from "@klevu/core"
import useCart from "~~/stores/cartStore"
import useQuickSearch from "../stores/quickSearchStore"

export default defineNuxtPlugin((nuxtApp) => {
  // const config = useRuntimeConfig()
  // KlevuConfig.init({
  //   url: config.klevuUrl,
  //   apiKey: config.klevuApikey,
  // })
  const cartStore = useCart(nuxtApp.$pinia)
  const quickSearchStore = useQuickSearch(nuxtApp.$pinia)

  const route = useRoute()

  // this is server-side (on refresh)
  nuxtApp.hook("app:rendered", () => {
    console.log("app is rendered", route.path)
  })

  // this is client-side (on refresh)
  nuxtApp.hook("app:mounted", () => {
    console.log("app is mounted", route.path)
  })

  // this is client-side (per-route)
  nuxtApp.hook("page:start", () => {
    //lets ensure we close the quicksearch in case it is open
    quickSearchStore.quickSearchOpen = false
    console.log("page is start", route.path)
  })

  // this is client-side (per-route)
  nuxtApp.hook("page:finish", () => {
    setTimeout(() => {
      quickSearchStore.submitting = false
    }, 1000)
    console.log("page is finish", route.path)
  })

  return {
    provide: {
      loadKlevu: () => {},
    },
  }
})
