import { Component, Fragment, Host, State, h } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

@Component({
  tag: "klevu-product-query",
  styleUrl: "klevu-product-query.css",
  shadow: true,
})
export class KlevuProductQuery {
  #modal?: HTMLKlevuModalElement
  #chatLayout?: HTMLKlevuChatLayoutElement

  @State() text = ""
  @State() name = ""
  @State() email = ""
  @State() registered = false

  @State() messages: Array<{
    message: string
    isRemote: boolean
    feedbackable?: boolean
    thumb?: "up" | "down"
  }> = [
    {
      isRemote: true,
      message:
        "Howdy! I can answer specific questions about this product, if the information is available on the product page.",
    },
    {
      isRemote: true,
      message: "But before that, please enter your name and email.",
    },
    {
      isRemote: true,
      message: "This is a test message with loger text to see how it looks like. And it has a feedback buttons with it",
      feedbackable: true,
    },
  ]

  #sendMessage() {
    this.messages.push({
      isRemote: false,
      message: this.text,
    })
    this.text = ""
    this.#chatLayout?.scrollMainToBottom()
  }

  #register() {
    this.messages.push({
      isRemote: false,
      message: `${this.name}, (${this.email})`,
    })
    this.messages.push({
      isRemote: true,
      message: "Thanks! What would you like to know about this product?",
    })
    this.registered = true
    this.#chatLayout?.scrollMainToBottom()
  }

  #thumb(index: number, dir: "up" | "down") {
    this.messages[index].thumb = dir
    this.messages = [...this.messages]
  }

  render() {
    return (
      <Host>
        <klevu-button onClick={() => this.#modal?.openModal()}>Ask a Question</klevu-button>
        <klevu-modal ref={(el) => (this.#modal = el)} exportparts={globalExportedParts}>
          <div slot="header">
            <klevu-typography variant="body-m-bold">Ask a Question</klevu-typography>
          </div>
          <div id="container">
            <klevu-chat-layout
              ref={(el) => (this.#chatLayout = el)}
              exportparts={globalExportedParts}
              onKlevuChatLayoutMessageSent={(event) => this.messages.push({ isRemote: false, message: event.detail })}
            >
              <div slot="header"></div>
              {this.messages.map((message, index) => {
                if (message.isRemote) {
                  return (
                    <Fragment>
                      <div class="remote">
                        <klevu-chat-bubble remote>
                          {message.thumb && message.thumb === "up" && (
                            <span class="feedback_up" part="material-icon">
                              thumb_up
                            </span>
                          )}
                          {message.thumb && message.thumb === "down" && (
                            <span class="feedback_down" part="material-icon">
                              thumb_down
                            </span>
                          )}
                          {message.message}
                        </klevu-chat-bubble>
                        {message.feedbackable && !message.thumb && (
                          <div class="thumbs">
                            <span part="material-icon" onClick={() => this.#thumb(index, "up")}>
                              thumb_up
                            </span>
                            <span part="material-icon" onClick={() => this.#thumb(index, "down")}>
                              thumb_down
                            </span>
                          </div>
                        )}
                      </div>
                      {message.thumb && message.thumb === "down" && (
                        <div class="feedback_buttons">
                          <klevu-typography variant="body-xs">Rating reason:</klevu-typography>
                          <klevu-button size="small" isSecondary>
                            Irrelevant
                          </klevu-button>
                          <klevu-button size="small" isSecondary>
                            Incorrect
                          </klevu-button>
                          <klevu-button size="small" isSecondary>
                            Offensive
                          </klevu-button>
                          <klevu-button size="small" isSecondary>
                            Other
                          </klevu-button>
                        </div>
                      )}
                    </Fragment>
                  )
                }
                return <klevu-chat-bubble>{message.message}</klevu-chat-bubble>
              })}

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
                      variant="pill"
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
        </klevu-modal>
      </Host>
    )
  }
}
