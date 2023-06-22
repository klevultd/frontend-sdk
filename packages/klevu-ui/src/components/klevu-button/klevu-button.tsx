import { Component, h, Prop } from "@stencil/core"

/**
 * Basic button component
 *
 * @slot default - Button text
 * @csspart klevu-button - The button element
 * @cssprop --klevu-button-background-color --klevu-color-primary Background color of button
 * @cssprop --klevu-button-border --klevu-color-primary-border Border color of button
 * @cssprop --klevu-button-text-color --klevu-color-primary-text Button text color
 * @cssprop --klebu-button-padding --klevu-spacing-04 Padding on button
 * @cssprop --klevu-button-text-align center Align text on button
 * @cssprop --klevu-button-padding calculated Override buttom padding with custom value
 * @cssprop --klevu-button-font-size --klevu-body-s-size Size of button text
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
  size: "small" | "normal" | "large" = "normal"

  /**
   * Instead of content have an icon. So basically icon-button
   */
  @Prop()
  icon?: string

  render() {
    return (
      <button
        part="klevu-button"
        disabled={this.disabled}
        class={{
          secondary: Boolean(this.isSecondary),
          tertiary: Boolean(this.isTertiary),
          fullwidth: Boolean(this.fullWidth),
          icon: Boolean(this.icon),
          sizeSmall: this.size === "small",
          sizeLarge: this.size === "large",
        }}
      >
        {this.icon ? (
          <span part="material-icon">{this.icon}</span>
        ) : (
          <klevu-typography variant={this.isTertiary ? "body-s" : "body-s-bold"}>
            <slot />
          </klevu-typography>
        )}
      </button>
    )
  }
}
