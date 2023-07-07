import { Component, Host, h, State, Fragment, Prop, Event, EventEmitter, Listen, Element } from "@stencil/core"

import { startMoi, MoiSession, MoiRequest, MoiProducts, MoiProduct, MoiMessages, KlevuConfig } from "@klevu/core"
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
  currentProduct?: MoiProduct

  @State()
  messages: MoiMessages = []

  @State()
  loading = false

  @Element()
  el!: HTMLKlevuMoiElement

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

  /**
   * When a product is clicked. By default does a full page redirect to product url if event is not cancelled.
   *
   * Use `event.preventDefault()` to cancel the redirect.
   * @param product
   */
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

  async connectedCallback() {
    await KlevuInit.ready()

    const config: KlevuConfig = await this.el.closest("klevu-init")?.getConfig()

    const init = async () => {
      this.session = await startMoi({
        onMessage: this.onMessage.bind(this),
        // Do nothing on redirect as we have our own system
        onRedirect: (url) => {},
        configOverride: config,
      })
      this.messages = this.session.messages
    }
    init()
  }

  async #sendMessage(msg: string, product?: MoiRequest["product"]) {
    if (!this.session) {
      return
    }
    this.loading = true
    await this.session.query({
      message: msg,
      product,
    })
    this.loading = false

    this.#layoutRef?.scrollMainToBottom()
  }

  onMessage() {
    if (!this.session) {
      return
    }
    this.messages = this.session.messages
    this.#layoutRef?.scrollMainToBottom()
  }

  async #sendFilter(filterValue: string, message?: string) {
    if (!this.session) {
      return
    }

    await this.session.query({
      message,
      filter: {
        value: filterValue,
      },
    })
    this.#layoutRef?.scrollMainToBottom()
  }

  #buildChatFormat(
    target: any,
    settings: {
      chatFormat: string
      chatFormatEmpty: string
      key: string | null
      label: string | null
    }
  ) {
    if (settings.key && target?.value === `${settings.key}:klevu_any`) {
      return settings.chatFormatEmpty
    }
    if (target && target.name && settings.chatFormat) {
      return settings.chatFormat.replace(`$VALUE$`, target.name)
    }
    return undefined
  }

  async #productClick(product: MoiProduct) {
    if (!this.session || !product.id || !product.url) {
      return
    }
    this.loading = true
    await this.session.query({
      product: {
        id: product.id,
        context: {
          url: product.url,
        },
        intent: "redirect",
      },
    })
    this.loading = false
    this.klevuMoiProductClick.emit(product)
  }

  render() {
    return (
      <Host>
        <klevu-chat-layout
          onKlevuChatLayoutMessageSent={(e) => this.#sendMessage(e.detail)}
          ref={(el) => {
            this.#layoutRef = el
          }}
          showClose={this.showClose}
        >
          {this.renderChatContent()}
          {this.loading && <klevu-loading-indicator></klevu-loading-indicator>}
          <br />
          <div slot="actions" class="genericactions">
            {this.session?.genericOptions?.options.map((item) => (
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
            {this.session?.menu?.options
              .filter((i) => i.type === "message")
              .map((item) => (
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
        <klevu-modal ref={(el) => (this.#modalRef = el)}>
          <klevu-product product={this.currentProduct}></klevu-product>
        </klevu-modal>
      </Host>
    )
  }

  renderChatContent() {
    return (
      <Fragment>
        {this.messages.map((message, index) => {
          if ("message" in message) {
            return (
              <Fragment>
                <klevu-chat-bubble remote>{message.message.value}</klevu-chat-bubble>
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
                {message.filter.settings.label && (
                  <klevu-chat-bubble remote>{message.filter.settings.label}</klevu-chat-bubble>
                )}
                <div class="filteractions">
                  {message.filter.options.map((o) => (
                    <klevu-button
                      isSecondary
                      disabled={this.messages.length - 1 !== index}
                      onClick={() => {
                        if (this.messages.length - 1 === index) {
                          this.#sendFilter(o.value, this.#buildChatFormat(o, message.filter.settings))
                        }
                      }}
                    >
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
                  style={{
                    "--klevu-slides-item-width": "200px;",
                  }}
                >
                  {message.productData.products.map((product) => (
                    <klevu-product
                      product={product}
                      hideSwatches
                      onKlevuProductClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        this.#productClick(product)
                        return false
                      }}
                    >
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
            return <klevu-chat-bubble>{message.local?.message}</klevu-chat-bubble>
          }
        })}
      </Fragment>
    )
  }
}
