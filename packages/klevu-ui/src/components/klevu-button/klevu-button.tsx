import { Component, h, Prop } from "@stencil/core"

/**
 * Basic button component
 *
 * @slot default - Button text
 * @csspart button-base The button element
 */
@Component({
  tag: "klevu-button",
  styleUrl: "klevu-button.css",
  shadow: true,
})
export class KlevuButton {
  /** Is button disabled */
  @Prop({ reflect: true })
  disabled?: boolean

  /** Toned down secondary button */
  @Prop()
  isSecondary?: boolean

  /** Toned down tertiary button */
  @Prop()
  isTertiary?: boolean

  /** Make button display block */
  @Prop()
  fullWidth?: boolean

  @Prop()
  size: "tiny" | "small" | "normal" | "large" = "normal"

  /**
   * Instead of content have an icon. So basically icon-button
   */
  @Prop()
  icon?: string

  render() {
    return (
      <button
        part="button-base"
        disabled={this.disabled}
        class={{
          secondary: Boolean(this.isSecondary),
          tertiary: Boolean(this.isTertiary),
          fullwidth: Boolean(this.fullWidth),
          icon: Boolean(this.icon),
          sizeSmall: this.size === "small",
          sizeLarge: this.size === "large",
          sizeTiny: this.size === "tiny",
        }}
      >
        {this.icon ? (
          <klevu-icon name={this.icon}></klevu-icon>
        ) : (
          <klevu-typography variant={this.isTertiary || this.size === "tiny" ? "body-s" : "body-s-bold"}>
            <slot />
          </klevu-typography>
        )}
      </button>
    )
  }
}
