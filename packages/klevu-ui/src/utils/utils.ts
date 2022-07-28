import { KlevuRecord } from "@klevu/core"

/**
 * Render given price with browsers own currency format.
 *
 * @param amount
 * @param currency
 * @returns formatted price
 */
export function renderPrice(amount: number | string, currency: string): string {
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
 * Global settings that modify the way Klevu UI library works.
 */
type KlevuGlobalSettings = {
  onProductClick?: (product: KlevuRecord, event: MouseEvent) => void
  generateProductUrl?: (product: KlevuRecord) => string
}

export function getGlobalSettings(): KlevuGlobalSettings | undefined {
  if (window) {
    return window["klevu_settings"]
  }
  return undefined
}
