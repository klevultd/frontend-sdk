import type { AxiosStatic } from "axios"
import { runPendingRequests as runPendingAnalyticalRequests } from "./events/eventRequests.js"
import { isBrowser } from "./utils/index.js"

type KlevuConfiguration = {
  /**
   * Your Klevu url
   */
  url: string
  /**
   * Your Klevu apiKey
   */
  apiKey: string
  /**
   * Max request caching time in milliseconds. Default 10 minutes. Set to 0 to disable
   */
  cacheMaxTTL?: number

  /**
   * Events API v1 url
   */
  eventsApiV1Url?: string

  /**
   * Events API v2 url
   */
  eventsApiV2Url?: string

  /**
   *
   */
  axios?: AxiosStatic
}

export class KlevuConfig {
  static default: KlevuConfig | undefined = loadFromGlobal()

  apiKey: string
  url: string
  cacheMaxTTL = 600_000
  eventsApiV1Url = "https://stats.ksearchnet.com/analytics/"
  eventsApiV2Url = "https://stats.ksearchnet.com/analytics/collect"
  axios?: AxiosStatic

  constructor(config: KlevuConfiguration) {
    this.apiKey = config.apiKey
    this.url = config.url
    if (config.cacheMaxTTL) {
      this.cacheMaxTTL = config.cacheMaxTTL
    }
    this.axios = config.axios
  }

  static init(config: KlevuConfiguration) {
    KlevuConfig.default = new KlevuConfig(config)
    runPendingAnalyticalRequests()
  }

  static getDefault(): KlevuConfig {
    if (!KlevuConfig.default) {
      throw new Error("Configuration missing")
    }
    return KlevuConfig.default
  }
}

function loadFromGlobal(): KlevuConfig | undefined {
  if (!isBrowser()) {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cfg = (window as any).KlevuConfig

  if (!cfg) {
    return undefined
  }

  return new KlevuConfig(cfg)
}
