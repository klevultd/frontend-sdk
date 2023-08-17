import { Component, Fragment, Host, State, h, Element, Prop, Listen } from "@stencil/core"

import { KlevuInit } from "../klevu-init/klevu-init"
import {
  MoiMessages,
  MoiSession,
  startMoi,
  MoiSavedFeedback,
  MoiActionsMessage,
  KlevuConfig,
  MoiRequest,
} from "@klevu/core"
import { KlevuTextfieldVariant } from "../klevu-textfield/klevu-textfield"
import { Placement } from "@floating-ui/dom"
import { onKlevuMessageFeedbackDetails } from "../klevu-chat-messages/klevu-chat-messages"
import { KlevuMessageFeedbackReasonDetails } from "../klevu-chat-bubble/klevu-chat-bubble"
import { parts } from "../../utils/parts"

/**
 * Klevu Product Query popup application that shows a popup for asking questions about a product
 *
 * @csspart product-query-header - Header of the popup
 * @csspart product-query-footer - Footer of the popup where input is
 * @csspart product-query-feedback - Feedback section of the popup when it is being closed
 * @csspart product-query-open-button - Button that opens the popup
 * @csspart popup-origin - Popup origin element
 * @csspart popup-content - Popup content element
 *
 * @slot fineprint - Fine print of the popup
 */
@Component({
  tag: "klevu-product-query-popup",
  styleUrl: "klevu-product-query-popup.css",
  shadow: true,
})
export class KlevuProductQueryPopup {
  session?: MoiSession
  #popup?: HTMLKlevuPopupElement
  #layoutElement?: HTMLKlevuChatLayoutElement
  #contentDiv?: HTMLDivElement

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
  @Prop() tTextFieldPlaceholder: string = "Ask a questions"

  /**
   * Title of the popup
   */
  @Prop() tPopupTitle = "Ask a Question"

  /**
   * Text of the button to open the popup
   */
  @Prop() tButtonText = "Ask a Question"

  /**
   * Fine print of the popup under the title
   */
  @Prop() tFinePrint = "I'm an AI model. Sometimes, I may make mistakes. Please verify answers on the product page."

  /**
   * When loading takes a bit longer, show this text
   */
  @Prop() tLoadingSorry =
    "I take a few extra seconds when answering the first question sometimes if I need to scan whole page."

  /**
   * Title of the feedback section when closing the popup
   */
  @Prop() tRateExperienceTitle = "Rate your experience"

  /**
   * Description of the feedback section when closing the popup
   */
  @Prop() tRateExperienceText = "How was your experience using this Q&A tool?"

  /**
   * Data protection notice when user registering is enabled
   */
  @Prop() tDataProtectionNotice =
    "We are compliant with data protection regulations. Visit our privacy policy to learn how we collect, keep, and process your private information in accordance with these laws."

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

  /**
   * Element to anchor the product query popup to
   */
  @Prop() originElement?: HTMLElement

  /**
   * Disable closing the popup when clicking outside of it
   */
  @Prop() disableCloseOutsideClick?: boolean

  /**
   * Config for Klevu
   */
  @Prop() config?: KlevuConfig

  @State() text = ""
  @State() name = ""
  @State() email = ""
  @State() registered = true // change to false when registering works
  @State() showFeedback = false
  @State() showLoading = false
  @State() showLoadingSorry = false
  @State() feedbacks: MoiSavedFeedback[] = []
  @State() showMessageFeedbackFor?: string

  @Element()
  el!: HTMLKlevuProductElement

  @State() messages: MoiMessages = []

  async connectedCallback() {
    await KlevuInit.ready()

    if (window.klevu_page_meta?.itemId) {
      this.productId = window.klevu_page_meta.itemId
    }

    if (!this.productId && this.url == "") {
      const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
      this.url = canonical?.href ?? window.location.href
    }
  }

  onMessage() {
    if (!this.session) {
      return
    }
    this.messages = this.session.messages
    this.feedbacks = this.session.feedbacks
    this.#layoutElement?.scrollMainToBottom()
  }

  async #sendMessage() {
    const message = this.text.trim()

    if (message == "") {
      return
    }

