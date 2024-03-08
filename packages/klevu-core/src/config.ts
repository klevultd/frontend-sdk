import type { AxiosInstance, AxiosStatic } from "axios"
import { runPendingAnalyticalRequests } from "./events/eventRequests.js"
import { KlevuStorage, isBrowser } from "./utils/index.js"
import { KlevuDomEvents } from "./events/KlevuDomEvents.js"
import { STORAGE_KEY, STORAGE_TS_KEY } from "./connection/kmc.js"

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
   * Recommendations API url
   */
  recommendationsApiUrl?: string

  /**
   * MOI API url
   */
  moiApiUrl?: string

  /**
   *
   */
  axios?: AxiosStatic

  /**
   * Prevent clicks being tracked in memory or stored in local storage. This will break personalisation and recommendations.
   */
  disableClickTrackStoring?: boolean
  /**
   * Enable data protection, pass true if data protection should be enabled
   */
  useConsent?: boolean
  /**
   * True when user provides consent for reading protected data
   */
  consentGiven?: boolean
}

export class KlevuConfig {
  static default: KlevuConfig | undefined = loadFromGlobal()

  apiKey: string
  url: string
  cacheMaxTTL = 600_000
  eventsApiV1Url = "https://stats.ksearchnet.com/analytics/"
  eventsApiV2Url = "https://stats.ksearchnet.com/analytics/collect"
  recommendationsApiUrl = "https://config-cdn.ksearchnet.com/recommendations/"
  axios?: AxiosInstance
  moiApiUrl = "https://moi-ai.ksearchnet.com/"
  disableClickTracking = false
  useConsent = false
  consentGiven = false

  constructor(config: KlevuConfiguration) {
    this.apiKey = config.apiKey
    this.url = config.url
    if (config.moiApiUrl) {
      this.moiApiUrl = config.moiApiUrl
    }
    if (config.cacheMaxTTL) {
      this.cacheMaxTTL = config.cacheMaxTTL
    }
    if (config.axios) {
      this.axios = config.axios.create()
    }
    if (config.eventsApiV1Url) {
      this.eventsApiV1Url = config.eventsApiV1Url
    }
    if (config.eventsApiV2Url) {
      this.eventsApiV2Url = config.eventsApiV2Url
    }
    if (config.recommendationsApiUrl) {
      this.recommendationsApiUrl = config.recommendationsApiUrl
    }

    this.disableClickTracking = config.disableClickTrackStoring ?? false

    this.useConsent = config.useConsent || false
    this.consentGiven = config.consentGiven || false
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

  isConsentDisallowed() {
    return this.useConsent && !this.consentGiven
  }

  setUseConsent(useConsent: boolean) {
    this.useConsent = useConsent
    if (typeof document !== "undefined") {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.UseConsentChanged, {
          detail: {
            useConsent,
          },
        })
      )
    }
  }

  setConsentGiven(userConsent: boolean) {
    this.consentGiven = userConsent
    if (typeof document !== "undefined") {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.UserConsentGivenChanged, {
          detail: {
            userConsent,
          },
        })
      )
    }
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
