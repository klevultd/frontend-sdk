import { Component, h, Prop } from "@stencil/core"

export type KlevuHeadingVariant = "h1" | "h2" | "h3"

/**
 * Heading element
 *
 * @cssprop --klevu-h1-size - H1 heading size
 * @cssprop --klevu-h1-weight - H1 font weight
 * @cssprop --klevu-h1-color - H1 font color
 * @cssprop --klevu-h2-size - H2 heading size
 * @cssprop --klevu-h2-weight - H2 font weight
 * @cssprop --klevu-h2-color - H3 font color
 * @cssprop --klevu-h3-size - H3 heading size
 * @cssprop --klevu-h3-weight - H3 font weight
 * @cssprop --klevu-h3-color - H3 font color
 */
@Component({
  tag: "klevu-heading",
  styleUrl: "klevu-heading.css",
  shadow: true,
})
export class KlevuHeading {
  /**
   * Varint of heading
   */
  @Prop() variant: KlevuHeadingVariant = "h1"

  render() {
    return (
      <span class={`heading-${this.variant}`}>
        <slot></slot>
      </span>
    )
  }
}
