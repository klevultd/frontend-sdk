import { autoUpdate, computePosition, offset, Placement, shift, size } from "@floating-ui/dom"
import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from "@stencil/core"

/**
 * Popup component where clicking origin component popups the the content
 *
 * @slot origin - Popoup origin that opens content of popup
 * @slot content - Content of the popup
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
   * Anchor popup to left or right of page
   */
  @Prop() anchor: Placement = "left-end"

  /**
   * Elevation of the popup. 0-3.
   */
  @Prop() elevation = 1

  @State() open = false

  #stopUpdatePos?: Function
  #originElement?: HTMLElement | null
  #contentElement?: HTMLElement | null

  #closeEvent(event: any) {
    if (!event.composedPath().some((el: HTMLElement) => el === this.el)) {
      this.open = false
    }
  }

  async #internalOpen() {
    if (this.open) {
      return
    }

    this.open = true
    this.#updatePopupPosition()
  }

  async #updatePopupPosition() {
    if (!this.#originElement || !this.#contentElement || !this.open) {
      return
    }

    const { x, y } = await computePosition(this.#originElement, this.#contentElement, {
      placement: this.anchor,
      middleware: [
        offset(16),
        shift(),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
            })
          },
        }),
      ],
    })
    Object.assign(this.#contentElement.style, {
      left: `${x}px`,
      top: `${y}px`,
    })
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
    this.open = false
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

    return (
      <Host>
        <div id="origin" class="originContainer">
          <slot name="origin" />
        </div>
        <div id="content" class={popupClasses}>
          <slot name="content" />
        </div>
      </Host>
    )
  }
}
