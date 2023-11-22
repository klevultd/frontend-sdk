import { KlevuRecord } from "@klevu/core"

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
  renderPrice?: (amount: number | string, currency: string) => string

  /**
   * Replace icons with custom image based ones
   */
  icons?: {
    [key: string]: string
  }

  /**
   * Disables custom scrollbars and uses native browser ones instead.
   */
  useNativeScrollbars?: boolean
}

export function closestElement<T extends Element>(selector: string, base: Element) {
  function __closestFrom(el: Element | Window | Document): T | null {
    if (!el || el === document || el === window) {
      return null
    }
    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot!
    }
    let found: T | null = (el as Element).closest(selector)
    return found ? found : __closestFrom(((el as Element).getRootNode() as ShadowRoot).host)
  }
  return __closestFrom(base)
}
