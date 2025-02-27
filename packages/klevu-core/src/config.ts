import type { AxiosInstance, AxiosStatic } from "axios"
import { runPendingAnalyticalRequests } from "./events/eventRequests.js"
import { isBrowser } from "./utils/index.js"
import { KlevuUserSession } from "./resolvers/usersession.js"
import { Klaviyo } from "./connectors/klaviyo.js"
import { KlevuDomEvents } from "./events/KlevuDomEvents.js"
import { KlevuIpResolver } from "./resolvers/ipresolver.js"

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
   * VisitorServiceUrl for session creation
   */
  visitorServiceUrl?: string
  /**
   * Ipv6 ServiceUrl for ipv6 retrieval used in analytics
   */
  ipv6ServiceUrl?: string
  /**
   * Ipv4 ServiceUrl for ipv4 retrieval used in analytics
   */
  ipv4ServiceUrl?: string
  /**
   *
   */
  axios?: AxiosStatic

  /**
   * Prevent clicks being tracked in memory or stored in local storage. This will break personalisation and recommendations.
   */
  disableClickTrackStoring?: boolean
  /**
   * Set true if using klaviyo connector
   */
  enableKlaviyoConnector?: boolean
  /**
   * Enable data protection, pass true if data protection should be enabled
   */
  useConsent?: boolean
  /**
   * True when user provides consent for reading protected data
   */
  consentGiven?: boolean

  /**
   * Set to true to disable user session generation.
   */
  disableUserSession?: boolean
}

export class KlevuConfig {
  static default: KlevuConfig | undefined = loadFromGlobal()

  apiKey: string
  url: string
  cacheMaxTTL = 600_000
  eventsApiV1Url = "https://stats.ksearchnet.com/analytics/"
  eventsApiV2Url = "https://stats.ksearchnet.com/analytics/collect"
  recommendationsApiUrl = "https://config-cdn.ksearchnet.com/recommendations/"
  visitorServiceUrl = "https://visitor.service.ksearchnet.com/public/1.0"
  ipv6ServiceUrl = "https://ipv6check.ksearchnet.com"
  ipv4ServiceUrl = "https://ipv4check.ksearchnet.com"
  axios?: AxiosInstance
  moiApiUrl = "https://moi-ai.ksearchnet.com/"
  disableClickTracking = false
  enableKlaviyoConnector = false
  useConsent = false
  consentGiven = false
  disableUserSession = false

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
    if (config.visitorServiceUrl) {
      this.visitorServiceUrl = config.visitorServiceUrl
    }
    if (config.ipv4ServiceUrl) {
      this.ipv4ServiceUrl = config.ipv4ServiceUrl
    }
    if (config.ipv6ServiceUrl) {
      this.ipv6ServiceUrl = config.ipv6ServiceUrl
    }
    if (config.recommendationsApiUrl) {
      this.recommendationsApiUrl = config.recommendationsApiUrl
    }
    this.disableClickTracking = config.disableClickTrackStoring ?? false

    this.useConsent = config.useConsent || false
    this.consentGiven = config.consentGiven || false
    this.enableKlaviyoConnector = config.enableKlaviyoConnector || false
    this.disableUserSession = config.disableUserSession || false
  }

  static init(config: KlevuConfiguration) {
    KlevuConfig.default = new KlevuConfig(config)
    runPendingAnalyticalRequests()
    if (!config.disableUserSession) {
      this.initializeUserSession()
    }
    this.initializeIPResolver()
  }

  static initializeIPResolver() {
    KlevuIpResolver.init()
    if (KlevuIpResolver.getDefault().hasIPInfoExpired()) {
      KlevuIpResolver.getDefault().generateIPData()
    } else {
      KlevuIpResolver.getDefault().setExpiryTimer()
    }
  }

  static initializeUserSession() {
    KlevuUserSession.init()

    if (KlevuUserSession.getDefault().hasSessionExpired()) {
      KlevuUserSession.getDefault()
        .generateSession()
        .then(() => {
          if (this.getDefault().enableKlaviyoConnector) {
            Klaviyo.init()
          }
        })
    } else {
      KlevuUserSession.getDefault().setExpiryTimer()
      if (this.getDefault().enableKlaviyoConnector) {
        Klaviyo.init()
      }
    }
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

  setEnableKlaviyoConnector(val: boolean) {
    this.enableKlaviyoConnector = val
    if (val) {
      Klaviyo.init()
    }
  }

  setConsentGiven(userConsent: boolean) {
    this.consentGiven = userConsent
    if (userConsent) {
      KlevuUserSession.getDefault().generateSession()
      KlevuIpResolver.getDefault().generateIPData()
    }

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
