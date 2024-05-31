/**
 * Load config from predefined string or from localStorage
 */

type Config = {
  url: string
  apiKey: string
  categoryPageRecommendationId: string
  checkoutPageRecommendationId: string
  homePageRecommendationId1: string
  homePageRecommendationId2: string
  productPageRecommendationId: string
  recommendationsApiUrl: string
  nav: Array<{
    key: string
    label: string
    emoji: string
  }>
  eventsApiV2Url: string
  eventsApiV1Url: string
  visitorServiceUrl: string
}

let loadedConfig: Config | undefined

if (window.localStorage) {
  try {
    loadedConfig = JSON.parse(window.localStorage.getItem("demo-config"))
  } catch (e) {
    console.error(
      "Error getting from storage config",
      window.localStorage.getItem("demo-config")
    )
  }
}
const urlConfig = new URLSearchParams(window.location.search).get("demo-config")

if (urlConfig) {
  try {
    loadedConfig = JSON.parse(urlConfig)
  } catch (e) {
    console.error("Error getting from url config", urlConfig)
  }
}

export const config: Config = {
  url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-164651914788114877",
  categoryPageRecommendationId: "k-c0013603-1783-4293-bf80-7b3002587dcb",
  checkoutPageRecommendationId: "k-ad471ddc-d8d0-4a5e-9fdf-702baf63b6b6",
  homePageRecommendationId1: "k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d",
  homePageRecommendationId2: "k-97cece7f-34de-4b3a-b0bc-8e3bfec86e72",
  productPageRecommendationId: "k-efd5337c-051e-44a2-810c-e23de2be513f",
  recommendationsApiUrl: "https://config-cdn.ksearchnet.com/recommendations/",
  nav: [
    {
      key: "men",
      label: "Men",
      emoji: "🙎‍♂️",
    },
    {
      key: "women",
      label: "Women",
      emoji: "🙍‍♀️",
    },
    {
      key: "men;shoes",
      label: "Men's shoes",
      emoji: "👞",
    },
  ],
  eventsApiV1Url: "https://stats.ksearchnet.com/analytics/",
  eventsApiV2Url: "https://stats.ksearchnet.com/analytics/collect",
  visitorServiceUrl: "https://visitor.service.ksearchnet.com/public/1.0",
  ...(loadedConfig ?? {}),
}

export const saveConfig = (c: Config) => {
  if (window.localStorage) {
    window.localStorage.setItem("demo-config", JSON.stringify(c))
  }
}
export const resetConfig = () => {
  if (window.localStorage) {
    window.localStorage.removeItem("demo-config")
  }
}
