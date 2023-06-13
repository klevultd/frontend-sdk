import { MoiMessages, MoiProduct, MoiResponseFilter } from "@klevu/core"
import { Component, Event, EventEmitter, Fragment, Host, Prop, h } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

@Component({
  tag: "klevu-chat-messages",
  styleUrl: "klevu-chat-messages.css",
  shadow: true,
})
export class KlevuChatMessages {
  /**
   * Messages received from Moi backend
   */
  @Prop() messages: MoiMessages = []

  /**
   * When product is clicked
   */
  @Event({
    composed: true,
  })
  klevuChatProductClick!: EventEmitter<{ product: MoiProduct }>

  /**
   * When product filter is clicked
   */
  @Event({
    composed: true,
  })
  klevuSelectFilter!: EventEmitter<{ filter: MoiResponseFilter["filter"]["options"][0] }>

  /**
   * When product option is clicked
   */
  @Event({
    composed: true,
  })
  klevuSelectProductOption!: EventEmitter<{ product: MoiProduct; option: MoiProduct["options"][0] }>

  render() {
    return (
      <Host>
        {this.messages.map((message, index) => {
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
                {message.filter.settings.label && (
                  <klevu-chat-bubble remote exportparts={globalExportedParts}>
                    {message.filter.settings.label}
                  </klevu-chat-bubble>
                )}
                <div class="filteractions">
                  {message.filter.options.map((o) => (
                    <klevu-button
                      isSecondary
                      disabled={this.messages.length - 1 !== index}
                      onClick={() => {
                        if (this.messages.length - 1 === index) {
                          this.klevuSelectFilter.emit({
                            filter: o,
                          })
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
                  exportparts={globalExportedParts}
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
                        this.klevuChatProductClick.emit({
                          product,
                        })
                        return false
                      }}
                    >
                      <div slot="bottom" class="productactions">
                        {product.options.map((option) => (
                          <klevu-button
                            fullWidth
                            isSecondary
                            onClick={() => {
                              this.klevuSelectProductOption.emit({
                                product,
                                option,
                              })
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
      </Host>
    )
  }
}
