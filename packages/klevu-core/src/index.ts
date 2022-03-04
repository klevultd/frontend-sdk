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
   * Max request caching time. Default 10 minutes. Set to 0 to disable
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
}

export class KlevuConfig {
  static apiKey: string
  static url: string
  static cacheMaxTTL = 600000
  static eventsApiV1Url = "https://stats.ksearchnet.com/analytics/"
  static eventsApiV2Url = "https://stats.ksearchnet.com/analytics/collect"

  /**
   * Must be called once per application to initialize Klevu
   *
   * @param config
   */
  static init(config: KlevuConfiguration) {
    this.apiKey = config.apiKey
    this.url = config.url
    if (config.cacheMaxTTL) {
      this.cacheMaxTTL = config.cacheMaxTTL
    }
  }
}

// These are visible for users of the library
export * from "./models"
export * from "./connection/klevuFetch"
export * from "./connection/kmc"
export * from "./queries"
export * from "./modifiers"
export * from "./events"
export * from "./store"
