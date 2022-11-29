import { Component, h, Prop } from "@stencil/core"

export type KlevuHeadingVariant = "h1" | "h2" | "h3"

/**
 * Heading element
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
