import { Component, Element, Host, h, Prop, Method, Watch } from "@stencil/core"
import { OverflowBehavior, OverlayScrollbars, PartialOptions } from "overlayscrollbars"

/**
 * Utility that replaces the default browser scrollbar with a custom one.
 *
 * @cssprop --klevu-util-scrollbar-handle-bg --klevu-color-neutral-5 The background color of the scrollbar handle.
 * @cssprop --klevu-util-scrollbar-handle-bg-hover --klevu-color-neutral-6 The background color of the scrollbar handle when hovered.
 * @cssprop --klevu-util-scrollbar-handle-bg-active --klevu-color-neutral-7 The background color of the scrollbar handle when active.
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
    this.#initCustomScrollbars()
  }

  @Watch("overflowX")
  @Watch("overflowY")
  scrollbarOptionsChanged() {
    this.instance?.destroy()
    this.#initCustomScrollbars()
  }

  #initCustomScrollbars() {
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
            height: "100%",
          }}
          ref={(el) => (this.container = el)}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
