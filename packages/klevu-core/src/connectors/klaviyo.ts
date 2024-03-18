import { KlevuUserSession } from "../usersession.js"

export class Klaviyo {
  static default: Klaviyo | undefined

  timer: null | ReturnType<typeof setInterval> = null
  exchangeId?: number

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

    if (this.timer) {
      clearInterval(this.timer)
    }

    this.exchangeId = globalThis._learnq?.push(["_getIdentifiers", "", {}])
    console.log("Klaviyo", {
      exchangeId: this.exchangeId,
      _learnq: globalThis._learnq,
    })
    KlevuUserSession.generateSession(true)
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
}
