import { Placement } from "@floating-ui/dom"
import { KlevuConfig, MoiRequest, ProductInfo } from "@klevu/core"
import { Component, Element, Fragment, Host, Prop, State, h } from "@stencil/core"
import { KlevuTextfieldVariant } from "../klevu-textfield/klevu-textfield"
import { partsExports } from "../../utils/partsExports"

export type WidgetLayout = "embedded" | "popup"

/**
 * Button that is placed on the site to start a product query session
 *
 * @csspart product-query-open-button Button that opens the popup
 *
 * @slot before-button-text - Before origin button text
 * @slot after-button-text - After origin button text
 * @slot after-fineprint - After fineprint in the popup
 */
@Component({
  tag: "klevu-product-query",
  styleUrl: "klevu-product-query.css",
  shadow: true,
})
export class KlevuProductQuery {
  @Element() el!: HTMLKlevuProductQueryElement

  @State() origin?: HTMLKlevuButtonElement
  @State() isEnabled = false
  @State() removeAskloBranding = false
  @State() config?: KlevuConfig

  /**
   * Url of the page where the product is
   */
  @Prop() url: string = ""
  @Prop() additionaldata: string = ""

  /**
   * Alternative to url, productId can be used to start a session
   */
  @Prop() productId?: string

  /**
   * Instead of Klevu API-key use a widget id to start a session
   */
  @Prop() pqaWidgetId?: string

  /**
   * Variant of the textfield how does it look like
   */
  @Prop() textFieldVariant: KlevuTextfieldVariant = "pill"

  /**
   * Placeholder of the textfield
   */
  @Prop() textFieldPlaceholder: string = "Enter your question here..."

  /**
   * Title of the popup
   */
  @Prop() popupTitle = "Ask a Question"

  /**
   * Text of the button to open the popup
   */
  @Prop() buttonText = "Ask Product AI"

  /**
   * Fine print of the popup under the title
   */
  @Prop() finePrint = "I'm an AI model. Sometimes, I may make mistakes. Please verify answers on the product page."

  /**
   * Text of the button for asking a question
   */
  @Prop() askButtonText?: string

  /**
   * Use dark background with the popup
   */
  @Prop() useBackground?: boolean

  /**
   * Anchor popup to which side of the origin
   */
  @Prop() popupAnchor: Placement = "bottom-start"

  /**
   * How many pixels to offset the popup from origin
   */
  @Prop() popupOffset = 5

  /**
   * Disable closing the popup when clicking outside of it
   */
  @Prop() disableCloseOutsideClick?: boolean

  /**
   * Settings for requests to Klevu. Deeper modification on how the product query works.
   */
  @Prop() settings?: MoiRequest["klevuSettings"]

  /**
   * Use native scrollbars instead of custom ones
   */
  @Prop() useNativeScrollbars?: boolean

  /**
   * Pass function to call that will return the product info
   * eg: pass function call as string - "getProductInfo()" or function itself
   * @returns ProductInfo object
   */
  @Prop() productInfoGenerator?: string | (() => ProductInfo)
  /**
   * Product Id to be used in analytics
   */
  @Prop() itemId?: string
  /**
   * Product Group Id to be used in analytics, in case of multiple variants
   */
  @Prop() itemGroupId?: string
  /**
   * Optional Product Variant Id to be used in analytics
   */
  @Prop() itemVariantId?: string
  /**
   * Channel Id to be used in analytics
   * eg: Shopify, BigCommerce
   */
  @Prop() channelId?: string
  /**
   * Locale to be used in analytics
   * eg: en_US
   */
  @Prop() locale?: string

  /**
   * Set to false if you want to show the popup in place instead of dialog box
   */
  @Prop() pqaWidgetLayout: WidgetLayout = "popup"

  async connectedCallback() {
    this.config = await this.el.closest("klevu-init")?.getConfig()
    this.#checkIsPQAEnabled()
  }

  async #checkIsPQAEnabled() {
    if (!this.pqaWidgetId) {
      this.isEnabled = true
      return
    }
    const res = await window.fetch(`${this.config?.moiApiUrl}chat/status?pqaWidgetId=${this.pqaWidgetId}`)
    const configJSON = await res.json()
    this.isEnabled = configJSON.status === "UNKNOWN" || configJSON.status === "ENABLED"
    this.removeAskloBranding = configJSON.removeAskloBranding
  }

  render() {
    if (!this.isEnabled) {
      return null
    }

    return this.pqaWidgetLayout === "popup" ? (
      <Host>
        <klevu-button
          ref={(el) => (this.origin = el)}
          part="klevu-query-open-button"
          exportparts={partsExports("klevu-button")}
        >
          <slot name="before-button-text"></slot>
          {this.buttonText}
          <slot name="after-button-text"></slot>
        </klevu-button>
        <klevu-util-portal>{this.#renderChatWindow()}</klevu-util-portal>
      </Host>
    ) : (
      <Host embedded>{this.#renderChatWindow()}</Host>
    )
  }

  #renderChatWindow() {
    return (
      <klevu-product-query-popup
        additionaldata={this.additionaldata || ""}
        url={this.url}
        productId={this.productId || this.itemId}
        pqaWidgetId={this.pqaWidgetId}
        tFinePrint={this.finePrint}
        tPopupTitle={this.popupTitle}
        tTextFieldPlaceholder={this.textFieldPlaceholder}
        askButtonText={this.askButtonText}
        settings={this.settings}
        popupAnchor={this.popupAnchor}
        popupOffset={this.popupOffset}
        exportparts={partsExports("klevu-product-query-popup")}
        useBackground={this.useBackground}
        originElement={this.origin}
        disableCloseOutsideClick={this.disableCloseOutsideClick}
        config={this.config}
        useNativeScrollbars={this.useNativeScrollbars}
        itemId={this.itemId}
        itemVariantId={this.itemVariantId}
        itemGroupId={this.itemGroupId}
        channelId={this.channelId}
        locale={this.locale}
        productInfoGenerator={this.productInfoGenerator}
        textFieldVariant={this.textFieldVariant}
        pqaWidgetLayout={this.pqaWidgetLayout}
        removeAskloBranding={this.removeAskloBranding}
      >
        <slot name="after-fineprint" slot="after-fineprint"></slot>
      </klevu-product-query-popup>
    )
  }
}
