import { KMCRootObject, KlevuConfig, KlevuKMCSettings } from "@klevu/core"
import { Component, h, Host, Method, Prop, Watch, State, Event, EventEmitter } from "@stencil/core"
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
 *
 * **Note: All global CSS variables are documented in `klevu-init` even thought they are not defined in it.**
 *
 */
@Component({
  tag: "klevu-init",
  shadow: true,
  styleUrl: "klevu-init.css",
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
   * Override the default events v1 URL
   */
  @Prop() eventsV1Url?: string

  /**
   * Override the default events v2 URL
   */
  @Prop() eventsV2Url?: string

  /**
   * Override the default recommendations API URL
   */
  @Prop() recommendationsApiUrl?: string

  /**
   * Override the default session API URL
   */
  @Prop() visitorServiceUrl?: string
  /**
   * Global settings
   */
  @Prop() settings: KlevuUIGlobalSettings = {
    renderPrice,
  }

  /**
   * Which language to load
   */
  @Prop() language: Translations = "en"

  /**
   * Provide your own translations
   */
  @Prop() translation?: Translation

  /**
   * Enable Klaviyo integration
   */
  @Prop() enableKlaviyoConnector?: boolean

  /**
   * Enable Data Protection
   */
  @Prop() useConsent?: boolean = false

  /**
   * Data read consent given
   */
  @Prop() consentGiven?: boolean = false

  /**
   * Override the default assets path. Will use format of `${assetsPath}/assets/${resource}`
   */
  @Prop() assetsPath?: string

  /**
   * Override the default translation URL prefix. Will use format of
   * `${translationUrlPrefix}/translations/${lang}.json`
   */
  @Prop() translationUrlPrefix?: string

  @Prop() kmcLoadDefaults?: boolean

  @Event({
    composed: true,
  })
  klevuInitSettingsUpdated!: EventEmitter<KlevuUIGlobalSettings>

  @Watch("settings")
  async settingsChanged(newValue: KlevuUIGlobalSettings, oldValue: KlevuUIGlobalSettings) {
    await this.#defineSettings(newValue)
    this.klevuInitSettingsUpdated.emit(this.settings)
  }

  async connectedCallback() {
    console.log({
      enableKlaviyoConnector: this.enableKlaviyoConnector,
      useConsent: this.useConsent,
      consentGiven: this.consentGiven,
    })
    KlevuConfig.init({
      apiKey: this.apiKey,
      url: this.url,
      eventsApiV1Url: this.eventsV1Url,
      eventsApiV2Url: this.eventsV2Url,
      recommendationsApiUrl: this.recommendationsApiUrl,
      visitorServiceUrl: this.visitorServiceUrl,
      enableKlaviyoConnector: this.enableKlaviyoConnector || false,
      useConsent: this.useConsent || false,
      consentGiven: this.consentGiven || false,
    })

    if (this.translation) {
      window["klevu_ui_translations"] = this.translation
    } else if (this.language && this.language != "en") {
      window["klevu_ui_translations"] = await fetchTranslation(this.language, this.translationUrlPrefix)
    }

    this.#defineSettings(this.settings)
  }

  async #defineSettings(settings: KlevuUIGlobalSettings) {
    this.settings = settings
    if (this.kmcLoadDefaults) {
      const data = await KlevuKMCSettings()
      window["klevu_ui_kmc_settings"] = data.root
      if (data.root?.klevu_uc_userOptions.priceFormatter) {
        this.settings.renderPrice = (...params) =>
          this.#renderPriceKMCSettings(...params, data.root!.klevu_uc_userOptions.priceFormatter)
      }
      if (this.enableKlaviyoConnector === undefined) {
        this.enableKlaviyoConnector = data.root?.klevu_connectors?.klaviyo?.segmentEnabled || false
      }
      KlevuConfig.getDefault().setEnableKlaviyoConnector(this.enableKlaviyoConnector)
    }
  }

  #setKMCPriceCalculationSetting(
    settings: KlevuUIGlobalSettings,
    priceSettings: KMCRootObject["klevu_uc_userOptions"]["priceFormatter"] | undefined
  ) {
    if (!priceSettings || settings.renderPrice) return settings

    if (priceSettings) {
      settings = {
        ...(settings || {}),
        renderPrice: (...params) => this.#renderPriceKMCSettings(...params, priceSettings),
      }
    }
  }

  #renderPriceKMCSettings(
    amount: string | number,
    currency: string,
    priceSettings: KMCRootObject["klevu_uc_userOptions"]["priceFormatter"]
  ) {
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

  @Method()
  async getAssetsPath(): Promise<string> {
    return this.assetsPath ?? "/"
  }

  @Method()
  async setConsentGiven(val: boolean) {
    this.consentGiven = val
    KlevuConfig.getDefault().setConsentGiven(val)
  }

  @Method()
  async setUseConsent(val: boolean) {
    this.useConsent = val
    KlevuConfig.getDefault().setUseConsent(val)
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

function renderPrice(amount: number | string, currency: string): string {
  const price = typeof amount === "string" ? parseFloat(amount) : amount
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(price)
}

// extends window type with known Klevu variables
declare global {
  interface Window {
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
