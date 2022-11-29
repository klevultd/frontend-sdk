import { Component, h, Host, Prop } from "@stencil/core"

/**
 * Horizontal slides component
 */
@Component({
  tag: "klevu-slides",
  styleUrl: "klevu-slides.css",
  shadow: true,
})
export class KlevuSlides {
  /**
   * Height of the slides
   */
  @Prop() height = "400px"

  render() {
    return (
      <Host style={{ height: this.height }}>
        <div class="slides">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