    this.text = ""
    this.#layoutElement?.scrollMainToBottom()
    this.showLoading = true
    const timeout = setTimeout(() => {
      this.showLoadingSorry = true
    }, 4000)
    await this.session?.query({
      message: message,
      klevuSettings: this.settings,
    })
    clearTimeout(timeout)
    this.showLoadingSorry = false
    this.showLoading = false
  }

  #register() {
    this.session?.messages.push({
      message: {
        id: "register",
        type: "text",
        value: `${this.name}, (${this.email})`,
        note: null,
      },
    })
    this.registered = true
    this.#layoutElement?.scrollMainToBottom()
  }

  #pqafeedback(dir: "up" | "down") {
    this.#popup?.closeModal()
  }

  #closeModal(e: CustomEvent<void>) {
    /*
    if (!this.showFeedback) {
      this.showFeedback = true
      e.preventDefault()
      return
    }
    */
  }

  async #start() {
    this.showFeedback = false
    const useConfig = this.config?.apiKey && this.config?.apiKey !== ""

    this.session = await startMoi({
      onMessage: this.onMessage.bind(this),
      // Do nothing on redirect as we have our own system
      onRedirect: () => {},
      url: this.url === "" ? undefined : this.url,
      productId: this.productId,
      mode: "PQA",
      onAction: this.#onAction.bind(this),
      pqaWidgetId: this.pqaWidgetId,
      settings: {
        configOverride: useConfig ? this.config : undefined,
      },
    })
    this.messages = this.session.messages
    this.feedbacks = this.session.feedbacks

    await this.#layoutElement?.scrollMainToBottom("instant")

    // add this when registering works
    //this.registered = this.messages.length > 1
  }

  #onAction(action: MoiActionsMessage["actions"]["actions"][number]) {
    if (action.type !== "askFeedbackReason") {
      return
    }

    this.showMessageFeedbackFor = action.context.messageId
  }

  async #onFeedback(e: CustomEvent<onKlevuMessageFeedbackDetails>) {
    await this.session?.addFeedback(e.detail.message.id, e.detail.feedback)
    this.feedbacks = this.session?.feedbacks || []
  }

  @Listen("klevuMessageFeedbackReason")
  async onMessageFeedback(e: CustomEvent<KlevuMessageFeedbackReasonDetails>) {
    await this.session?.addFeedback(e.detail.feedback.id, e.detail.feedback.thumbs, e.detail.reason)
    this.feedbacks = this.session?.feedbacks || []
    this.messages = this.session?.messages || []
  }

  render() {
    return (
      <Host>
        <klevu-popup
          ref={(el) => (this.#popup = el)}
          exportparts={parts["klevu-popup"]}
          onKlevuPopupClose={this.#closeModal.bind(this)}
          onKlevuPopupOpen={() => {
            this.#start()
          }}
          anchor={this.popupAnchor}
          offset={this.popupOffset}
          elevation={3}
          useBackground={this.useBackground}
          popupWidth={520}
          originElement={this.originElement}
          closeAtOutsideClick={!this.disableCloseOutsideClick}
        >
          <div class="content" slot="content" ref={(el) => (this.#contentDiv = el)}>
            {this.showFeedback ? this.#renderFeedback() : this.#renderChat()}
          </div>
        </klevu-popup>
      </Host>
    )
  }

  #renderChat() {
    return (
      <Fragment>
        <klevu-chat-layout ref={(el) => (this.#layoutElement = el)} elementForHeightCalculation={this.#contentDiv}>
          <div part="product-query-header" slot="header">
            <div class="header">
              <klevu-typography variant="body-m-bold">{this.tPopupTitle}</klevu-typography>
              <klevu-icon name="close" onClick={() => this.#popup?.closeModal()} />
            </div>

            <klevu-typography variant="body-xs" class="fineprint">
              {this.tFinePrint}
              <slot name="after-fineprint"></slot>
            </klevu-typography>
          </div>
          <klevu-chat-messages
            messages={this.messages}
            feedbacks={this.feedbacks}
            enableMessageFeedback
            onKlevuMessageFeedback={this.#onFeedback.bind(this)}
            showFeedbackFor={this.showMessageFeedbackFor}
          >
            <div slot="chat-messages-after">
              {this.showLoading ? <klevu-loading-indicator /> : null}
              {this.showLoadingSorry ? (
                <klevu-typography class="loading-sorry" variant="body-xs">
                  {this.tLoadingSorry}
                </klevu-typography>
              ) : null}
            </div>
          </klevu-chat-messages>
          <div part="product-query-footer" slot="footer">
            {!this.registered ? (
              <Fragment>
                <div class="inputs">
                  <klevu-textfield
                    value={this.name}
                    variant="pill"
                    placeholder="Name"
                    onKlevuTextEnterPressed={() => this.#register()}
                    onKlevuTextChanged={(e) => (this.name = e.detail)}
                  ></klevu-textfield>
                  <klevu-textfield
                    value={this.email}
                    variant="pill"
                    placeholder="Email"
                    onKlevuTextEnterPressed={() => this.#register()}
                    onKlevuTextChanged={(e) => {
                      this.email = e.detail
                    }}
                  ></klevu-textfield>
                  <klevu-button icon="send" onClick={() => this.#register()}></klevu-button>
                </div>
                <klevu-typography variant="body-xs">{this.tDataProtectionNotice}</klevu-typography>
              </Fragment>
            ) : (
              <div class="sendmessage">
                <klevu-textfield
                  value={this.text}
                  variant={this.textFieldVariant}
                  placeholder={this.tTextFieldPlaceholder}
                  onKlevuTextEnterPressed={() => this.#sendMessage()}
                  onKlevuTextChanged={(e) => (this.text = e.detail)}
                ></klevu-textfield>
                {this.askButtonText ? (
                  <klevu-button onClick={() => this.#sendMessage()}>{this.askButtonText}</klevu-button>
                ) : (
                  <klevu-button icon="chevron_right" onClick={() => this.#sendMessage()}></klevu-button>
                )}
              </div>
            )}
          </div>
        </klevu-chat-layout>
      </Fragment>
    )
  }

  #renderFeedback() {
    return (
      <div class="pqa_feedback" part="product-query-feedback">
        <klevu-typography variant="body-l-bold">{this.tRateExperienceTitle}</klevu-typography>
        <klevu-typography variant="body-m">{this.tRateExperienceText}</klevu-typography>
        <div>
          <klevu-icon onClick={() => this.#pqafeedback("up")} name="thumb_up" />
          <klevu-icon onClick={() => this.#pqafeedback("down")} name="thumb_down" />
        </div>
      </div>
    )
  }
}
