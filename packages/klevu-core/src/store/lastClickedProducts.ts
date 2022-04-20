import { isBrowser } from "../utils/isBrowser.js"

const ONE_HOUR = 36000000
const STORAGE_KEY = "klevu-last-clicks"
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
  click(productId: string) {
    this.clicks.push({
      ts: new Date(),
      id: productId,
    })

    this.save()
  }

  /**
   * Gets last clicked products so that latest click is first item in array
   *
   * @param n
   * @returns
   */
  getLastClickedLatestsFirst(n = 20): string[] {
    return Array.from(this.clicks.map((i) => i.id))
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

export const lastClickedProducts = new LastClickedProducts()
