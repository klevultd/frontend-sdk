import { Component, h, Prop } from "@stencil/core"

/**
 * Basic button component
 *
 * @cssprop --klevu-button-background-color --klevu-color-primary Background color of button
 * @cssprop --klevu-button-border --klevu-color-primary-border Border color of button
 * @cssprop --klevu-button-text-color --klevu-color-primary-text Button text color
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

  render() {
    return (
      <button disabled={this.disabled}>
        <slot />
      </button>
    )
  }
}
