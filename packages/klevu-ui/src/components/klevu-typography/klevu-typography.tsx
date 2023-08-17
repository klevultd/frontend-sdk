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
 * Klevu typography component. This component is used in most places to set correct font in component pieces.
 *
 * @cssprop --klevu-typography-color - Color of the text that overrides the default
 * @cssprop --klevu-typography-font-weight - Font weight that overrides the default
 * @cssprop --klevu-h1-size 24px H1 size
 * @cssprop --klevu-h1-lineheight calc(28em/24) H1 line-height
 * @cssprop --klevu-h1-weight 700 H1 weight
 * @cssprop --klevu-h2-size 20px H2 size
 * @cssprop --klevu-h2-lineheight calc(24em/20) H2 line-height
 * @cssprop --klevu-h2-weight 700 H2 weight
 * @cssprop --klevu-h3-size 16px H3 size
 * @cssprop --klevu-h3-lineheight calc(20em/16) H3 line-height
 * @cssprop --klevu-h3-weight 700 H3 weight
 * @cssprop --klevu-h4-size 14px H4 size
 * @cssprop --klevu-h4-lineheight calc(18em/14) H4 line-height
 * @cssprop --klevu-h4-weight 700 H4 weight
 * @cssprop --klevu-body-l-size 20px Body large size
 * @cssprop --klevu-body-l-line-height calc(28em/20) Body large line-height
 * @cssprop --klevu-body-m-size 16px Body medium size
 * @cssprop --klevu-body-m-line-height calc(24em/16) Body medium line-height
 * @cssprop --klevu-body-s-size 14px  Body small size
 * @cssprop --klevu-body-s-line-height calc(20em/14) Body small line-height
 * @cssprop --klevu-body-xs-size 12px Body extra small size
 * @cssprop --klevu-body-xs-line-height calc(16em/12) Body extra small line-height
 *
 */
@Component({
  tag: "klevu-typography",
  styleUrl: "klevu-typography.css",
  shadow: false,
})
export class KlevuTypography {
  /**
   * Variant of heading
   */
  @Prop() variant!: KlevuTypographyVariant

  /**
   * Display the text in full width. Usefull when typography needs to be used as a block element.
   */
  @Prop() fullWidth?: boolean

  render() {
    let style: any = {}
    if (this.fullWidth) {
      style.width = "100%"
    }

    return (
      <span class={`variant-${this.variant}`} style={style}>
        <slot></slot>
      </span>
    )
  }
}
