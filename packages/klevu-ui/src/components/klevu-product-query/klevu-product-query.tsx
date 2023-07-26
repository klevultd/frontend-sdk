import { Placement } from "@floating-ui/dom"
import { KlevuConfig, MoiRequest } from "@klevu/core"
import { Component, Element, Fragment, Host, Prop, State, h } from "@stencil/core"
import { KlevuTextfieldVariant } from "../klevu-textfield/klevu-textfield"

/**
 * Button that is placed on the site to start a product query session
 *
 * @csspart product-query-header - Header of the popup
 * @csspart product-query-footer - Footer of the popup where input is
 * @csspart product-query-feedback - Feedback section of the popup when it is being closed
 * @csspart product-query-open-button - Button that opens the popup
 * @csspart popup-origin - Popup origin element
 * @csspart popup-content - Popup content element
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
  @State() config?: KlevuConfig

  /**
   * Url of the page where the product is
   */
  @Prop() url: string = ""

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
  @Prop() textFieldPlaceholder: string = "Ask a questions"

  /**
   * Title of the popup
   */
  @Prop() popupTitle = "Ask a Question"

  /**
   * Text of the button to open the popup
   */
  @Prop() buttonText = "Ask a Question"

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
  @Prop() popupOffset?: number

  /**
   * Settings for requests to Klevu. Deeper modification on how the product query works.
   */
  @Prop() settings?: MoiRequest["klevuSettings"]

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
    const statusJSON = await res.json()
    this.isEnabled = statusJSON.status === "UNKNOWN" || statusJSON.status === "ENABLED"
  }

  render() {
    if (!this.isEnabled) {
      return null
    }

    return (
      <Host>
        <klevu-button ref={(el) => (this.origin = el)} part="klevu-query-open-button">
          {this.buttonText}
        </klevu-button>
        {this.origin && (
          <klevu-util-portal>
            <klevu-product-query-popup
              url={this.url}
              productId={this.productId}
              pqaWidgetId={this.pqaWidgetId}
              finePrint={this.finePrint}
              popupTitle={this.popupTitle}
              askButtonText={this.askButtonText}
              textFieldPlaceholder={this.textFieldPlaceholder}
              settings={this.settings}
              popupAnchor={this.popupAnchor}
              popupOffset={this.popupOffset}
              exportparts="popup-content, popup-origin, product-query-header, product-query-footer, product-query-feedback, product-query-open-button, popup-origin, popup-content"
              useBackground={this.useBackground}
              originElement={this.origin}
              config={this.config}
            ></klevu-product-query-popup>
          </klevu-util-portal>
        )}
      </Host>
    )
  }
}
