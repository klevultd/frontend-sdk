import { KlevuRecord } from "@klevu/core"

/**
 * Render given price with browsers own currency format.
 *
 * @param amount
 * @param currency
 * @returns formatted price
 */
export function renderPrice(amount: number | string, currency: string): string {
  // @ts-expect-error
  if (window?.["klevu_ui_settings"]?.renderPrice) {
    // @ts-expect-error
    return window["klevu_ui_settings"].renderPrice(amount, currency)
  }
  const price = typeof amount === "string" ? parseFloat(amount) : amount
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(price)
}

/**
 * Run callback only if it hasn't been requested in last `delay` milliseconds.
 *
 * @param callback function to call
 * @param wait time to wait in milliseconds
 * @returns
 */
export function debounce<T extends unknown[], U>(callback: (...args: T) => PromiseLike<U> | U, wait: number) {
  let timer: ReturnType<typeof setTimeout>

  return (...args: T): Promise<U> => {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait)
    })
  }
}

/**
 * List of css ::parts() that are exposed to the developers.
 *
 * Essentially this is list of css selectors that are exposed to the developers.
 * See global.css for the list of selectors.
 */
export const globalExportedParts = ["klevu-list"].join(" ")

/**
 * Global settings that modify the way Klevu UI library works.
 */
export type KlevuUIGlobalSettings = {
  /**
   * When user clicks the product
   *
   * @param product Product that was clicked
   * @param event Event that triggered the click
   * @return false if the event should be prevented and stopped
   */
  onProductClick?: (product: Partial<KlevuRecord>, event: MouseEvent) => boolean
  /**
   * Function to generate url for product in case using default klevu-products
   */
  generateProductUrl?: (product: Partial<KlevuRecord>) => string

  renderPrice?: typeof renderPrice
}

export function getGlobalSettings(): KlevuUIGlobalSettings | undefined {
  if (window) {
    // @ts-expect-error
    return window["klevu_ui_settings"]
  }
  return undefined
}
