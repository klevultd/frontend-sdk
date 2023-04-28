import { Component, Host, h, State, Fragment, Prop } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { startMoi, MoiSession, MoiRequest, KlevuRecord } from "@klevu/core"
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
  #layoutRef?: HTMLKlevuChatLayoutElement
  #modalRef?: HTMLKlevuModalElement

  @State()
  currentProduct?: Partial<KlevuRecord>

  @State()
  messages: MoiSession["messages"] = []

  /**
   * Show close button
   */
  @Prop()
  showClose = false

  /**
   * Override default API key
   */
  @Prop()
  apiKey?: string

  async connectedCallback() {
    await KlevuInit.ready()
    const init = async () => {
      this.session = await startMoi({
        onMessage: this.onMessage.bind(this),
        // @ts-expect-error
        apiKey: this.apiKey || window["klevu_ui_settings"].apiKey,
      })
      this.messages = this.session.messages
    }
    init()
  }

  async #sendMessage(msg: string, product?: MoiRequest["product"]) {
    if (!this.session) {
      return
    }
    await this.session.query({
      message: msg,
      product,
    })

    this.#layoutRef?.scrollMainToBottom()
  }

  onMessage() {
    if (!this.session) {
      return
    }
    this.messages = this.session.messages
    this.#layoutRef?.scrollMainToBottom()
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
    this.#layoutRef?.scrollMainToBottom()
  }

  render() {
    return (
      <Host>
        <klevu-chat-layout
          exportparts={globalExportedParts}
          onKlevuChatLayoutMessageSent={(e) => this.#sendMessage(e.detail)}
          ref={(el) => {
            this.#layoutRef = el
          }}
          showClose={this.showClose}
        >
          {this.renderChatContent()}
          <div slot="actions" class="genericactions">
            {this.session?.genericOptions.options.map((item) => (
              <klevu-button
                size="small"
                isSecondary
                onClick={() => {
                  if (item.type === "message") {
                    this.#sendMessage(item.chat)
                  } else if (item.type === "clearChat") {
                    this.session?.clear()
                  }
                }}
              >
                {item.name}
              </klevu-button>
            ))}
          </div>
          <div slot="menu" class="menu">
            {this.session?.menu.options.map((item) => (
              <klevu-button
                onClick={() => {
                  if (item.type === "message") {
                    this.#sendMessage(item.chat)
                  } else {
                    console.error("Not implemented yet")
                  }
                  this.#layoutRef?.closePopup()
                }}
              >
                {item.name}
              </klevu-button>
            ))}
          </div>
        </klevu-chat-layout>
        <klevu-modal exportparts={globalExportedParts} ref={(el) => (this.#modalRef = el)}>
          <klevu-product product={this.currentProduct}></klevu-product>
        </klevu-modal>
      </Host>
    )
  }

  renderChatContent() {
    return (
      <Fragment>
        {this.messages.map((message) => {
          if ("message" in message) {
            return (
              <Fragment>
                <klevu-chat-bubble remote exportparts={globalExportedParts}>
                  {message.message.value}
                </klevu-chat-bubble>
                {message.message.note && (
                  <klevu-typography
                    style={{
                      "--klevu-typography-color": "var(--klevu-color-neutral-6)",
                    }}
                    variant="body-xs"
                  >
                    {message.message.note}
                  </klevu-typography>
                )}
              </Fragment>
            )
          }
          if ("filter" in message) {
            return (
              <Fragment>
                <div class="filteractions">
                  {message.filter.options.map((o) => (
                    <klevu-button isSecondary onClick={() => this.#sendFilter(o.value)}>
                      {o.name}
                    </klevu-button>
                  ))}
                </div>
                {message.filter.note && (
                  <klevu-typography
                    style={{
                      "--klevu-typography-color": "var(--klevu-color-neutral-6)",
                    }}
                    variant="body-xs"
                  >
                    {message.filter.note}
                  </klevu-typography>
                )}
              </Fragment>
            )
          }
          if ("productData" in message) {
            return (
              <div>
                <klevu-slides
                  exportparts={globalExportedParts}
                  style={{
                    "--klevu-slides-item-width": "200px;",
                  }}
                >
                  {message.productData.products.map((product) => (
                    <klevu-product product={product} hideSwatches>
                      <div slot="bottom" class="productactions">
                        {product.options.map((option) => (
                          <klevu-button
                            fullWidth
                            isSecondary
                            onClick={() => {
                              if (option.intent === "show-similar-products") {
                                this.#sendMessage(option.chat, {
                                  context: {
                                    url: product.url,
                                  },
                                  id: product.id,
                                  intent: option.intent,
                                })
                              } else if (option.intent === "quick-view") {
                                this.currentProduct = product
                                this.#modalRef?.openModal()
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
                {message.productData.note && (
                  <klevu-typography
                    style={{
                      "--klevu-typography-color": "var(--klevu-color-neutral-6)",
                    }}
                    variant="body-xs"
                  >
                    {message.productData.note}
                  </klevu-typography>
                )}
              </div>
            )
          }
          if ("local" in message) {
            return <klevu-chat-bubble exportparts={globalExportedParts}>{message.local?.message}</klevu-chat-bubble>
          }
        })}
      </Fragment>
    )
  }
}
