import { Component, Host, h, Prop, Element, State, Method } from "@stencil/core"

export type KlevuPopupAnchor = "left" | "right"

@Component({
  tag: "klevu-popup",
  styleUrl: "klevu-popup.css",
  shadow: true,
})
export class KlevuPopup {
  @Element() el?: HTMLKlevuPopupElement
  @Prop() startOpen?: boolean
  @Prop() openAtFocus = true
  @Prop() closeAtOutsideClick = true
  @Prop() fullwidthContent = false
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

  @Method()
  async openModal() {
    this.open = true
  }

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
