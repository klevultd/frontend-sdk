import { Component, h, Prop } from "@stencil/core"

export type KlevuTypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-l"
  | "body-m"
  | "body-s"
  | "body-xs"
  | "body-l-bold"
  | "body-m-bold"
  | "body-s-bold"
  | "body-xs-bold"

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
  tag: "klevu-typography",
  styleUrl: "klevu-typography.css",
  shadow: true,
})
export class KlevuTypography {
  /**
   * Variant of heading
   */
  @Prop() variant!: KlevuTypographyVariant

  render() {
    return (
      <span class={`variant-${this.variant}`}>
        <slot></slot>
      </span>
    )
  }
}
