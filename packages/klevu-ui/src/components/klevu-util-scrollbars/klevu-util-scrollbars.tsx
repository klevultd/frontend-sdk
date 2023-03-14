import { Component, Element, Host, h, Prop, Method } from "@stencil/core"
import { OverflowBehavior, OverlayScrollbars, PartialOptions } from "overlayscrollbars"

/**
 * Utility that replaces the default browser scrollbar with a custom one.
 */
@Component({
  tag: "klevu-util-scrollbars",
  styleUrl: "klevu-util-scrollbars.css",
  shadow: false,
})
export class KlevuUtilScrollbars {
  @Element() el!: HTMLElement
  container?: HTMLDivElement
  instance?: OverlayScrollbars

  @Prop() overflowX?: OverflowBehavior
  @Prop() overflowY?: OverflowBehavior

  componentDidLoad() {
    if (!this.container) {
      return
    }
    const options: PartialOptions = {
      overflow: {},
      scrollbars: {
        theme: "os-theme-klevu",
      },
    }
    if (this.overflowX) {
      options.overflow!.x = this.overflowX
    }
    if (this.overflowY) {
      options.overflow!.y = this.overflowY
    }
    this.instance = OverlayScrollbars(this.container, options)
  }

  @Method()
  async getContainer() {
    return this.container
  }

  @Method()
  async getInstance() {
    return this.instance
  }

  render() {
    return (
      <Host>
        <div
          style={{
            "--os-size": "4px !important",
            "--os-handle-bg": "red !important",
            "--os-handle-bg-hover": "var(--klevu-color-neutral-6) !important",
            "--os-handle-bg-active": "var(--klevu-color-neutral-7) !important",
          }}
          ref={(el) => (this.container = el)}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
