import { Component, Element, Event, EventEmitter, Host, State, h, Method, Prop, Listen } from "@stencil/core"

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
   * Show loading indicator
   */
  @Prop()
  showLoading = false

  @Prop()
  elementForHeightCalculation?: HTMLElement

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
    this.calcContentSize()
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

    window.addEventListener("resize", this.handleResize.bind(this))
  }

  @Listen("slotchange")
  handleSlotChange() {
    this.calcContentSize()
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.handleResize.bind(this))
  }

  /**
   * Recalculates and fills the content to the max height of the chat layout.
   * It can be used to force layout size calculation
   */
  @Method()
  async calcContentSize() {
    const mainSlot: HTMLSlotElement = this.el.shadowRoot?.querySelector("main slot") as HTMLSlotElement
    const header = this.el.shadowRoot?.querySelector("header")
    const footer = this.el.shadowRoot?.querySelector("footer")
    const element = this.elementForHeightCalculation ? this.elementForHeightCalculation : this.el
    const elementPadding =
      parseInt(getComputedStyle(element).paddingTop) + parseInt(getComputedStyle(element).paddingBottom)

    const totalHeight = element.clientHeight - elementPadding

    const firstChild: HTMLElement | undefined = mainSlot.assignedElements()?.[0] as HTMLElement | undefined
    if (firstChild && header && footer) {
      firstChild.style.height = totalHeight - header.clientHeight - footer.clientHeight + "px"
    }
  }

  handleResize() {
    this.calcContentSize()
  }

  /**
   * Scroll current chat to bottom of page
   */
  @Method()
  async scrollMainToBottom(behavior: "smooth" | "instant" = "smooth") {
    const instance = await this.#scrollElement?.getInstance()
    if (instance) {
      setTimeout(() => {
        instance.elements().viewport.scrollTo({
          top: instance.elements().viewport.scrollHeight,
          behavior: behavior as any,
        })
      }, 20)
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
          <klevu-util-scrollbars overflowX="hidden" overflowY="scroll" ref={(el) => (this.#scrollElement = el)}>
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
