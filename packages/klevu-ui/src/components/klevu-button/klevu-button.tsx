import { Component, h, Prop } from "@stencil/core"

/**
 * Basic button component
 *
 * @slot default - Button text
 * @cssprop --klevu-button-background-color --klevu-color-primary Background color of button
 * @cssprop --klevu-button-border --klevu-color-primary-border Border color of button
 * @cssprop --klevu-button-text-color --klevu-color-primary-text Button text color
 * @cssprop --klebu-button-padding --klevu-spacing-04 Padding on button
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

  /** Make button display block */
  @Prop()
  fullWidth?: boolean

  /**
   * Instead of content have an icon. So basically icon-button
   */
  @Prop()
  icon?: string

  render() {
    return (
      <button
        disabled={this.disabled}
        class={{
          secondary: Boolean(this.isSecondary),
          fullwidth: Boolean(this.fullWidth),
          icon: Boolean(this.icon),
        }}
      >
        {this.icon ? (
          <span part="material-icon">{this.icon}</span>
        ) : (
          <klevu-typography variant="body-s-bold">
            <slot />
          </klevu-typography>
        )}
      </button>
    )
  }
}
