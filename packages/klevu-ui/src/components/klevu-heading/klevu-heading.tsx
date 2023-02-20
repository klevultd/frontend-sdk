import { Component, h, Prop } from "@stencil/core"

export type KlevuHeadingVariant = "h1" | "h2" | "h3" | "h4"

/**
 * Heading element
 *
 * @cssprop --klevu-h1-size - H1 size
 * @cssprop --klevu-h1-line-height - H1 line-height
 * @cssprop --klevu-h1-weight - H1 weight
 * @cssprop --klevu-h2-size - H2 size
 * @cssprop --klevu-h2-line-height - H2 line-height
 * @cssprop --klevu-h2-weight - H2 weight
 * @cssprop --klevu-h3-size - H3 size
 * @cssprop --klevu-h3-line-height - H3 line-height
 * @cssprop --klevu-h3-weight - H3 weight
 * @cssprop --klevu-h4-size - H4 size
 * @cssprop --klevu-h4-line-height - H4 line-height
 * @cssprop --klevu-h4-weight - H4 weight
 */
@Component({
  tag: "klevu-heading",
  styleUrl: "klevu-heading.css",
  shadow: true,
})
export class KlevuHeading {
  /**
   * Variant of heading
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
