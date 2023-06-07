import { Component, Host, State, h } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

@Component({
  tag: "klevu-product-query",
  styleUrl: "klevu-product-query.css",
  shadow: true,
})
export class KlevuProductQuery {
  #modal?: HTMLKlevuModalElement

  @State() messages: Array<{
    message: string
    isRemote: boolean
  }> = [
    {
      isRemote: false,
      message: "Does this fridge dispense crushed ice?",
    },
    {
      isRemote: true,
      message: "This is a long response to that message.",
    },
  ]

  render() {
    return (
      <Host>
        <klevu-button onClick={() => this.#modal?.openModal()}>Ask a question</klevu-button>
        <klevu-modal ref={(el) => (this.#modal = el)} exportparts={globalExportedParts}>
          <div id="container">
            <klevu-chat-layout
              exportparts={globalExportedParts}
              onKlevuChatLayoutMessageSent={(event) => this.messages.push({ isRemote: false, message: event.detail })}
            >
              {this.messages.map((message) => {
                if (message.isRemote) {
                  return (
                    <div class="remote">
                      <klevu-chat-bubble remote>{message.message}</klevu-chat-bubble>
                      <div class="thumbs">
                        <klevu-button icon="thumb_up" size="small" exportparts={globalExportedParts} />
                        <klevu-button icon="thumb_down" size="small" exportparts={globalExportedParts} />
                      </div>
                    </div>
                  )
                }
                return <klevu-chat-bubble>{message.message}</klevu-chat-bubble>
              })}
              <klevu-chat-bubble>Does this fridge dispense crushed ice?</klevu-chat-bubble>
              <div class="remote"></div>
            </klevu-chat-layout>
          </div>
        </klevu-modal>
      </Host>
    )
  }
}
