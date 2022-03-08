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
  static default: KlevuConfig

  apiKey: string
  url: string
  cacheMaxTTL = 600000
  eventsApiV1Url = "https://stats.ksearchnet.com/analytics/"
  eventsApiV2Url = "https://stats.ksearchnet.com/analytics/collect"

  constructor(config: KlevuConfiguration) {
    this.apiKey = config.apiKey
    this.url = config.url
    if (config.cacheMaxTTL) {
      this.cacheMaxTTL = config.cacheMaxTTL
    }
  }

  static init(config: KlevuConfiguration) {
    KlevuConfig.default = new KlevuConfig(config)
  }
}
