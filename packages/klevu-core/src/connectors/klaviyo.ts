import { KlevuConfig } from "../index.js"
import { KlevuUserSession } from "../resolvers/usersession.js"

export class Klaviyo {
  static default: Klaviyo | undefined

  timer: null | ReturnType<typeof setInterval> = null
  exchangeId?: string

  setExchangeId() {
    if (!globalThis._learnq) {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.setExchangeId()
        }, 300)
      }
      return
    }

    const _getIdentifiersResponse = globalThis._learnq?.push([
      "_getIdentifiers",
      "",
      {},
    ]) as unknown

    this.exchangeId = (
      _getIdentifiersResponse as { $exchange_id: string }
    ).$exchange_id

    if (!this.exchangeId) {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.setExchangeId()
        }, 300)
      }
      return
    }
    if (this.timer) {
      clearInterval(this.timer)
    }
    KlevuUserSession.getDefault().generateSession()
  }

  static init() {
    Klaviyo.default = new Klaviyo()
    this.getDefault().setExchangeId()
  }

  static getDefault(): Klaviyo {
    if (!Klaviyo.default) {
      throw new Error("Klaviyo not initialized.")
    }
    return Klaviyo.default
  }

  getExchangeId() {
    return this.exchangeId
  }

  static generatePayload() {
    if (
      !KlevuConfig.getDefault().enableKlaviyoConnector ||
      !this.default ||
      !this.getDefault().exchangeId
    ) {
      return undefined
    }
    return {
      connectorType: "klaviyo",
      exchangeId: this.getDefault().exchangeId || "",
    }
  }
}
