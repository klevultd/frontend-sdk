import { MoiMessages, MoiProduct, MoiResponseFilter, MoiResponseText, MoiSavedFeedback } from "@klevu/core"
import { Component, Event, EventEmitter, Fragment, Host, Prop, State, Watch, h } from "@stencil/core"
import { partsExports } from "../../utils/partsExports"
import { markdown } from "../../utils/utils"

export type onKlevuMessageFeedbackDetails = {
  message: MoiResponseText["message"]
  feedback: "up" | "down"
}

/**
 * @slot chat-messages-after - Things to place in the after all messages
 */
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
   * Feedbacks given by user
   */
  @Prop() feedbacks?: MoiSavedFeedback[]

  /**
   * Should display a feedback button after each message
   */
  @Prop() enableMessageFeedback?: boolean

  /**
   * What message should we
   */
  @Prop() showFeedbackFor?: string

  /**
   * Optional action to perform when type writer effect completes
   */
  @Prop() handleTypeWriterEffectEnds?: (showQuestions: boolean) => void

  /**
   * type animation speed, if 0, no animation
   */
  @Prop() speed: number = 10

  /**
   * Scroll to bottom of the chat
   */
  @Prop() scrollBottom?: () => void
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
  klevuSelectFilter!: EventEmitter<{ message: MoiResponseFilter; filter: MoiResponseFilter["filter"]["options"][0] }>

  /**
   * When product option is clicked
   */
  @Event({
    composed: true,
  })
  klevuSelectProductOption!: EventEmitter<{ product: MoiProduct; option: MoiProduct["options"][0] }>

  /**
   * When feedback is given
   */
  @Event({
    composed: true,
  })
  klevuMessageFeedback!: EventEmitter<onKlevuMessageFeedbackDetails>

  feedbackReasons = ["Irrelevant", "Incorrect", "Offensive", "Other"]

  @State() lastMessageDisplayedText: string = ""
  @State() typeWriterEnds: boolean = true

  @Watch("messages")
  watchPropHandler(newValue: MoiResponseText[], oldValue: MoiResponseText[]) {
    const lastItem = newValue[newValue.length - 1] || null
    const lastItemOld = oldValue[oldValue.length - 1] || null
    this.lastMessageDisplayedText = ""
    this.typeWriterEnds = true
    if (this.speed > 0 && lastItem?.message && lastItemOld && lastItemOld?.message?.value !== lastItem.message?.value) {
      this.typeWriterEnds = false
      this.handleTypeWriterEffectEnds?.(true)
      this.startTyping(markdown(lastItem.message.value))
    }
  }

  startTyping(text: string) {
    let index = 0
    if (text.length > 500) {
      this.speed = 5
    }
    const type = () => {
      if (index < text.length && !this.typeWriterEnds) {
        this.scrollBottom?.()
        this.lastMessageDisplayedText += text.charAt(index)
        index++
        setTimeout(type, this.speed)
      } else {
        this.typeWriterEnds = true
        this.handleTypeWriterEffectEnds?.(false)
        this.lastMessageDisplayedText = text
      }
    }
    type()
  }

  render() {
    return (
      <Host>
        {this.messages.map((message, index) => {
          if ("message" in message) {
            const givenFeedback = this.feedbacks?.find((f) => f.id === message.message.id)
            const isLastMessage = this.messages.length - 1 === index
            const showFeedback = this.showFeedbackFor === message.message.id && !Boolean(givenFeedback?.reason)
            let htmlMessage = ""
            if (index === this.messages.length - 1 && this.lastMessageDisplayedText) {
              htmlMessage = this.lastMessageDisplayedText
            } else {
              htmlMessage = markdown(message.message.value)
            }

            return (
              <Fragment>
                <div class="message-container">
                  <klevu-chat-bubble
                    exportparts={partsExports("klevu-chat-bubble")}
                    feedback={message.message.collectFeedback ? givenFeedback : undefined}
                    feedbackReasons={showFeedback ? this.feedbackReasons : undefined}
                    remote
                    innerHTML={htmlMessage}
                  ></klevu-chat-bubble>
                  {this.enableMessageFeedback && message.message.collectFeedback && !givenFeedback && isLastMessage && (
                    <div class={`feedback ${!this.typeWriterEnds ? "feedback-hide" : ""}`}>
                      <klevu-icon
                        name="thumb_up"
                        onClick={() => this.klevuMessageFeedback.emit({ feedback: "up", message: message.message })}
                      />
                      <klevu-icon
                        name="thumb_down"
                        onClick={() => this.klevuMessageFeedback.emit({ feedback: "down", message: message.message })}
                      />
                    </div>
                  )}
                </div>
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
                      exportparts={partsExports("klevu-button")}
                      disabled={this.messages.length - 1 !== index}
                      onClick={() => {
                        if (this.messages.length - 1 === index) {
                          this.klevuSelectFilter.emit({
                            message: message,
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
                  center-next-prev={true}
                  exportparts={partsExports("klevu-slides")}
                  style={{
                    "--klevu-slides-item-width": "188px",
                    "--klevu-product-grid-spacing":"var(--klevu-spacing-04)",
                  }}
                >
                  {message.productData.products.map((product) => (
                    <klevu-product
                      product={product}
                      hideSwatches
                      hideDescription
                      showAddToCart={false}
                      showRatings={false}
                      onKlevuProductClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        this.klevuChatProductClick.emit({
                          product,
                        })
                        return false
                      }}
                    style={{
                      "--klevu-product-width": "188px",
                      "box-shadow":"inset 0px 0px 4px 1px #00000026",
                      "text-align":"center"
                    }}
                      exportparts={partsExports("klevu-product")}
                    >
                      <div slot="bottom" class="productactions">
                        {product.options.map((option) => (
                          <klevu-button
                            exportparts={partsExports("klevu-button")}
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
            return <klevu-chat-bubble>{message.local?.message}</klevu-chat-bubble>
          }
        })}
        <slot name="chat-messages-after"></slot>
        <div class="end-spacer">&nbsp;</div>
      </Host>
    )
  }
}
