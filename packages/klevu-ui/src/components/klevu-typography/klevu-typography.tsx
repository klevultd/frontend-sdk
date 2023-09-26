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
