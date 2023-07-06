import { KlevuRecord } from "@klevu/core"

/**
 * Render given price with browsers own currency format.
 *
 * @param amount
 * @param currency
 * @returns formatted price
 */
export function renderPrice(amount: number | string, currency: string): string {
  if (window?.["klevu_ui_settings"]?.renderPrice) {
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
 * Strip html tags from string.
 *
 * @param html
 * @returns
 */
export function stripTags(html: string): string {
  if (!document) {
    return html
  }

  const tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}

/**
 * Global settings that modify the way Klevu UI library works.
 */
export type KlevuUIGlobalSettings = {
  /**
   * When user clicks the product
   *
   * @param item Product that was clicked
   * @param event Event that triggered the click
   * @return false if the event should be prevented and stopped
   */
  onItemClick?: (item: Partial<KlevuRecord>, event: MouseEvent) => boolean

  /**
   * Function to generate url for product in case using default klevu-products
   */
  generateProductUrl?: (product: Partial<KlevuRecord>) => string

  /**
   * Generic way to render prices. By default browser currency renderer is used
   */
  renderPrice?: typeof renderPrice

  /**
   * Replace icons with custom image based ones
   */
  icons?: {
    [key: string]: string
  }
}

export function getGlobalSettings(): KlevuUIGlobalSettings | undefined {
  if (window) {
    return {
      renderPrice,
      ...window["klevu_ui_settings"],
    }
  }
  return undefined
}
