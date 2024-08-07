import { KlevuConfig } from "../index.js"
import { post } from "../connection/fetch.js"
import { Klaviyo } from "../connectors/klaviyo.js"
import { KlevuStorage } from "../utils/index.js"

type ConnectorInfo = {
  connectorType: string
  exchangeId: string
}
type SessionInfoType = {
  connectorInfo: (ConnectorInfo | undefined)[]
}
type UserApiPayload = {
  apiKey: string
  sessionId?: string
  sessionInfo?: SessionInfoType
}
type SegmentInfo = {
  segments: string[]
  ttl: number
}
type SessionApiResponse = {
  apikey: string
  sessionId: string
  segmentInfo: SegmentInfo
}
type UserSessionConnector = {
  generatePayload: () => ConnectorInfo | undefined
}

export const USER_SESSION_ID_STORAGE_KEY = "klevu-user-sessionId"
export const USER_SESSION_EXPIRY_STORAGE_KEY = "klevu-user-session_expiry"
export const USER_SEGMENT_INFO_STORAGE_KEY = "klevu-user-segmentInfo"

const connectors: { name: string; connector: UserSessionConnector }[] = [
  { name: "klaviyo", connector: Klaviyo },
]

export class KlevuUserSession {
  timer: null | ReturnType<typeof setTimeout> = null
  static default: KlevuUserSession | undefined

  expiry?: string | null
  segmentInfo?: SegmentInfo | null
  sessionId?: string | null

  constructor() {
    KlevuStorage.addKey(USER_SESSION_ID_STORAGE_KEY)
    KlevuStorage.addKey(USER_SESSION_EXPIRY_STORAGE_KEY)
    KlevuStorage.addKey(USER_SEGMENT_INFO_STORAGE_KEY)

    this.expiry = KlevuStorage.getItem(USER_SESSION_EXPIRY_STORAGE_KEY)
    const segmentInfo = KlevuStorage.getItem(USER_SEGMENT_INFO_STORAGE_KEY)
    this.segmentInfo = segmentInfo ? JSON.parse(segmentInfo) : null
    this.sessionId = KlevuStorage.getItem(USER_SESSION_ID_STORAGE_KEY)
  }

  static init() {
    if (!KlevuUserSession.default)
      KlevuUserSession.default = new KlevuUserSession()
  }

  static getDefault(): KlevuUserSession {
    if (!KlevuUserSession.default) {
      throw new Error("KlevuUserSession not initialized.")
    }
    return KlevuUserSession.default
  }

  hasSessionExpired() {
    if (!this.sessionId || !this.expiry) return true
    return Date.now() > +this.expiry
  }

  async generateSession() {
    const sessionInfo = await this.getSessionId()

    if (sessionInfo) {
      KlevuStorage.setItem(USER_SESSION_ID_STORAGE_KEY, sessionInfo.sessionId)
      this.sessionId = sessionInfo.sessionId

      if (sessionInfo.segmentInfo) {
        KlevuStorage.setItem(
          USER_SEGMENT_INFO_STORAGE_KEY,
          JSON.stringify(sessionInfo.segmentInfo)
        )
        this.segmentInfo = sessionInfo.segmentInfo

        const expiry =
          Date.now() +
          (sessionInfo.segmentInfo.ttl ? sessionInfo.segmentInfo.ttl * 1000 : 0)
        KlevuStorage.setItem(USER_SESSION_EXPIRY_STORAGE_KEY, expiry.toString())
        this.expiry = expiry.toString()

        /**
         * Regenerate session on expiry
         */
        if (this.timer) {
          // To ensure only one timer is active
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.generateSession()
        }, sessionInfo.segmentInfo.ttl * 1000)
      }
    } else {
      console.warn("Failed to generate user session")
    }
  }

  setExpiryTimer() {
    const currentTime = Date.now()
    const expiry = +(this.expiry || currentTime) - currentTime
    if (this.timer) {
      // To ensure only one timer is active
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.generateSession()
    }, expiry)
  }

  getSessionId = async () => {
    const apiKey = KlevuConfig.getDefault().apiKey

    const sessionInfo = {
      connectorInfo: connectors
        .map(({ connector }) => {
          try {
            return connector.generatePayload()
          } catch {
            return undefined
          }
        })
        .filter((connector) => connector),
    }
    const payload: UserApiPayload = {
      apiKey,
      sessionId: this.sessionId || undefined,
      sessionInfo,
    }

    return post<SessionApiResponse>(
      `${KlevuConfig.getDefault().visitorServiceUrl}/${apiKey}/session`,
      payload
    )
  }

  getSegments() {
    return this.segmentInfo?.segments || []
  }
}
