import { Component, Element, h, Host, Method, Prop, State } from "@stencil/core"
import { KlevuPopupAnchor } from "../klevu-popup/klevu-popup"

/**
 * Component to create offscreen drawer on left or right side of the screen
 *
 * @slot origin - When origin element is clicked then content is shown
 * @slot content - Content to display in drawer
 */
@Component({
  tag: "klevu-drawer",
  styleUrl: "klevu-drawer.css",
  shadow: true,
})
export class KlevuDrawer {
  @Element() el?: HTMLKlevuDrawerElement
  /**
   * Start side drawer open
   */
  @Prop() startOpen?: boolean
  /**
   * Display dim background on top of other content
   */
  @Prop() background?: boolean
  /**
   * Close by clicking outside of drawer
   */
  @Prop() closeAtOutsideClick = true

  /**
   * Anchor to right or left side of the page
   */
  @Prop() anchor: KlevuPopupAnchor = "right"

  @State() open = false

  private originalOverflow: any

  private openEvent(event: MouseEvent) {
    if (event.composedPath().some((el: any) => el.name === "origin")) {
      this.openModal()
    }
  }

  private closeEvent(event: MouseEvent) {
    if (!event.composedPath().some((el: any) => el === this.el)) {
      this.closeModal()
    }
  }

  @Method()
  async openModal() {
    document.body.style.overflowX = "inherit"

    this.open = true
    this.originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
  }

  @Method()
  async closeModal() {
    document.body.style.overflowX = "none"

    this.open = false
    document.body.style.overflow = this.originalOverflow
  }

  connectedCallback() {
    if (this.startOpen) {
      this.openModal()
    }

    this.el?.addEventListener("click", this.openEvent.bind(this))

    if (this.closeAtOutsideClick) {
      document.addEventListener("click", this.closeEvent.bind(this))
    }
  }

  detachedCallback() {
    document.removeEventListener("click", this.closeEvent)
    this.el?.removeEventListener("click", this.openEvent)
  }

  render() {
    return (
      <Host>
        <slot name="origin" />
        <div
          class={{
            drawer: true,
            show: this.open,
            left: this.anchor === "left",
            right: this.anchor === "right",
          }}
        >
          <div class="innercontainer">
            <slot name="content" />
          </div>
        </div>
        {this.background ? (
          <div onClick={this.closeModal.bind(this)} class={{ background: true, show: this.open }}></div>
        ) : null}
      </Host>
    )
  }
}
