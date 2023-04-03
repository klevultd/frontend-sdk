import { Component, Host, h, State, Fragment } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { startMoi, MoiSession } from "@klevu/core"
import { KlevuInit } from "../klevu-init/klevu-init"

/**
 * Klevu MOI Application
 */
@Component({
  tag: "klevu-moi",
  styleUrl: "klevu-moi.css",
  shadow: true,
})
export class KlevuMoi {
  session?: MoiSession
  layoutRef!: HTMLKlevuChatLayoutElement

  @State()
  messages: MoiSession["messages"] = []

  async connectedCallback() {
    await KlevuInit.ready()
    this.session = await startMoi(this.onMessage.bind(this))
    this.messages = this.session.messages
  }

  async #sendMessage(msg: string) {
    if (!this.session) {
      return
    }
    await this.session.query({
      message: msg,
    })
  }

  onMessage() {
    if (!this.session) {
      return
    }
    this.messages = this.session.messages
    this.layoutRef.scrollMainToBottom()
  }

  async #sendFilter(filterValue: string) {
    if (!this.session) {
      return
    }
    await this.session.query({
      filter: {
        value: filterValue,
      },
    })
  }

  render() {
    return (
      <Host>
        <klevu-chat-layout
          exportparts={globalExportedParts}
          onKlevuChatLayoutMessageSent={(e) => this.#sendMessage(e.detail)}
          ref={(el) => {
            this.layoutRef = el as HTMLKlevuChatLayoutElement
          }}
        >
          {this.renderChatContent()}
          <div slot="menu" class="menu">
            {this.session?.menu.menuOptions.options.map((item) => (
              <klevu-button
                onClick={() => {
                  if (item.type === "message") {
                    this.#sendMessage(item.chat)
                  } else {
                    console.error("Not implemented yet")
                  }
                }}
              >
                {item.name}
              </klevu-button>
            ))}
          </div>
        </klevu-chat-layout>
      </Host>
    )
  }

  renderChatContent() {
    return (
      <Fragment>
        {this.messages.map((message) => {
          if ("message" in message) {
            return (
              <klevu-chat-bubble remote exportparts={globalExportedParts}>
                {message.message.value}
              </klevu-chat-bubble>
            )
          }
          if ("filter" in message) {
            return (
              <div class="filteractions">
                {message.filter.options.map((o) => (
                  <klevu-button isSecondary onClick={() => this.#sendFilter(o.value)}>
                    {o.name}
                  </klevu-button>
                ))}
              </div>
            )
          }
          if ("productData" in message) {
            return (
              <div>
                <klevu-slides exportparts={globalExportedParts}>
                  {message.productData.products.map((product) => (
                    <klevu-product product={product}>
                      <div slot="bottom" class="productactions">
                        {product.options.map((option) => (
                          <klevu-button
                            isSecondary
                            onClick={() => {
                              if (option.intent === "show-similar-products") {
                                this.#sendMessage(option.chat)
                              }
                            }}
                          >
                            {option.name}
                          </klevu-button>
                        ))}
                      </div>
                    </klevu-product>
                  ))}
                </klevu-slides>
              </div>
            )
          }
          if ("local" in message) {
            console.log(message)
            return <klevu-chat-bubble exportparts={globalExportedParts}>{message.local?.message}</klevu-chat-bubble>
          }
        })}
      </Fragment>
    )
  }
}
