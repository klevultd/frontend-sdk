import { notEmpty } from "../utils/notEmpty.js"
import { KlevuRecord } from "../models/KlevuRecord.js"
import { isBrowser } from "../utils/isBrowser.js"
import { KlevuDomEvents } from "../events/KlevuDomEvents.js"
import { KlevuConfig } from "../config.js"
import { KlevuStorage , StorageType } from "../utils/storage.js"

const ONE_HOUR = 36000000
export const LAST_CLICKED_STORAGE_KEY = "klevu-last-clicks"
export const LAST_CLICKED_CATEGORY_STORAGE_KEY = "klevu-last-clicks-cat"
const MAX_COUNT = 20
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
    if (KlevuConfig.getDefault().disableClickTracking) {
      return
    }
    if (isBrowser() && window.localStorage) {
      KlevuStorage.setItem(
        LAST_CLICKED_STORAGE_KEY,
        JSON.stringify(this.clicks)
      )
    }
  }
  private saveCat(){
    if (KlevuConfig.getDefault().disableClickTracking) {
      return
    }
    if (isBrowser() && window.sessionStorage) {
      KlevuStorage.setItem(
        LAST_CLICKED_CATEGORY_STORAGE_KEY,
        JSON.stringify(this.categoryCache),
        StorageType.SESSION
      )
    }
  }

  private restore() {
    if (isBrowser() && window.localStorage) {
      const res = KlevuStorage.getItem(LAST_CLICKED_STORAGE_KEY)
      if (res) {
        this.clicks = JSON.parse(res)
      }
    }
    if (isBrowser() && window.sessionStorage) {
      const resCat = KlevuStorage.getItem(LAST_CLICKED_CATEGORY_STORAGE_KEY,StorageType.SESSION)
      if (resCat) {
        this.categoryCache = JSON.parse(resCat)
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
    KlevuStorage.addKey(LAST_CLICKED_STORAGE_KEY)
    if (KlevuConfig.getDefault().disableClickTracking) {
      return
    }
    const lastIndex = this.clicks.findIndex((ls) => ls.id === productId)

    if (lastIndex > -1) {
      this.clicks.splice(lastIndex, 1)
    }
    this.clicks.push({
      ts: new Date(),
      id: productId,
      product,
    })
    if (this.clicks.length > MAX_COUNT) {
      this.clicks = this.clicks.slice(MAX_COUNT * -1)
    }
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
  getLastClickedLatestsFirst(n = 10, filterDuplicates = false): string[] {
    if (KlevuConfig.getDefault().disableClickTracking) {
      console.warn("Click tracking is disabled. Returning empty array.")
      return []
    }

    let clicks = Array.from(this.clicks.map((i) => i.id)).reverse()

    if (filterDuplicates) {
      clicks = clicks.filter(
        (item, index, self) => index === self.findIndex((t) => t === item)
      )
    }

    return clicks.slice(0, n)
  }

  /**
   * Get last clicked products returning last clicked product first
   *
   * @param n amount of products to return
   * @returns
   */
  getProducts(n = 10) {
    if (KlevuConfig.getDefault().disableClickTracking) {
      console.warn("Click tracking is disabled. Returning empty array.")
      return []
    }

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
    if (KlevuConfig.getDefault().disableClickTracking) {
      console.warn("Click tracking is disabled. Returning empty array.")
      return []
    }

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

    const itemsToTake = Math.floor(currentClicks.length / 3) * 3;
    const ids = Array.from(currentClicks)
      .reverse()
      .filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      )
      .slice(0, itemsToTake)
      .map((i) => i.id)
    this.categoryCache[categoryPath] = {
      cached: new Date(),
      ids,
    }
    KlevuStorage.addKey(LAST_CLICKED_CATEGORY_STORAGE_KEY);

    this.saveCat();
    return ids
  }
}

export const KlevuLastClickedProducts = new LastClickedProducts()
