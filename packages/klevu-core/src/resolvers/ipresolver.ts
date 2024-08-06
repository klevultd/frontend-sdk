import { KlevuConfig } from "../index.js"
import { post } from "../connection/fetch.js"
import { KlevuStorage } from "../utils/index.js"

export const USER_IPV4_STORAGE_KEY = "klevu-user-v4-id"
export const USER_IPV6_STORAGE_KEY = "klevu-user-v6-id"
export const USER_IP_EXPIRY_STORAGE_KEY = "klevu-user-v4-v6-expiry"
export const USER_UUID_STORAGE_KEY = "klevu-user-uuid"

const ONE_HOUR = 60 * 60 * 1000

type IpApiPayload = {
  klevu_uuid: string
}
type UuidApiResponse = {
  ip_address: string
  klevu_uuid: string
}
type IpApiResponse = {
  ip_address: string
  klevu_uuid: string
}

export class KlevuIpResolver {
  timer: null | ReturnType<typeof setTimeout> = null
  static default: KlevuIpResolver | undefined

  expiry?: string | null
  ipv4?: string | null
  ipv6?: string | null
  uuid?: string | null

  constructor() {
    KlevuStorage.addKey(USER_IPV4_STORAGE_KEY)
    KlevuStorage.addKey(USER_IPV6_STORAGE_KEY)
    KlevuStorage.addKey(USER_IP_EXPIRY_STORAGE_KEY)
    KlevuStorage.addKey(USER_UUID_STORAGE_KEY)

    this.expiry = KlevuStorage.getItem(USER_IP_EXPIRY_STORAGE_KEY)
    this.uuid = KlevuStorage.getItem(USER_UUID_STORAGE_KEY)
    this.ipv4 = KlevuStorage.getItem(USER_IPV4_STORAGE_KEY)
    this.ipv6 = KlevuStorage.getItem(USER_IPV6_STORAGE_KEY)
  }

  static init() {
    if (!KlevuIpResolver.default)
      KlevuIpResolver.default = new KlevuIpResolver()
  }

  static getDefault(): KlevuIpResolver {
    if (!KlevuIpResolver.default) {
      throw new Error("KlevuIpResolver not initialized.")
    }
    return KlevuIpResolver.default
  }

  hasIPInfoExpired() {
    if (!this.uuid || !this.ipv4 || !this.ipv6 || !this.expiry) return true
    return Date.now() > +this.expiry
  }

  async generateIPData() {
    try {
      const ipData = await this.getIPData()
      KlevuStorage.setItem(USER_IPV4_STORAGE_KEY, ipData.ipv4)
      KlevuStorage.setItem(USER_IPV6_STORAGE_KEY, ipData.ipv6)
      KlevuStorage.setItem(USER_UUID_STORAGE_KEY, ipData.uuid)
      this.uuid = ipData.uuid
      this.ipv4 = ipData.ipv4
      this.ipv6 = ipData.ipv6

      const expiry = Date.now() + ONE_HOUR
      KlevuStorage.setItem(USER_IP_EXPIRY_STORAGE_KEY, expiry.toString())
      this.expiry = expiry.toString()

      /**
       * Regenerate ip on expiry
       */
      if (this.timer) {
        // To ensure only one timer is active
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.generateIPData()
      }, ONE_HOUR)
    } catch (err) {
      console.error("Failed to generate ip data", err)
      this.timer = setTimeout(() => {
        this.generateIPData()
      }, ONE_HOUR)
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
      this.generateIPData()
    }, expiry)
  }

  getIPData = async () => {
    let ipV4Response: IpApiResponse | undefined = undefined
    let ipV6Response: IpApiResponse | undefined = undefined

    try {
      const ipV4Payload: IpApiPayload = {
        klevu_uuid: this.uuid || "",
      }
      ipV4Response = await post<IpApiResponse>(
        KlevuConfig.getDefault().ipv4ServiceUrl,
        ipV4Payload
      )
    } catch (err) {
      console.info(err)
    }
    try {
      const ipV6Payload: IpApiPayload = {
        klevu_uuid: ipV4Response?.klevu_uuid || "",
      }
      ipV6Response = await post<IpApiResponse>(
        KlevuConfig.getDefault().ipv6ServiceUrl,
        ipV6Payload
      )
    } catch (err) {
      console.info(err)
    }
    return {
      uuid: ipV4Response?.klevu_uuid || ipV6Response?.klevu_uuid || "",
      ipv4: ipV4Response?.ip_address || "",
      ipv6: ipV6Response?.ip_address || "",
    }
  }

  getUserData() {
    if (KlevuConfig.getDefault().isConsentDisallowed()) {
      return {}
    }
    return {
      ipv4: KlevuStorage.getItem(USER_IPV4_STORAGE_KEY) || "",
      ipv6: KlevuStorage.getItem(USER_IPV6_STORAGE_KEY) || "",
      uuid: KlevuStorage.getItem(USER_UUID_STORAGE_KEY) || "",
    }
  }
}
