import { Component, Element, Host, h, Prop, Method, Watch } from "@stencil/core"
import { OverflowBehavior, OverlayScrollbars, PartialOptions } from "overlayscrollbars"

/**
 * Utility that replaces the default browser scrollbar with a custom one.
 *
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
  nativeContainer?: HTMLDivElement

  /**
   * The overflow behavior of the horizontal scrollbar.
   */
  @Prop() overflowX?: OverflowBehavior
  /**
   * The overflow behavior of the vertical scrollbar.
   */
  @Prop() overflowY?: OverflowBehavior

  /**
   * Disables the custom scrollbar and use native scrollbars instead.
   */
  @Prop() useNative?: boolean

  componentDidLoad() {
    this.#initCustomScrollbars()

    if (this.useNative === undefined && window.klevu_ui_settings?.useNativeScrollbars === true) {
      this.useNative = true
    }
  }

  @Watch("overflowX")
  @Watch("overflowY")
  scrollbarOptionsChanged() {
    this.instance?.destroy()
    this.#initCustomScrollbars()
  }

  #initCustomScrollbars() {
    if (!this.container || this.useNative) {
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
    return {
      customInstance: this.instance,
      nativeContainer: this.nativeContainer,
    }
  }

  render() {
    if (this.useNative) {
      return this.renderNative()
    }
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

  renderNative() {
    let overflowX = this.overflowX
    if (overflowX === "visible-hidden") {
      overflowX = "hidden"
    }
    if (overflowX === "visible-scroll") {
      overflowX = "scroll"
    }
    let overflowY = this.overflowY
    if (overflowY === "visible-hidden") {
      overflowY = "hidden"
    }
    if (overflowY === "visible-scroll") {
      overflowY = "scroll"
    }

    return (
      <Host>
        <div
          class={{
            native: true,
          }}
          style={{
            overflowX: this.overflowX,
            overflowY: this.overflowY,
          }}
          ref={(el) => (this.nativeContainer = el)}
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
