// import { KlevuConfig, KlevuKMCSettings } from "@klevu/core"
import useQuickSearch from "../stores/quickSearchStore"
import useSearch from "../stores/searchStore"

import {
  KlevuConfig,
  KlevuKMCSettings,
  KlevuFetch,
  FilterManager,
  KlevuPackFetchResult,
  KlevuHydratePackedFetchResult,
} from "@klevu/core"

const useHydration = (key, get, set) => {
  const nuxt = useNuxtApp()

  if (process.server) {
    nuxt.hooks.hook("app:rendered", () => {
      nuxt.payload[key] = get()
    })
  }

  if (process.client) {
    nuxt.hooks.hook("app:created", () => {
      set(nuxt.payload[key])
    })
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  if (process.server) {
    // console.log("SERVER process detected")
  }

  if (process.client) {
    // console.log("CLIENT process detected")
  }

  let searchResults = []
  useHydration(
    "klevu",
    () => `my apples search`,
    (mySearch) => {
      console.log(`this is the client-side hydration: ${mySearch}`)
    }
  )

  if (!KlevuConfig.default) {
    KlevuConfig.init({
      url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
      apiKey: "klevu-164651914788114877",
    })
    KlevuKMCSettings()
  }

  // when loading Pinia in a plugin, you must pass in the $pinia instance from nuxtApp
  const quickSearchStore = useQuickSearch(nuxtApp.$pinia)
  const searchStore = useSearch(nuxtApp.$pinia)

  // this is server-side (on refresh)
  nuxtApp.hook("app:rendered", async (renderContext) => {
    console.log("just checking event: app:rendered")
  })

  // this is client-side (on refresh)
  nuxtApp.hook("app:created", async (vueApp) => {
    console.log("just checking event: app:created")

    if (route.matched && route.matched.length) {
      if (route.matched[0].name == "search") {
        const result = await KlevuFetch(
          searchQuery(route.query.q, searchStore.sorting, new FilterManager())
        )
        const searchResult = KlevuPackFetchResult(result)
        console.log(searchResult)
        nuxtApp.provide("dataToTransferFrontend", searchResult.data)
      } else if (route.matched[0].name == "collections-handle") {
        const result = await KlevuFetch(
          merchandisingQuery(
            route.params.handle,
            searchStore.sorting,
            new FilterManager()
          )
        )
        const searchResult = KlevuPackFetchResult(result)
        console.log(searchResult)
        nuxtApp.provide("dataToTransferFrontend", searchResult.data)
      }
    }
  })

  // this is client-side (on refresh) - only on hydration
  nuxtApp.hook("app:mounted", async (vueApp) => {
    console.log("just checking event: app:mounted")

    console.log("nuxtApp.$dataToTransferFrontend")
    console.log(typeof nuxtApp.$dataToTransferFrontend)

    resultObject = await KlevuHydratePackedFetchResult(
      nuxtApp.$dataToTransferFrontend,
      searchQuery(route.query.q, searchStore.sorting, manager)
    )
    console.log(resultObject.queriesById("search"))

    // console.log("vueApp")
    // console.log(vueApp)
  })

  // this is client-side (once per unique route)
  nuxtApp.hook("page:start", () => {
    // console.log("just checking event: page:start")
    // lets ensure we close the quicksearch in case it is open on every page load
    quickSearchStore.quickSearchOpen = false
  })

  // this is client-side (per-route - including same route with different ID)
  nuxtApp.hook("page:finish", (comp) => {
    // console.log("just checking event: page:finish")
    // console.log(route)
    // console.log(route.params)
    // console.log(route.query)
    // console.log(route.hash)
    // console.log(route.path)
    // console.log(route.meta)
    // console.log(comp)
    // lets reset the quicksearch submission state on every page load complete
    // if (nuxtApp.payload["klevu"]) {
    //   console.log("this is where we need to apply and clear the ssr search")
    //   nuxtApp.payload["klevu"] = undefined
    // } else {
    //   console.log("this is where we need to load the normal search")
    // }

    setTimeout(() => {
      quickSearchStore.submitting = false
    }, 1000)
  })

  return {
    provide: {
      myPlugin: () => {
        console.log(Object.keys(route))
        console.log(Object.keys(nuxtApp))
        return "this should be server side rendered"
      },
    },
  }
})
