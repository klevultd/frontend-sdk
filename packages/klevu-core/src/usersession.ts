import { KlevuConfig } from "."
import { post } from "./connection/fetch.js"
import { Klaviyo } from "./connectors/klaviyo.js"

//"body": "{\"apiKey\":\"klevu-164270249063714699\",\"sessionId\":\"615e65c3-bc3b-4bec-9259-d368115b07ad\",
//"sessionInfo\":{\"connectorInfo\":[{\"connectorType\":\"klaviyo\",\"exchangeId\":
//"g9puv6FUYgcRJ16VJhr8Z96Ve4bAEM5k4LaAxiNt92s.YcnpXd\"}]}}",
type SessionInfoType = {
  connectorInfo: {
    connectorType: string
    exchangeId: number
  }[]
}
type UserApiPayload = {
  apiKey: string
  sessionId?: string
  sessionInfo?: SessionInfoType
}
type SessionApiResponse = {
  apikey: string
  sessionId: string
  segmentInfo: {
    segments: string[]
    ttl: number
  }
}

const USER_SESSION_ID_STORAGE_KEY = "klevu-user-sessionId"
const USER_SESSION_EXPIRY_STORAGE_KEY = "klevu-user-session_expiry"
const USER_SESSION_INFO_STORAGE_KEY = "klevu-user-sessionInfo"

const getSessionId = async (ignoreLocalStorage: boolean) => {
  const apiKey = KlevuConfig.getDefault().apiKey
  const sessionInfoFromStorage = localStorage.getItem(
    USER_SESSION_INFO_STORAGE_KEY
  )
  let sessionInfo: SessionInfoType | undefined = undefined
  console.log({ sessionInfoFromStorage, ignoreLocalStorage })
  if (sessionInfoFromStorage && !ignoreLocalStorage) {
    sessionInfo = JSON.parse(sessionInfoFromStorage)
  } else {
    const exchangeId = Klaviyo.getExchangeId()
    console.log("in service", { exchangeId })
    if (exchangeId) {
      sessionInfo = {
        connectorInfo: [
          {
            connectorType: "klaviyo",
            exchangeId,
          },
        ],
      }
    }
  }
  const payload: UserApiPayload = {
    apiKey,
    sessionId: localStorage.getItem(USER_SESSION_ID_STORAGE_KEY) || undefined,
    sessionInfo,
  }

  console.log({ payload })

  return post<SessionApiResponse>(
    `https://visitor.service.ksearchnet.com/public/1.0/${apiKey}/session`,
    payload
  )
}

export class KlevuUserSession {
  static timer: null | ReturnType<typeof setTimeout> = null

  static hasSessionExpired() {
    const expiry = localStorage.getItem(USER_SESSION_EXPIRY_STORAGE_KEY)
    const sessionId = localStorage.getItem(USER_SESSION_ID_STORAGE_KEY)
    if (!sessionId || !expiry) return true
    return Date.now() > +expiry
  }

  static async generateSession(ignoreLocalStorage = false) {
    const sessionInfo = await getSessionId(ignoreLocalStorage)
    console.log({ sessionInfo })
    if (sessionInfo) {
      localStorage.setItem(USER_SESSION_ID_STORAGE_KEY, sessionInfo.sessionId)
      if (sessionInfo.segmentInfo) {
        localStorage.setItem(
          USER_SESSION_INFO_STORAGE_KEY,
          JSON.stringify(sessionInfo.segmentInfo)
        )
        const expiry = Date.now() + sessionInfo.segmentInfo.ttl || 0
        localStorage.setItem(USER_SESSION_EXPIRY_STORAGE_KEY, expiry.toString())
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
}
