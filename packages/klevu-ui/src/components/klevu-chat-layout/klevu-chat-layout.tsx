import { Component, Element, Event, EventEmitter, Host, State, h, Method, Prop } from "@stencil/core"

/**
 * Component that wraps chat elements into a layout.
 *
 * @slot header - Header of the chat layout
 * @slot footer - Footer of the chat layout
 * @slot default - Main content of the chat layout. Only one element should be used for this slot to make layout calculatios right.
 * @slot actions - Actions to be placed in the footer
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
  #popupElement?: HTMLKlevuPopupElement

  /**
   * Use native scrollbars instead of custom ones in content
   */
  @Prop()
  useNativeScrollbars?: boolean

  /**
   * Current value of the text field
   */
  @State()
  text = ""

  @State()
  menuSlotCount = 0

  componentDidLoad() {
    // listen to updates to DOM in slot and scroll to bottom
    const mainSlot: HTMLSlotElement = this.el.shadowRoot?.querySelector("main slot") as HTMLSlotElement
    const observer = new MutationObserver(() => {
      this.scrollMainToBottom()
    })
    if (mainSlot) {
      observer.observe(mainSlot, { childList: true })
    }
    setTimeout(() => {
      this.scrollMainToBottom()
    }, 20)

    const menu = this.el.shadowRoot?.querySelector("slot[name=menu]") as HTMLSlotElement | undefined
    this.menuSlotCount = menu?.assignedElements().length ?? 0
    menu?.addEventListener("slotchange", () => {
      this.menuSlotCount = menu?.assignedElements().length ?? 0
    })
  }

  /**
   * Scroll current chat to bottom of page
   */
  @Method()
  async scrollMainToBottom(behavior: "smooth" | "instant" = "smooth") {
    const instance = await this.#scrollElement?.getInstance()
    if (instance?.customInstance) {
      instance.customInstance.update(true)
      setTimeout(() => {
        instance.customInstance?.elements().viewport.scrollTo({
          top: instance.customInstance?.elements().viewport.scrollHeight,
          behavior: behavior as any,
        })
      }, 20)
    } else if (instance?.nativeContainer) {
      instance.nativeContainer.scrollTo({
        top: instance.nativeContainer.scrollHeight,
        behavior: behavior,
      })
    }
  }

  /**
   * Close the popup menu
   */
  @Method()
  async closePopup() {
    this.#popupElement?.closeModal()
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
        <header>
          <slot name="header"></slot>
        </header>
        <main>
          <klevu-util-scrollbars
            overflowX="hidden"
            overflowY="scroll"
            useNative={this.useNativeScrollbars}
            ref={(el) => (this.#scrollElement = el)}
          >
            <slot></slot>
          </klevu-util-scrollbars>
        </main>
        <footer>
          <slot name="footer">
            <slot name="actions"></slot>
            <div class="inputs">
              {this.menuSlotCount > 0 ? (
                <klevu-popup anchor="top-start" ref={(el) => (this.#popupElement = el)}>
                  <div slot="content">
                    <slot name="menu"></slot>
                  </div>
                  <klevu-button slot="origin" icon="menu" isSecondary></klevu-button>
                </klevu-popup>
              ) : null}
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
              <klevu-button icon="send" onClick={() => this.#sendMessage()}></klevu-button>
            </div>
          </slot>
        </footer>
      </Host>
    )
  }
}
