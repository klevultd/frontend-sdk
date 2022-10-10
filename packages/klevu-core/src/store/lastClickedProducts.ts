import { notEmpty } from "../utils/notEmpty.js"
import { KlevuRecord } from "../models/KlevuRecord.js"
import { isBrowser } from "../utils/isBrowser.js"
import { KlevuDomEvents } from "../events/KlevuDomEvents.js"

const ONE_HOUR = 36000000
const STORAGE_KEY = "klevu-last-clicks"

/**
 * Keeps track of last clicked products in store
 */
class LastClickedProducts {
  private categoryCache: {
    [categoryPath: string]: {
      cached: Date
      ids: string[]
    }
  } = {}

  private clicks: Array<{
    ts: Date
    id: string
    product?: Partial<KlevuRecord>
  }> = []

  private save() {
    if (isBrowser() && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.clicks))
    }
  }

  private restore() {
    if (isBrowser() && window.localStorage) {
      const res = window.localStorage.getItem(STORAGE_KEY)
      if (res) {
        this.clicks = JSON.parse(res)
      }
    }
  }

  constructor() {
    this.restore()
  }

  /**
   * Should be called when product is clicked
   *
   * @param productId
   */
  click(productId: string, product?: Partial<KlevuRecord>) {
    this.clicks.push({
      ts: new Date(),
      id: productId,
      product,
    })

    this.save()

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.ClickEventSent, {
          detail: {
            productId,
            product,
          },
        })
      )
    }
  }

  /**
   * Gets last clicked products so that latest click is first item in array
   *
   * @param n
   * @returns
   */
  getLastClickedLatestsFirst(n = 10): string[] {
    return Array.from(this.clicks.map((i) => i.id))
      .reverse()
      .slice(0, n)
  }

  /**
   * Get last clicked products returning last clicked product first
   *
   * @param n amount of products to return
   * @returns
   */
  getProducts(n = 10) {
    return Array.from(this.clicks.map((i) => i.product).filter(notEmpty))
      .reverse()
      .slice(0, n)
  }

  /**
   * Get id's for personlisation of category merchandising
   *
   * @param categoryPath any string that is used to cache results
   * @returns
   */
  getCategoryPersonalisationIds(categoryPath: string): string[] {
    const currentClicks = this.clicks
    if (currentClicks.length < 3) {
      return []
    }

    if (this.categoryCache[categoryPath]) {
      if (
        new Date(this.categoryCache[categoryPath].cached).getTime() >
        new Date().getTime() - ONE_HOUR
      ) {
        return this.categoryCache[categoryPath].ids
      }
    }

    const itemsToTake = Math.floor(currentClicks.length / 3) * 3
    const ids = Array.from(currentClicks)
      .reverse()
      .slice(0, itemsToTake)
      .map((i) => i.id)
    this.categoryCache[categoryPath] = {
      cached: new Date(),
      ids,
    }

    return ids
  }
}

export const KlevuLastClickedProducts = new LastClickedProducts()
