import { KlevuRecord } from "@klevu/core"
import { getKMCSettings } from "./getKMCSettings"

type PriceFormatSettings = {
  thousandSeparator: string
  decimalPlaces: string
  decimalSeparator: string
  appendCurrencyAtLast: boolean
  currencySymbol: string
}

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
  // Use KMC settings to format price
  const kmcSettings = getKMCSettings()
  const priceSettings: PriceFormatSettings | undefined = kmcSettings?.klevu_uc_userOptions.priceFormatter
  if (priceSettings) {
    // Format amount to decimal
    let formattedAmount = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: parseInt(priceSettings.decimalPlaces, 10),
    }).format(parseFloat(amount.toString()))

    let [integerPart, decimalPart = ""] = formattedAmount.split(".")

    // Replace thousands separator
    formattedAmount = integerPart.replace(/,/, priceSettings.thousandSeparator)

    // Combine back with decimal separator if exists
    if (decimalPart) {
      formattedAmount += priceSettings.decimalSeparator + decimalPart
    }

    if (priceSettings.appendCurrencyAtLast) {
      formattedAmount = `${formattedAmount} ${priceSettings.currencySymbol}`
    } else {
      formattedAmount = `${priceSettings.currencySymbol} ${formattedAmount}`
    }
    return formattedAmount
  }
  return amount.toString()
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

  /**
   * Method called when adding product to cart.
   *
   * Remember to prevent default event behaviour if you want to handle it yourself.
   *
   * @param product Product that was added to cart
   * @param event Event that triggered the add to cart
   */
  addToCart?: (product: Partial<KlevuRecord>, event: Event) => void
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
