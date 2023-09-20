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
  dialogRef?: HTMLDialogElement

  /**
   * Initially show the popup
   */
  @Prop() startOpen?: boolean

  /**
   * Clicking origin again will close the popup
   */
  @Prop() toggle?: boolean

  /**
   * Open content when origin component is focused
   */
  @Prop() openAtFocus = true
  /**
   * Close popup when clicking outside content area
   */
  @Prop() closeAtOutsideClick = true

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
   * Element to anchor popup to. If not set popup is anchored to origin slot
   */
  @Prop() originElement?: HTMLElement

  /**
   * Expand popup to full size of the screen when popup is smaller that requested width
   */
  @Prop() fullscreenOnMobileSize?: boolean

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

  #stopUpdatePos?: Function
  #originElement?: HTMLElement | null
  #contentElement?: HTMLElement | null

  /**
   * When clicking outside popup close it
   * @param event
   */
  #closeEvent(event: MouseEvent) {
    if (
      !event.composedPath().some((el) => {
        const elem = el as HTMLElement
        return elem.tagName === "klevu-popup".toLocaleUpperCase()
      }) &&
      event.target !== this.#originElement
    ) {
      this.closeModal()
    }
  }

  async #internalOpen() {
    if (this.useBackground) {
      this.dialogRef?.showModal()
    } else {
      this.dialogRef?.show()
    }
    this.#updatePopupPosition()
    this.#attachBackdropClick()
    this.klevuPopupOpen.emit()
  }

  async #updatePopupPosition() {
    if (!this.#originElement || !this.#contentElement || !this.dialogRef?.open) {
      return
    }

    const smallScreen = (this.popupWidth ?? 390) > document.body.clientWidth
    if (smallScreen && this.fullscreenOnMobileSize) {
      Object.assign(this.#contentElement.style, {
        left: "0px",
        top: "0px",
        position: "fixed",
        maxHeight: "100dvh",
        maxWidth: "100%",
        width: "100%",
        height: "100dvh",
      })
    } else {
      const { x, y } = await computePosition(this.#originElement, this.#contentElement, {
        strategy: "fixed",
        placement: this.anchor,
        middleware: [
          offset(this.offset),
          shift(),
          size({
            apply: ({ availableWidth, elements }) => {
              let maxWidth = availableWidth
              if (this.popupWidth && this.popupWidth < availableWidth) {
                maxWidth = this.popupWidth
              }

              Object.assign(elements.floating.style, {
                maxWidth: `${maxWidth}px`,
              })
            },
          }),
        ],
      })
      Object.assign(this.#contentElement.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: null,
        height: null,
        width: null,
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
      this.#detachBackdropClick()
      this.dialogRef?.close()
    }
  }

  @Listen("click", {
    capture: true,
  })
  childItemClicked(event: PointerEvent) {
    if (event.composedPath().some((e: any) => e.localName === "slot" && e.name === "origin")) {
      if (this.toggle && this.dialogRef?.open) {
        this.closeModal()
      } else {
        this.#internalOpen()
      }
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

  #backdropClick(event: MouseEvent) {
    if (!this.dialogRef || !this.dialogRef.open) {
      return
    }

    const rect = this.dialogRef.getBoundingClientRect()
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width

    const eventTarget = event.target as HTMLElement | null

    if (!isInDialog && eventTarget?.tagName === "DIALOG") {
      this.dialogRef.close()
    }
  }

  #attachBackdropClick() {
    if (this.closeAtOutsideClick && this.useBackground) {
      this.dialogRef?.addEventListener("click", this.#backdropClick.bind(this))
    } else if (this.closeAtOutsideClick) {
      document.addEventListener("click", this.#closeEvent.bind(this))
    }
  }

  #detachBackdropClick() {
    if (this.closeAtOutsideClick && this.useBackground) {
      this.dialogRef?.removeEventListener("click", this.#backdropClick.bind(this))
    } else if (this.closeAtOutsideClick) {
      document.removeEventListener("click", this.#closeEvent)
    }
  }

  componentDidLoad() {
    if (this.originElement) {
      this.originElement.addEventListener("click", (event) => {
        this.openModal()
        event.preventDefault()
        event.stopPropagation()
        return false
      })
    }

    this.#originElement = this.originElement || this.el?.shadowRoot?.querySelector("#origin")
    this.#contentElement = this.el?.shadowRoot?.querySelector("dialog")

    if (this.startOpen) {
      this.openModal()
    }

    if (this.#originElement && this.#contentElement) {
      this.#stopUpdatePos = autoUpdate(this.#originElement, this.#contentElement, this.#updatePopupPosition.bind(this))
    }
  }

  detachedCallback() {
    this.#detachBackdropClick()
    this.#stopUpdatePos?.()
  }

  render() {
    const popupClasses: any = {
      popup: true,
    }

    popupClasses[`elevation-${this.elevation}`] = true

    const styles: any = {}
    if (this.popupWidth) {
      styles.maxWidth = `${this.popupWidth}px`
    }

    return (
      <Host>
        <div id="origin" class="originContainer" part="popup-origin">
          <slot name="origin" />
        </div>
        <dialog
          style={styles}
          part="popup-content"
          open={this.startOpen}
          ref={(el) => (this.dialogRef = el)}
          class={popupClasses}
        >
          <slot name="content" />
        </dialog>
      </Host>
    )
  }
}
