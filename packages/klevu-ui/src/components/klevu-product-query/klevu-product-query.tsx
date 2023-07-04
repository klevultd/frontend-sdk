import { Component, Fragment, Host, State, h, Element, Prop, Listen } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"
import { MoiMessages, MoiSession, startMoi, MoiSavedFeedback, MoiActionsMessage, KlevuConfig } from "@klevu/core"
import { KlevuTextfieldVariant } from "../klevu-textfield/klevu-textfield"
import { Placement } from "@floating-ui/dom"
import { onKlevuMessageFeedbackDetails } from "../klevu-chat-messages/klevu-chat-messages"
import { KlevuMessageFeedbackReasonDetails } from "../klevu-chat-bubble/klevu-chat-bubble"

/**
 * Klevu Product Query application that shows a popup for asking questions about a product
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
  session?: MoiSession
  #popup?: HTMLKlevuPopupElement
  #scrollElement?: HTMLKlevuUtilScrollbarsElement
  #chatMessagesElement?: HTMLKlevuChatMessagesElement

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
  @Prop() textFieldPlaceholder: string = "Ask a question"

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
  @Prop() finePrint = "I'm an AI model. Sometimes, I may make mistakes. Please verify answers on this page."

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

  @State() text = ""
  @State() name = ""
  @State() email = ""
  @State() registered = true // change to false when registering works
  @State() showFeedback = false
  @State() showLoading = false
  @State() feedbacks: MoiSavedFeedback[] = []
  @State() showMessageFeedbackFor?: string

  @Element()
  el!: HTMLKlevuProductElement

  @State() messages: MoiMessages = []

  async connectedCallback() {
    await KlevuInit.ready()

    if (!this.productId && this.url == "") {
      this.url = window.location.href
    }
  }

  onMessage() {
    if (!this.session) {
      return
    }
    this.messages = this.session.messages
    this.feedbacks = this.session.feedbacks
    this.#scrollMainToBottom()
  }

  async #sendMessage() {
    const message = this.text.trim()

    if (message == "") {
      return
    }

    this.text = ""
    this.#scrollMainToBottom()
    this.showLoading = true
    await this.session?.query({
      message: message,
    })
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
    this.#scrollMainToBottom()
  }

  #thumb(index: number, dir: "up" | "down") {
    // Todo
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

  async #scrollMainToBottom(behavior: "smooth" | "instant" = "smooth") {
    const instance = await this.#scrollElement?.getInstance()
    if (instance) {
      setTimeout(() => {
        instance.elements().viewport.scrollTo({
          top: instance.elements().viewport.scrollHeight,
          behavior: behavior as any, // for some reason doesn't compile without any
        })
      }, 100)
    }
  }

  async #start() {
    this.showFeedback = false
    this.#popup?.openModal()
    let config: KlevuConfig = await this.el.closest("klevu-init")?.getConfig()

    const useConfig = config.apiKey && config.apiKey !== ""

    this.session = await startMoi({
      onMessage: this.onMessage.bind(this),
      // Do nothing on redirect as we have our own system
      onRedirect: () => {},
      configOverride: useConfig ? config : undefined,
      url: this.url === "" ? undefined : this.url,
      productId: this.productId,
      mode: "PQA",
      onAction: this.#onAction.bind(this),
      pqaWidgetId: this.pqaWidgetId,
    })
    this.messages = this.session.messages
    this.feedbacks = this.session.feedbacks
    await this.#scrollMainToBottom("instant")

    if (this.#chatMessagesElement) {
      // hack to fix scrollbars not showing
      this.#chatMessagesElement.style.paddingTop = "1px"
      this.#chatMessagesElement.style.paddingTop = "0px"
    }

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
          exportparts={[globalExportedParts, "popup-content", "popup-origin"].join(", ")}
          onKlevuPopupClose={this.#closeModal.bind(this)}
          anchor={this.popupAnchor}
          offset={this.popupOffset}
          useBackground={this.useBackground}
          popupWidth={480}
        >
          <div slot="origin">
            <klevu-button
              exportparts={globalExportedParts}
              onClick={this.#start.bind(this)}
              part="klevu-query-open-button"
            >
              {this.buttonText}
            </klevu-button>
          </div>
          <div class="content" slot="content">
            <div class="header" part="product-query-header">
              <klevu-typography variant="body-m-bold">{this.popupTitle}</klevu-typography>
              <span part="material-icon" onClick={() => this.#popup?.closeModal()}>
                close
              </span>
            </div>
            <klevu-typography variant="body-xs" class="fineprint">
              {this.finePrint}
            </klevu-typography>

            {this.showFeedback ? (
              <div class="pqa_feedback" part="product-query-feedback">
                <klevu-typography variant="body-l-bold">Rate your experience</klevu-typography>
                <klevu-typography variant="body-m">How was your experience using this Q&A tool?</klevu-typography>
                <div>
                  <span part="material-icon" onClick={() => this.#pqafeedback("up")}>
                    thumb_up
                  </span>
                  <span part="material-icon" onClick={() => this.#pqafeedback("down")}>
                    thumb_down
                  </span>
                </div>
              </div>
            ) : (
              <Fragment>
                <klevu-util-scrollbars overflowX="hidden" overflowY="scroll" ref={(el) => (this.#scrollElement = el)}>
                  <klevu-chat-messages
                    messages={this.messages}
                    feedbacks={this.feedbacks}
                    enableMessageFeedback
                    exportparts={globalExportedParts}
                    onKlevuMessageFeedback={this.#onFeedback.bind(this)}
                    showFeedbackFor={this.showMessageFeedbackFor}
                    ref={(el) => (this.#chatMessagesElement = el)}
                  ></klevu-chat-messages>
                </klevu-util-scrollbars>

                <div part="product-query-footer">
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
                        <klevu-button
                          exportparts={globalExportedParts}
                          icon="send"
                          onClick={() => this.#register()}
                        ></klevu-button>
                      </div>
                      <klevu-typography variant="body-xs">
                        We are compliant with data protection regulations. Visit our privacy policy to learn how we
                        collect, keep, and process your private information in accordance with these laws.
                      </klevu-typography>
                    </Fragment>
                  ) : (
                    <div class="sendmessage">
                      <klevu-textfield
                        value={this.text}
                        variant={this.textFieldVariant}
                        placeholder={this.textFieldPlaceholder}
                        onKlevuTextEnterPressed={() => this.#sendMessage()}
                        onKlevuTextChanged={(e) => (this.text = e.detail)}
                      ></klevu-textfield>
                      {this.askButtonText ? (
                        <klevu-button onClick={() => this.#sendMessage()}>{this.askButtonText}</klevu-button>
                      ) : (
                        <klevu-button
                          exportparts={globalExportedParts}
                          icon="send"
                          onClick={() => this.#sendMessage()}
                        ></klevu-button>
                      )}
                    </div>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </klevu-popup>
      </Host>
    )
  }
}
