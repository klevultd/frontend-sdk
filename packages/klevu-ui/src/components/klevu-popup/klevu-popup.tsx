import { Component, Element, h, Host, Method, Prop, State } from "@stencil/core"

export type KlevuPopupAnchor = "left" | "right"

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
  @Prop() anchor: KlevuPopupAnchor = "right"

  @State() open = false

  private openEvent() {
    this.open = true
  }

  private closeEvent(event: any) {
    if (!event.composedPath().some((el: HTMLElement) => el === this.el)) {
      this.open = false
    }
  }

  /**
   * Opens the popup
   */
  @Method()
  async openModal() {
    this.open = true
  }

  /**
   * Closes the popup
   */
  @Method()
  async closeModal() {
    this.open = false
  }

  connectedCallback() {
    if (this.startOpen) {
      this.open = true
    }
    if (this.openAtFocus) {
      this.el?.addEventListener("click", this.openEvent)
    }
    if (this.closeAtOutsideClick) {
      document.addEventListener("click", this.closeEvent.bind(this))
    }
  }

  detachedCallback() {
    document.removeEventListener("click", this.closeEvent)
  }

  render() {
    return (
      <Host>
        <slot name="origin" />
        <div
          class={{
            popup: true,
            show: this.open,
            fullwidth: this.fullwidthContent,
            left: this.anchor === "left",
            right: this.anchor === "right",
          }}
        >
          <slot name="content" />
        </div>
      </Host>
    )
  }
}
