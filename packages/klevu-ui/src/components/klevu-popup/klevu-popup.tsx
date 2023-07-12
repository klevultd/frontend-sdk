import { autoUpdate, computePosition, offset, Placement, shift, size } from "@floating-ui/dom"
import { Component, Element, h, Host, Listen, Method, Prop, State, Event, EventEmitter } from "@stencil/core"

/**
 * Popup component where clicking origin component popups the the content
 *
 * @slot origin - Popoup origin that opens content of popup
 * @slot content - Content of the popup
 *
 * @csspart popup-origin - Origin component
 * @csspart popup-content - Content component
 */
@Component({
  tag: "klevu-popup",
  styleUrl: "klevu-popup.css",
  shadow: true,
})
export class KlevuPopup {
  @Element() el?: HTMLKlevuPopupElement
  /**
   * Initially show the popup
   */
  @Prop() startOpen?: boolean
  /**
   * Open content when origin component is focused
   */
  @Prop() openAtFocus = true
  /**
   * Close popup when clicking outside content area
   */
  @Prop() closeAtOutsideClick = true
  /**
   * At minimum popup content should be the widht of the origin
   */
  @Prop() fullwidthContent = false
  /**
   * Set width of the popup content
   */
  @Prop() popupWidth?: number
  /**
   * Anchor popup to left or right of page
   */
  @Prop() anchor: Placement = "left-end"

  /**
   * Elevation of the popup. 0-3.
   */
  @Prop() elevation = 1

  /**
   * How many pixels to offset the popup from origin
   */
  @Prop() offset = 16

  /**
   * Darken background when popup is open
   */
  @Prop() useBackground = false

  /**
   * When popup is opened this event is emitted
   */
  @Event({
    composed: true,
  })
  klevuPopupOpen!: EventEmitter<void>

  @Event({
    composed: true,
  })
  klevuPopupClose!: EventEmitter<void>

  /**
   * Is currently open
   */
  @State() open = false

  #stopUpdatePos?: Function
  #originElement?: HTMLElement | null
  #contentElement?: HTMLElement | null

  /**
   * When clicking outside popup close it
   * @param event
   */
  #closeEvent(event: any) {
    if (!event.composedPath().some((el: HTMLElement) => el.tagName === "klevu-popup".toLocaleUpperCase())) {
      this.closeModal()
    }
  }

  async #internalOpen() {
    if (this.open) {
      return
    }

    this.open = true
    this.#updatePopupPosition()
    this.klevuPopupOpen.emit()
  }

  async #updatePopupPosition() {
    if (!this.#originElement || !this.#contentElement || !this.open) {
      return
    }

    const { x, y } = await computePosition(this.#originElement, this.#contentElement, {
      placement: this.anchor,
      middleware: [
        offset(this.offset),
        shift(),
        size({
          apply: ({ availableWidth, elements }) => {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
            })
          },
        }),
      ],
    })
    const smallScreen = (this.popupWidth ?? 390) > window.innerWidth
    if (smallScreen) {
      Object.assign(this.#contentElement.style, {
        left: "0px",
        top: "0px",
        position: "fixed",
        maxHeight: "auto",
        maxWidth: "auto",
        width: "100vw",
        height: "100vh",
      })
    } else {
      Object.assign(this.#contentElement.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: null,
        height: null,
      })
    }
  }

  /**
   * Opens the popup
   */
  @Method()
  async openModal() {
    this.#internalOpen()
  }

  /**
   * Closes the popup
   */
  @Method()
  async closeModal() {
    const event = this.klevuPopupClose.emit()
    if (!event.defaultPrevented) {
      this.open = false
    }
  }

  @Listen("click", {
    capture: true,
  })
  childItemClicked(event: PointerEvent) {
    if (event.composedPath().some((e: any) => e.localName === "slot" && e.name === "origin")) {
      this.#internalOpen()
    }
  }

  @Listen("focus", {
    capture: true,
  })
  childItemFocused(event: FocusEvent) {
    if (!this.openAtFocus) {
      return
    }
    if (event.composedPath().some((e: any) => e.localName === "slot" && e.name === "origin")) {
      this.#internalOpen()
    }
  }

  connectedCallback() {
    if (this.closeAtOutsideClick) {
      document.addEventListener("click", this.#closeEvent.bind(this))
    }
  }

  componentDidLoad() {
    this.#originElement = this.el?.shadowRoot?.querySelector("#origin")
    this.#contentElement = this.el?.shadowRoot?.querySelector("#content")

    if (this.startOpen) {
      this.openModal()
    }

    if (this.#originElement && this.#contentElement) {
      this.#stopUpdatePos = autoUpdate(this.#originElement, this.#contentElement, this.#updatePopupPosition.bind(this))
    }
  }

  detachedCallback() {
    document.removeEventListener("click", this.#closeEvent)
    this.#stopUpdatePos?.()
  }

  render() {
    const popupClasses: any = {
      popup: true,
      show: this.open,
    }

    popupClasses[`elevation-${this.elevation}`] = true

    const styles: any = {}
    if (this.popupWidth) {
      styles.width = `${this.popupWidth}px`
    }

    return (
      <Host>
        <div id="origin" class="originContainer" part="popup-origin">
          <slot name="origin" />
        </div>
        <div id="content" class={popupClasses} style={styles} part="popup-content">
          <slot name="content" />
        </div>
        {this.open && this.useBackground && <div class="background" onClick={this.closeModal.bind(this)} />}
      </Host>
    )
  }
}
