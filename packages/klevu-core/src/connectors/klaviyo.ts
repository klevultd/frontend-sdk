import { KlevuConfig } from "../index.js"
import { KlevuUserSession } from "../usersession.js"

export class Klaviyo {
  static default: Klaviyo | undefined

  timer: null | ReturnType<typeof setInterval> = null
  exchangeId?: string

  setExchangeId() {
    console.log("setExchangeId called", globalThis._learnq)

    if (!globalThis._learnq) {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.setExchangeId()
        }, 300)
      }
      return
    }

    console.log("will call to geenrate identifiers")

    const _getIdentifiersResponse = globalThis._learnq?.push([
      "_getIdentifiers",
      "",
      {},
    ]) as unknown

    this.exchangeId = (
      _getIdentifiersResponse as { $exchange_id: string }
    ).$exchange_id

    console.log("this.exchangeId", this.exchangeId)

    if (!this.exchangeId) {
      return
    }
    if (this.timer) {
      clearInterval(this.timer)
    }
    console.log("Klaviyo", {
      exchangeId: this.exchangeId,
      _learnq: globalThis._learnq,
    })
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
    console.log("generating payload for klaviyo", {
      enabled: KlevuConfig.getDefault().enableKlaviyoConnector,
      exchangeId: this.default ? this.getDefault().exchangeId : "NOT_FOUND",
    })
    if (
      !KlevuConfig.getDefault().enableKlaviyoConnector ||
      !this.default ||
      !this.getDefault().exchangeId
    ) {
      return undefined
    }
    console.log("returning payload for klaviyo", {
      connectorType: "klaviyo",
      exchangeId: this.getDefault().exchangeId || "",
    })
    return {
      connectorType: "klaviyo",
      exchangeId: this.getDefault().exchangeId || "",
    }
  }
}
