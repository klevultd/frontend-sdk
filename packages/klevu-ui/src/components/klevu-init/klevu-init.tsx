import { KMCRootObject, KlevuConfig, KlevuKMCSettings } from "@klevu/core"
import { Component, h, Host, Method, Prop } from "@stencil/core"
import { KlevuUIGlobalSettings } from "../../utils/utils"
import en from "../../translations/en.json"

/**
 * List of available translations
 */
export type Translations = "en" | "fi"

/**
 * Translation typing to auto complete
 */
export type Translation = typeof en

/**
 *
 * `klevu-init` is the most important component of the whole library. Place one in your document. It should be
 * one of the first ones in the `<body>` tag. Currently only one `klevu-init` per page is supported. It is used to define
 * configuration for all components on the page and provide few global settings for all components:
 *
 * - **onItemClick:** what happens when product is clicked. Typically this places default action of
 *   _klevu-product_ click. For example you can make your own frontend router to act in this function. Is
 *   provided with product and click event as attributes. Remember to preventDefault and return false to prevent anchor
 *   link following.
 * - **generateProductUrl:** what kind of URL's should be generated for products. If _onItemClick_
 *   is not used this can be used for it. Has product as attribute.
 * - **renderPrice:** generic function for price rendering. If you wish to have your own formatting for price
 *   rendering then this is the place. Has two attribute amount and currency of item.
 * Initializes components to fetch data from correct Klevu backend
 *
 * Klevu init also initializes Google Material Icon font. It automatically injects the font to the page.
 *
 * **Note: All global CSS variables are documented in `klevu-init` even thought they are not defined in it.**
 *
 * @cssprop --klevu-color-primary #2b4af7 The primary color
 * @cssprop --klevu-color-primary-darker #0d2ee8  Darker variant of primary color
 *
 * @cssprop --klevu-color-positive #2e9c40 Positive color
 * @cssprop --klevu-color-negative #ad2d2d Negative color
 *
 * @cssprop --klevu-color-neutral-1 #ffffff Background color
 * @cssprop --klevu-color-neutral-2 #f6f6f6
 * @cssprop --klevu-color-neutral-3 #ededed
 * @cssprop --klevu-color-neutral-4 #e3e3e3
 * @cssprop --klevu-color-neutral-5 #d6d6d6
 * @cssprop --klevu-color-neutral-6 #919191
 * @cssprop --klevu-color-neutral-7 #757575
 * @cssprop --klevu-color-neutral-8 #191919 Text color
 *
 * @cssprop --klevu-color-accent-1 #8eedd3 Accent color
 * @cssprop --klevu-color-accent-2 #ffcb9f Accent color
 * @cssprop --klevu-color-accent-3 #ffb8d6 Accent color
 * @cssprop --klevu-color-accent-4 #c3d7ff Accent color
 *
 * @cssprop --klevu-spacing-01 1px Spacing 01
 * @cssprop --klevu-spacing-02 4px Spacing 02
 * @cssprop --klevu-spacing-03 8px Spacing 03
 * @cssprop --klevu-spacing-04 12px Spacing 04
 * @cssprop --klevu-spacing-05 16px Spacing 05
 * @cssprop --klevu-spacing-06 24px Spacing 06
 * @cssprop --klevu-spacing-07 32px Spacing 07
 * @cssprop --klevu-spacing-08 40px Spacing 08
 * @cssprop --klevu-spacing-09 48px Spacing 09
 * @cssprop --klevu-spacing-10 64px Spacing 10
 */
@Component({
  tag: "klevu-init",
  shadow: true,
})
export class KlevuInit {
  /**
   * Read only API key to Klevu
   */
  @Prop() apiKey!: string
  /**
   * Klevu Server URL
   */
  @Prop() url!: string
  /**
   * Global settings
   */
  @Prop() settings?: KlevuUIGlobalSettings

  /**
   * Which language to load
   */
  @Prop() language: Translations = "en"

  /**
   * Provide your own translations
   */
  @Prop() translation?: Translation

  /**
   * Override the default translation URL prefix. Will use format of
   * `${translationUrlPrefix}/translations/${lang}.json`
   */
  @Prop() translationUrlPrefix?: string

  @Prop() kmcLoadDefaults?: boolean

  async connectedCallback() {
    KlevuConfig.init({
      apiKey: this.apiKey,
      url: this.url,
    })

    window["klevu_ui_settings"] = this.settings
    if (this.translation) {
      window["klevu_ui_translations"] = this.translation
    } else if (this.language != "en") {
      window["klevu_ui_translations"] = await fetchTranslation(this.language, this.translationUrlPrefix)
    }

    if (this.kmcLoadDefaults) {
      const data = await KlevuKMCSettings()
      window["klevu_ui_kmc_settings"] = data.root
    }
  }

  /**
   *
   * @returns KlevuConfig, but due to typescript problems it is any
   */
  @Method()
  async getConfig(): Promise<any> {
    return KlevuConfig.getDefault()
  }

  /**
   * Get settings defined in klevu-init
   *
   * @returns
   */
  @Method()
  async getSettings(): Promise<KlevuUIGlobalSettings | undefined> {
    return this.settings
  }

  /**
   * To make sure that components in the page wait for klevu-init to run and set the settings this method is required to use.
   * In `connectedCallback()` function should call this method. So for example:
   *
   * ```
   * async connectedCallback() {
   *   await KlevuInit.ready()
   * }
   * ```
   *
   * @returns Promise when klevu-init is loaded
   */
  static ready() {
    return document.querySelector("klevu-init")?.componentOnReady()
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}

async function fetchTranslation(lang: Translations, urlPrefix?: string): Promise<typeof en> {
  // when not provided try loading translations from two folders up in the url
  if (!urlPrefix) {
    const parts = import.meta.url.split("/")
    parts.splice(-2, 2)
    urlPrefix = parts.join("/")
  }
  return new Promise((resolve, reject): void => {
    fetch(`${urlPrefix}/translations/${lang}.json`).then(
      (result) => {
        if (result.ok) resolve(result.json())
        else reject()
      },
      () => reject()
    )
  })
}

// extends window type with klevu_ui_settings and other known Klevu variables
declare global {
  interface Window {
    klevu_ui_settings?: KlevuUIGlobalSettings
    klevu_ui_translations?: typeof en
    klevu_page_meta?: {
      pageType?: string
      itemName?: string
      itemUrl?: string
      itemId?: string
      itemGroupId?: string
      itemSalePrice?: string
      itemCurrency?: string
    }
    klevu_ui_kmc_settings?: KMCRootObject
  }
}
