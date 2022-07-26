import { Component, Host, h, Prop, Element } from "@stencil/core"

@Component({
  tag: "klevu-popup",
  styleUrl: "klevu-popup.css",
  shadow: true,
})
export class KlevuPopup {
  @Element() el
  @Prop() open = false
  @Prop() openAtFocus = true
  @Prop() closeAtOutsideClick = true
  @Prop() fullwidthContent = false

  private openEvent(event) {
    this.open = true
  }

  private closeEvent(event) {
    if (!event.composedPath().some((el) => el === this.el)) {
      this.open = false
    }
  }

  connectedCallback() {
    if (this.openAtFocus) {
      this.el.addEventListener("click", this.openEvent)
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
          }}
        >
          <slot name="content" />
        </div>
      </Host>
    )
  }
}
