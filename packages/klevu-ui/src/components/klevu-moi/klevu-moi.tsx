import { Component, Host, h, State, Fragment, Prop, Event, EventEmitter, Listen, Element, Method } from "@stencil/core"

import { startMoi, MoiSession, MoiRequest, MoiProducts, MoiProduct, MoiMessages, KlevuConfig } from "@klevu/core"
import { KlevuInit } from "../klevu-init/klevu-init"
import { partsExports } from "../../utils/partsExports"

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

  /**
   * Currently clicked product
   */
  @State()
  currentProduct?: MoiProduct

  /**
   * All messages
   */
  @State()
  messages: MoiMessages = []

  /**
   * Are we loading any messages
   */
  @State()
  loading = false

  /**
   * Display state
   */
  @State()
  isShow = false

  /**
   * Is currently open
   */
  @State()
  isOpen = false

  @Element()
  el!: HTMLKlevuMoiElement

  /**
   * Override default API key
   */
  @Prop()
  apiKey?: string

  /**
   * Start the MOI window open
   */
  @Prop()
  startOpen?: boolean

  /**
   * When a product is clicked. By default does a full page redirect to product url if event is not cancelled.
   *
   * Use `event.preventDefault()` to cancel the redirect.
   * @param product
   */
  @Event({ composed: true, cancelable: true })
  klevuMoiProductClick!: EventEmitter<MoiProduct>

  /**
   * When the visibility of Moi window changes
   */
  @Event({ composed: true })
  klevuMoiVisibilityChange!: EventEmitter<"open" | "close">

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

    if (this.startOpen) {
      this.open()
    }
  }

  /**
   * Initialize the MOI session and open window
   */
  @Method()
  async open() {
    if (!this.session) {
      const config: KlevuConfig = await this.el.closest("klevu-init")?.getConfig()
      this.session = await startMoi({
        onMessage: this.onMessage.bind(this),
        // Do nothing on redirect as we have our own system
        onRedirect: (url) => {},
        settings: {
          configOverride: config,
        },
      })
    }

    this.messages = this.session.messages
    this.isShow = true
    this.klevuMoiVisibilityChange.emit("open")
    setTimeout(async () => {
      this.isOpen = true
      await this.#layoutRef?.scrollMainToBottom("instant")
    }, 50)
  }

  @Method()
  async close() {
    if (!this.isOpen) {
      return
    }
    this.isOpen = false
    this.klevuMoiVisibilityChange.emit("close")
    setTimeout(() => {
      this.isShow = false
    }, 300)
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
    const popupClasses = {
      popup: true,
      show: this.isShow,
      open: this.isOpen,
    }

    if (!this.isShow) {
      return null
    }

    return (
      <Host>
        <div class={popupClasses}>
          {this.session && (
            <klevu-chat-layout
              slot="content"
              exportparts={partsExports("klevu-chat-layout")}
              onKlevuChatLayoutMessageSent={(e) => this.#sendMessage(e.detail)}
              ref={(el) => {
                this.#layoutRef = el
              }}
            >
              <div slot="header">
                <klevu-typography variant="body-m-bold">MOI</klevu-typography>
                <klevu-button
                  exportparts={partsExports("klevu-button")}
                  onClick={() => this.close()}
                  size="small"
                  icon="close"
                  isSecondary
                ></klevu-button>
              </div>
              <klevu-chat-messages
                exportparts={partsExports("klevu-chat-messages")}
                onKlevuSelectFilter={(event) => {
                  this.#sendFilter(
                    event.detail.filter.value,
                    this.#buildChatFormat(event.detail.filter, event.detail.message.filter.settings)
                  )
                }}
                onKlevuSelectProductOption={(event) => {
                  const option = event.detail.option
                  const product = event.detail.product
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
                onKlevuChatProductClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  this.#productClick(event.detail.product)
                  return false
                }}
                messages={this.messages}
              ></klevu-chat-messages>
              {this.loading && (
                <klevu-loading-indicator
                  exportparts={partsExports("klevu-loading-indicator")}
                ></klevu-loading-indicator>
              )}
              <div slot="actions" class="genericactions">
                {this.session?.genericOptions?.options.map((item) => (
                  <klevu-button
                    exportparts={partsExports("klevu-button")}
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
                      exportparts={partsExports("klevu-button")}
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
          )}
        </div>

        <klevu-modal exportparts={partsExports("klevu-modal")} ref={(el) => (this.#modalRef = el)}>
          <klevu-product exportparts={partsExports("klevu-product")} product={this.currentProduct}></klevu-product>
        </klevu-modal>
      </Host>
    )
  }
}
