import { Component, Fragment, Host, State, h, Element, Prop, Listen, Event, EventEmitter } from "@stencil/core"

import { KlevuInit } from "../klevu-init/klevu-init"
import {
  MoiMessages,
  MoiSession,
  startMoi,
  MoiSavedFeedback,
  MoiActionsMessage,
  KlevuConfig,
  MoiRequest,
  MoiQuestion,
  ProductInfo,
  MoiProduct,
} from "@klevu/core"
import { KlevuTextfieldVariant } from "../klevu-textfield/klevu-textfield"
import { Placement } from "@floating-ui/dom"
import { onKlevuMessageFeedbackDetails } from "../klevu-chat-messages/klevu-chat-messages"
import { KlevuMessageFeedbackReasonDetails } from "../klevu-chat-bubble/klevu-chat-bubble"
import { getTranslation } from "../../utils/getTranslation"
import { partsExports } from "../../utils/partsExports"
import { WidgetLayout } from "../klevu-product-query/klevu-product-query"

/**
 * Klevu Product Query popup application that shows a popup for asking questions about a product
 *
 * @csspart product-query-popup-header Header of the popup
 * @csspart product-query-popup-footer Footer of the popup where input is
 * @csspart product-query-popup-feedback Feedback section of the popup when it is being closed
 *
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
  poweredByMessage = "Powered by ASKLO."

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
  @Prop() tTextFieldPlaceholder = getTranslation("productQueryPopup.tTextFieldPlaceholder")

  /**
   * Title of the popup
   */
  @Prop() tPopupTitle = getTranslation("productQueryPopup.tPopuptitle")

  /**
   * Text of the button to open the popup
   */
  @Prop() tButtonText = getTranslation("productQueryPopup.tButtonText")

  /**
   * Fine print of the popup under the title
   */
  @Prop() tFinePrint = ""

  /**
   * When loading takes a bit longer, show this text
   */
  @Prop() tLoadingSorry = getTranslation("productQueryPopup.tLoadingSorry")

  /**
   * When sending a message fails, show this text
   */
  @Prop() tAnswerError = getTranslation("productQueryPopup.tAnswerError")

  /**
   * Title of the feedback section when closing the popup
   */
  @Prop() tRateExperienceTitle = getTranslation("productQueryPopup.tRateExperienceTitle")

  /**
   * Description of the feedback section when closing the popup
   */
  @Prop() tRateExperienceText = getTranslation("productQueryPopup.tRateExperienceText")

  /**
   * Data protection notice when user registering is enabled
   */
  @Prop() tDataProtectionNotice = getTranslation("productQueryPopup.tDataProtectionNotice")

  #disclaimer = getTranslation("productQueryPopup.disclaimer")
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

  /**
   * Use native scrollbars instead of custom ones
   */
  @Prop() useNativeScrollbars?: boolean

  /**
   * Pass any additional data you would want the AI to use for context
   */
  @Prop() additionaldata?: string = ""

  /**
   * Pass function to call that will return the product info
   * eg: pass function call as string - "getProductInfo()" or function
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
   * eg: Shopify, Bigcommerce
   */
  @Prop() channelId?: string
  /**
   * Locale to be used in analytics
   * eg: en_US
   */
  @Prop() locale?: string

  /**
   * Set to false if you want to show this in place instead of dialog box
   */
  @Prop() pqaWidgetLayout: WidgetLayout = "popup"

  /**
   * Set to true if you want to remove the powered by ribbon
   */
  @Prop() removeAskloBranding = false

  /**
   * Set to true if you want to hide the embedded title
   */
  @Prop() hideEmbeddedTitle?: boolean = false

  @State() text = ""
  @State() name = ""
  @State() email = ""
  @State() registered = true // change to false when registering works
  @State() showFeedback = false
  @State() showLoading = false
  @State() showLoadingSorry = false
  @State() sendMessageError = false
  @State() feedbacks: MoiSavedFeedback[] = []
  @State() showMessageFeedbackFor?: string

  @Element()
  el!: HTMLKlevuProductElement

  @State() messages: MoiMessages = []
  @State() questions: MoiQuestion[] = []
  @State() hideQuestions = false

  async connectedCallback() {
    await KlevuInit.ready()
    if (!this.productId) {
      this.productId = this.itemId
    }
    if (!this.productId && window.klevu_page_meta?.itemId) {
      this.productId = window.klevu_page_meta.itemId
    }
    if (!this.productId && this.url == "") {
      const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
      this.url = canonical?.href ?? window.location.href
    }
    if (this.pqaWidgetLayout !== "popup") {
      this.#start()
    }
  }

  onMessage() {
    if (!this.session) {
      return
    }
    this.messages = this.session.messages
    this.feedbacks = this.session.feedbacks
    this.questions = this.session.questions
    this.#layoutElement?.scrollMainToBottom()
    this.sendMessageError = false
  }

  async #sendMessage(overrideMessageValue?: string) {
    const message = overrideMessageValue || this.text.trim()

    if (message == "") {
      return
    }

    this.text = ""
    this.#layoutElement?.scrollMainToBottom()
    this.showLoading = true
    const timeout = setTimeout(() => {
      this.showLoadingSorry = true
    }, 4000)
    await this.session
      ?.query(
        {
          message: message,
          klevuSettings: this.settings,
        },
        "send"
      )
      .catch((err) => {
        this.sendMessageError = true
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
  #fireProductInfoGenerator() {
    try {
      if (this.productInfoGenerator) return eval(this.productInfoGenerator as string)
    } catch (err) {
      console.error("Failed to generate product info, check function passed", err)
    }
    return undefined
  }

  async #start() {
    this.showLoading = true
    this.showFeedback = false
    const useConfig = this.config?.apiKey && this.config?.apiKey !== ""
    const productInfo = this.productInfoGenerator
      ? typeof this.productInfoGenerator === "string"
        ? this.#fireProductInfoGenerator()
        : this.productInfoGenerator()
      : undefined

    this.session = await startMoi({
      onMessage: this.onMessage.bind(this),
      // Do nothing on redirect as we have our own system
      onRedirect: () => {},
      url: this.url === "" ? undefined : this.url,
      productId: this.productId,
      mode: "PQA",
      onAction: this.#onAction.bind(this),
      pqaWidgetId: this.pqaWidgetId,
      additionalData: this.additionaldata,
      itemId: this.itemId,
      itemGroupId: this.itemGroupId,
      itemVariantId: this.itemVariantId,
      channelId: this.channelId,
      locale: this.locale,
      productInfo,
      settings: {
        configOverride: useConfig ? this.config : undefined,
        alwaysStartConversation: true,
      },
    })
    this.messages = this.session.messages
    this.questions = this.session.questions
    this.feedbacks = this.session.feedbacks

    await this.#layoutElement?.scrollMainToBottom("instant")
    this.showLoading = false
    // add this when registering works
    //this.registered = this.messages.length > 1
  }

  #onAction(action: MoiActionsMessage["actions"]["actions"][number]) {
    if (action.type !== "askFeedbackReason") {
      return
    }

    this.showMessageFeedbackFor = action.context.messageId
  }

  #onQuestionClick(question: string) {
    this.#sendMessage(question)
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

  @Event({ composed: true, cancelable: true })
  klevuMoiProductClick!: EventEmitter<MoiProduct>

  /** By default redirect the page if product click is not cancelled */
  @Listen("klevuMoiProductClick")
  onKlevuMoiProductClick(event: CustomEvent<MoiProduct>) {
    setTimeout(() => {
      if (!event.defaultPrevented) {
        window.location.href = event.detail.url
      }
    }, 1)
  }

  #onTypeWriterEffectEnds(hideQuestions: boolean) {
    this.hideQuestions = hideQuestions
    if (!hideQuestions) {
      this.#layoutElement?.scrollMainToBottom()
    }
  }

  async #productClick(product: MoiProduct) {
    if (!this.session || !product.id || !product.url) {
      return
    }
    await this.session.query({
      product: {
        id: product.id,
        context: {
          url: product.url,
        },
        intent: "redirect",
      },
    })
    this.klevuMoiProductClick.emit(product)
  }

  render() {
    return this.pqaWidgetLayout === "popup" ? (
      <Host>
        <klevu-popup
          ref={(el) => (this.#popup = el)}
          exportparts={partsExports("klevu-popup")}
          onKlevuPopupClose={this.#closeModal.bind(this)}
          onKlevuPopupOpen={() => {
            this.#start()
          }}
          anchor={this.popupAnchor}
          offset={this.popupOffset}
          elevation={3}
          useBackground={this.useBackground}
          originElement={this.originElement}
          closeAtOutsideClick={!this.disableCloseOutsideClick}
          fullscreenOnMobileSize
        >
          <div class="content" slot="content" ref={(el) => (this.#contentDiv = el)}>
            {this.showFeedback ? this.#renderFeedback() : this.#renderChat()}
          </div>
        </klevu-popup>
      </Host>
    ) : (
      <Host embedded>
        <div class="embedded">
          <div class="content" slot="content" ref={(el) => (this.#contentDiv = el)}>
            {this.showFeedback ? this.#renderFeedback() : this.#renderChat(false)}
          </div>
        </div>
      </Host>
    )
  }

  #renderChat(popupMode = true) {
    return (
      <Fragment>
        <klevu-chat-layout
          originElement={this.originElement}
          exportparts={partsExports("klevu-chat-layout")}
          useNativeScrollbars={this.useNativeScrollbars}
          ref={(el) => (this.#layoutElement = el)}
        >
          <div part="product-query-popup-header" slot="header">
            <div class="header">
              {(popupMode || !this.hideEmbeddedTitle) && (
                <klevu-typography variant="body-m-bold">{this.tPopupTitle}</klevu-typography>
              )}
              {popupMode && (
                <klevu-icon
                  originElement={this.originElement}
                  name="close"
                  id="closeDialog"
                  onClick={() => this.#popup?.closeModal()}
                />
              )}
            </div>
            <div class="fineprintContainer">
              {this.tFinePrint && (
                <klevu-typography variant="body-xs" class="fineprint">
                  {this.tFinePrint}
                </klevu-typography>
              )}
              <slot name="after-fineprint"></slot>
            </div>
          </div>
          <div class="chat-messages">
            <klevu-chat-messages
              exportparts={partsExports("klevu-chat-messages")}
              messages={this.messages}
              feedbacks={this.feedbacks}
              enableMessageFeedback
              onKlevuMessageFeedback={this.#onFeedback.bind(this)}
              showFeedbackFor={this.showMessageFeedbackFor}
              handleTypeWriterEffectEnds={this.#onTypeWriterEffectEnds.bind(this)}
              scrollBottom={() => this.#layoutElement?.scrollMainToBottom("instant")}
              onKlevuChatProductClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                this.#productClick(event.detail.product)
                return false
              }}
            >
              <div slot="chat-messages-after">
                {this.showLoading ? (
                  <klevu-loading-indicator exportparts={partsExports("klevu-loading-indicator")} />
                ) : null}
                {this.showLoadingSorry ? (
                  <klevu-typography class="loading-sorry" variant="body-xs">
                    {this.tLoadingSorry}
                  </klevu-typography>
                ) : null}
                {this.sendMessageError ? (
                  <klevu-typography class="error-text" variant="body-xs">
                    <klevu-icon name="error" class="error-icon"></klevu-icon>
                    {this.tAnswerError}
                  </klevu-typography>
                ) : null}
              </div>
            </klevu-chat-messages>
            {this.showLoading || this.hideQuestions ? null : (
              <div class="questions-container">
                {this.questions.map((question, index) => (
                  <div
                    role="button"
                    class="klevu-question"
                    onClick={() => this.#onQuestionClick(question)}
                    style={{ animationDelay: `${0.4 * index}s` }}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.49609 12.5352C4.44141 12.5352 4.39453 12.5176 4.35547 12.4824C4.32031 12.4512 4.30078 12.4102 4.29688 12.3594C4.24219 11.9688 4.1875 11.6641 4.13281 11.4453C4.08203 11.2266 3.99805 11.0625 3.88086 10.9531C3.76758 10.8398 3.5957 10.752 3.36523 10.6895C3.13477 10.627 2.81836 10.5586 2.41602 10.4844C2.29492 10.4609 2.23438 10.3945 2.23438 10.2852C2.23438 10.2305 2.25195 10.1855 2.28711 10.1504C2.32227 10.1152 2.36523 10.0938 2.41602 10.0859C2.81836 10.0312 3.13477 9.97656 3.36523 9.92188C3.5957 9.86328 3.76758 9.77734 3.88086 9.66406C3.99805 9.54688 4.08398 9.37695 4.13867 9.1543C4.19336 8.92773 4.24609 8.61523 4.29688 8.2168C4.3125 8.0957 4.37891 8.03516 4.49609 8.03516C4.61328 8.03516 4.67773 8.09766 4.68945 8.22266C4.74023 8.61328 4.79102 8.91797 4.8418 9.13672C4.89648 9.35547 4.98242 9.51953 5.09961 9.62891C5.2207 9.73828 5.39648 9.82422 5.62695 9.88672C5.85742 9.94531 6.17188 10.0117 6.57031 10.0859C6.69141 10.1094 6.75195 10.1758 6.75195 10.2852C6.75195 10.3945 6.68359 10.4609 6.54688 10.4844C6.14844 10.5469 5.83594 10.6074 5.60938 10.666C5.38281 10.7246 5.21094 10.8105 5.09375 10.9238C4.98047 11.0371 4.89648 11.2051 4.8418 11.4277C4.79102 11.6504 4.74023 11.957 4.68945 12.3477C4.67773 12.4727 4.61328 12.5352 4.49609 12.5352ZM1.71289 7.43164C1.66992 7.43164 1.63672 7.41992 1.61328 7.39648C1.58984 7.36914 1.57422 7.33594 1.56641 7.29688C1.51562 7.01953 1.46875 6.80078 1.42578 6.64062C1.38281 6.47656 1.32031 6.35156 1.23828 6.26562C1.15625 6.17578 1.0332 6.10742 0.869141 6.06055C0.705078 6.01367 0.476562 5.96484 0.183594 5.91406C0.09375 5.89844 0.0488281 5.84961 0.0488281 5.76758C0.0488281 5.68555 0.09375 5.63672 0.183594 5.62109C0.476562 5.57031 0.705078 5.52148 0.869141 5.47461C1.0332 5.42383 1.15625 5.35547 1.23828 5.26953C1.32031 5.18359 1.38281 5.06055 1.42578 4.90039C1.46875 4.73633 1.51562 4.51367 1.56641 4.23242C1.58203 4.14648 1.63086 4.10352 1.71289 4.10352C1.79102 4.10352 1.83789 4.14648 1.85352 4.23242C1.9043 4.51367 1.95117 4.73633 1.99414 4.90039C2.03711 5.06055 2.09961 5.18359 2.18164 5.26953C2.26367 5.35547 2.38672 5.42383 2.55078 5.47461C2.71484 5.52148 2.94531 5.57031 3.24219 5.62109C3.33203 5.63672 3.37695 5.68555 3.37695 5.76758C3.37695 5.84961 3.33203 5.89844 3.24219 5.91406C2.94531 5.96484 2.71484 6.01367 2.55078 6.06055C2.38672 6.10742 2.26367 6.17578 2.18164 6.26562C2.09961 6.35156 2.03711 6.47656 1.99414 6.64062C1.95117 6.80078 1.9043 7.01953 1.85352 7.29688C1.83789 7.38672 1.79102 7.43164 1.71289 7.43164ZM4.92383 3.68164C4.85742 3.68164 4.81641 3.64648 4.80078 3.57617C4.75391 3.3418 4.71094 3.1582 4.67188 3.02539C4.63281 2.88867 4.57812 2.78516 4.50781 2.71484C4.44141 2.64062 4.33984 2.58398 4.20312 2.54492C4.07031 2.50195 3.88086 2.45508 3.63477 2.4043C3.56055 2.39258 3.52344 2.35352 3.52344 2.28711C3.52344 2.2207 3.56055 2.17969 3.63477 2.16406C3.88086 2.11328 4.07031 2.06836 4.20312 2.0293C4.33984 1.98633 4.44141 1.92969 4.50781 1.85938C4.57812 1.78516 4.63281 1.68164 4.67188 1.54883C4.71094 1.41602 4.75391 1.23242 4.80078 0.998047C4.81641 0.923828 4.85742 0.886719 4.92383 0.886719C4.98633 0.886719 5.02539 0.923828 5.04102 0.998047C5.0918 1.23242 5.13477 1.41602 5.16992 1.54883C5.20898 1.68164 5.26172 1.78516 5.32812 1.85938C5.39844 1.92969 5.50195 1.98633 5.63867 2.0293C5.77539 2.06836 5.96484 2.11328 6.20703 2.16406C6.28125 2.17969 6.31836 2.2207 6.31836 2.28711C6.31836 2.35352 6.28125 2.39258 6.20703 2.4043C5.96484 2.45508 5.77539 2.50195 5.63867 2.54492C5.50195 2.58398 5.39844 2.64062 5.32812 2.71484C5.26172 2.78516 5.20898 2.88867 5.16992 3.02539C5.13477 3.1582 5.0918 3.3418 5.04102 3.57617C5.02539 3.64648 4.98633 3.68164 4.92383 3.68164ZM9.76367 5.75C9.68164 5.75 9.63281 5.70703 9.61719 5.62109C9.56641 5.33984 9.51953 5.11914 9.47656 4.95898C9.43359 4.79492 9.37109 4.66992 9.28906 4.58398C9.20703 4.49805 9.08398 4.43164 8.91992 4.38477C8.75586 4.33398 8.52734 4.2832 8.23438 4.23242C8.14453 4.2168 8.09961 4.16797 8.09961 4.08594C8.09961 4.04688 8.11133 4.01562 8.13477 3.99219C8.16211 3.96484 8.19531 3.94727 8.23438 3.93945C8.52734 3.88867 8.75586 3.83984 8.91992 3.79297C9.08398 3.74609 9.20703 3.67969 9.28906 3.59375C9.37109 3.50391 9.43359 3.37891 9.47656 3.21875C9.51953 3.05469 9.56641 2.83398 9.61719 2.55664C9.63281 2.4668 9.68164 2.42188 9.76367 2.42188C9.8418 2.42188 9.88867 2.4668 9.9043 2.55664C9.95508 2.83398 10.002 3.05469 10.0449 3.21875C10.0879 3.37891 10.1504 3.50391 10.2324 3.59375C10.3145 3.67969 10.4375 3.74609 10.6016 3.79297C10.7695 3.83984 11 3.88867 11.293 3.93945C11.3828 3.95508 11.4277 4.00391 11.4277 4.08594C11.4277 4.16797 11.3828 4.2168 11.293 4.23242C11 4.2832 10.7695 4.33398 10.6016 4.38477C10.4375 4.43164 10.3145 4.49805 10.2324 4.58398C10.1504 4.66992 10.0879 4.79492 10.0449 4.95898C10.002 5.11914 9.95508 5.33984 9.9043 5.62109C9.88867 5.70703 9.8418 5.75 9.76367 5.75ZM11.7148 12.4414L6.14844 6.85742C6.02734 6.73242 5.9668 6.58203 5.9668 6.40625C5.9668 6.23047 6.02734 6.07812 6.14844 5.94922C6.26562 5.82422 6.41406 5.76172 6.59375 5.76172C6.77734 5.76172 6.92969 5.82422 7.05078 5.94922L12.623 11.5391C12.7402 11.6641 12.7988 11.8125 12.7988 11.9844C12.8027 12.1602 12.7441 12.3125 12.623 12.4414C12.5059 12.5664 12.3555 12.6289 12.1719 12.6289C11.9922 12.6289 11.8398 12.5664 11.7148 12.4414ZM8.31055 8.41602L8.60352 8.13477L6.88086 6.41211C6.82617 6.35742 6.76953 6.32617 6.71094 6.31836C6.65234 6.30664 6.60156 6.32422 6.55859 6.37109C6.50781 6.42188 6.48633 6.47656 6.49414 6.53516C6.50586 6.58984 6.53906 6.64258 6.59375 6.69336L8.31055 8.41602Z" />
                    </svg>
                    {question}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div part="product-query-popup-footer" slot="footer">
            {!this.registered ? (
              <Fragment>
                <div class="inputs">
                  <klevu-textfield
                    exportparts={partsExports("klevu-textfield")}
                    value={this.name}
                    variant="pill"
                    placeholder="Name"
                    onKlevuTextEnterPressed={() => this.#register()}
                    onKlevuTextChanged={(e) => (this.name = e.detail)}
                  ></klevu-textfield>
                  <klevu-textfield
                    exportparts={partsExports("klevu-textfield")}
                    value={this.email}
                    variant="pill"
                    placeholder="Email"
                    onKlevuTextEnterPressed={() => this.#register()}
                    onKlevuTextChanged={(e) => {
                      this.email = e.detail
                    }}
                  ></klevu-textfield>
                  <klevu-button
                    originElement={this.originElement}
                    exportparts={partsExports("klevu-button")}
                    icon="chevron_right"
                    onClick={() => this.#register()}
                  ></klevu-button>
                </div>
                <klevu-typography variant="body-xs">{this.tDataProtectionNotice}</klevu-typography>
              </Fragment>
            ) : (
              <div class="sendmessage">
                <klevu-textfield
                  exportparts={partsExports("klevu-textfield")}
                  value={this.text}
                  variant={this.textFieldVariant}
                  placeholder={this.tTextFieldPlaceholder}
                  onKlevuTextEnterPressed={() => this.#sendMessage()}
                  onKlevuTextChanged={(e) => (this.text = e.detail)}
                ></klevu-textfield>
                {this.askButtonText ? (
                  <klevu-button exportparts={partsExports("klevu-button")} onClick={() => this.#sendMessage()}>
                    {this.askButtonText}
                  </klevu-button>
                ) : (
                  <klevu-button
                    originElement={this.originElement}
                    exportparts={partsExports("klevu-button")}
                    icon="chevron_right"
                    onClick={() => this.#sendMessage()}
                  ></klevu-button>
                )}
              </div>
            )}
            <div style={{ textAlign: "center" }}>
              {!this.removeAskloBranding && (
                <a target="_blank" href="https://asklo.ai/" class="powered-by-message">
                  {this.poweredByMessage}
                </a>
              )}
              <span class="disclaimer">{this.#disclaimer}</span>
            </div>
          </div>
        </klevu-chat-layout>
      </Fragment>
    )
  }

  #renderFeedback() {
    return (
      <div class="pqa_feedback" part="product-query-popup-feedback">
        <klevu-typography variant="body-l-bold">{this.tRateExperienceTitle}</klevu-typography>
        <klevu-typography variant="body-m">{this.tRateExperienceText}</klevu-typography>
        <div>
          <klevu-icon originElement={this.originElement} onClick={() => this.#pqafeedback("up")} name="thumb_up" />
          <klevu-icon originElement={this.originElement} onClick={() => this.#pqafeedback("down")} name="thumb_down" />
        </div>
      </div>
    )
  }
}
