import { KlevuConfig } from "@klevu/core"

export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig()
  if (!KlevuConfig.default) {
    KlevuConfig.init({
      url: config.klevuUrl,
      apiKey: config.klevuApikey,
    })
  }
})
