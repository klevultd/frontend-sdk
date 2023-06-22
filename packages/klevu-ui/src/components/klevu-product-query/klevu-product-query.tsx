import { Component, Fragment, Host, State, h, Element, Prop } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"
import { MoiMessages, MoiSession, startMoi } from "@klevu/core"
import { KlevuTextfieldVariant } from "../klevu-textfield/klevu-textfield"

@Component({
  tag: "klevu-product-query",
  styleUrl: "klevu-product-query.css",
  shadow: true,
})
export class KlevuProductQuery {
  session?: MoiSession
  #modal?: HTMLKlevuModalElement
  #chatLayout?: HTMLKlevuChatLayoutElement

  @Prop() url: string = ""
  @Prop() productId?: string
  @Prop() textFieldVariant: KlevuTextfieldVariant = "pill"
  @Prop() textFieldPlaceholder: string = "Ask a question"

  @State() text = ""
  @State() name = ""
  @State() email = ""
  @State() registered = false
  @State() showFeedback = false
  @State() showLoading = false

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
    this.#chatLayout?.scrollMainToBottom()
  }

  async #sendMessage() {
    const message = this.text.trim()

    if (message == "") {
      return
    }

    this.text = ""
    this.#chatLayout?.scrollMainToBottom()
    this.showLoading = true
    await this.session?.query({
      message: message,
    })
    this.showLoading = false
  }

  #register() {
    this.session?.messages.push({
      message: {
        type: "text",
        value: `${this.name}, (${this.email})`,
        note: null,
      },
    })
    this.registered = true
    this.#chatLayout?.scrollMainToBottom()
  }

  #thumb(index: number, dir: "up" | "down") {
    // Todo
  }

  #pqafeedback(dir: "up" | "down") {
    this.#modal?.closeModal()
  }

  #closeModal(e: CustomEvent<void>) {
    // add back when full feedback is implemented
    /*
    if (!this.showFeedback) {
      this.showFeedback = true
      e.preventDefault()
      return
    }
    */
  }

  #start() {
    console.log(this.productId)
    this.showFeedback = false
    // todo - remove this when using registering
    this.registered = true
    this.#modal?.openModal()
    this.el
      .closest("klevu-init")
      ?.getConfig()
      .then(async (config) => {
        this.session = await startMoi({
          onMessage: this.onMessage.bind(this),
          // Do nothing on redirect as we have our own system
          onRedirect: () => {},
          configOverride: config,
          url: this.url === "" ? undefined : this.url,
          productId: this.productId,
          mode: "PQA",
        })
        this.messages = this.session.messages
        // add this when registering works
        //this.registered = this.messages.length > 1
      })
  }

  render() {
    return (
      <Host>
        <klevu-button exportparts={globalExportedParts} onClick={this.#start.bind(this)}>
          Ask a Question
        </klevu-button>
        <klevu-modal
          ref={(el) => (this.#modal = el)}
          exportparts={globalExportedParts}
          onKlevuCloseModal={this.#closeModal.bind(this)}
        >
          <div slot="header">
            <klevu-typography variant="body-m-bold">Ask a Question</klevu-typography>
          </div>
          {this.showFeedback ? (
            <div class="pqa_feedback">
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
              <div id="container">
                <klevu-chat-layout
                  ref={(el) => (this.#chatLayout = el)}
                  exportparts={globalExportedParts}
                  onKlevuChatLayoutMessageSent={(event) => this.#sendMessage()}
                >
                  <div slot="header"></div>
                  <klevu-chat-messages messages={this.messages}></klevu-chat-messages>
                  {this.showLoading ? <klevu-loading-indicator /> : null}

                  <div slot="footer">
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
                        <klevu-button
                          exportparts={globalExportedParts}
                          icon="send"
                          onClick={() => this.#sendMessage()}
                        ></klevu-button>
                      </div>
                    )}
                  </div>
                </klevu-chat-layout>
              </div>
            </Fragment>
          )}
        </klevu-modal>
      </Host>
    )
  }
}
