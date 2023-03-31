import { Component, Element, Event, EventEmitter, Host, State, h } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

/**
 * Component that wraps chat elements into a layout.
 *
 * @cssprop --klevu-chat-layout-max-height 100vh The maxium height for the chat layout.
 */
@Component({
  tag: "klevu-chat-layout",
  styleUrl: "klevu-chat-layout.css",
  shadow: true,
})
export class KlevuChatLayout {
  @Element() el!: HTMLElement
  #scrollElement?: HTMLKlevuUtilScrollbarsElement

  /**
   * Current value of the text field
   */
  @State() text = ""

  componentDidLoad() {
    // listen to updates to DOM in slot and scroll to bottom
    const main = this.el.shadowRoot?.querySelector("slot")
    const observer = new MutationObserver(() => {
      this.#scrollMainToBottom()
    })
    if (main) {
      observer.observe(main, { childList: true })
    }
    setTimeout(() => {
      this.#scrollMainToBottom()
    }, 20)
  }

  async #scrollMainToBottom() {
    const instance = await this.#scrollElement?.getInstance()
    if (instance) {
      instance.elements().viewport.scrollTo({
        top: instance.elements().viewport.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  /**
   * Event emitted when user sends a message
   */
  @Event() klevuChatLayoutMessageSent!: EventEmitter<string>

  #sendMessage() {
    this.klevuChatLayoutMessageSent.emit(this.text)
    this.text = ""
  }

  render() {
    return (
      <Host>
        <klevu-util-scrollbars overflowX="hidden" overflowY="scroll" ref={(el) => (this.#scrollElement = el)}>
          <main>
            <slot></slot>
          </main>
        </klevu-util-scrollbars>
        <footer>
          <klevu-popup anchor="top-start">
            <div slot="content">
              <slot name="menu"></slot>
            </div>
            <klevu-button slot="origin" exportparts={globalExportedParts} icon="menu" isSecondary></klevu-button>
          </klevu-popup>
          <klevu-textfield
            variant="pill"
            value={this.text}
            onKlevuTextChanged={(e) => {
              this.text = e.detail
              e.preventDefault()
              return false
            }}
            onKlevuTextEnterPressed={() => this.#sendMessage()}
          ></klevu-textfield>
          <klevu-button
            exportparts={globalExportedParts}
            icon="send"
            onClick={() => this.#sendMessage()}
          ></klevu-button>
        </footer>
      </Host>
    )
  }
}
