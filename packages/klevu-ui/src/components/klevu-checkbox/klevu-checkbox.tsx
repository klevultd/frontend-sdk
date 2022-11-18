import { Component, Host, h, Prop } from "@stencil/core"

// this component needs to implement new ElementInternals as soon as it's implemented
// https://github.com/ionic-team/stencil/issues/2284

@Component({
  tag: "klevu-checkbox",
  styleUrl: "klevu-checkbox.css",
  shadow: true,
})
export class KlevuCheckbox {
  /**
   * Is checkbox checked
   */
  @Prop({ reflect: true }) checked?: boolean
  /**
   * Is disabled
   */
  @Prop({ reflect: true }) disabled?: boolean
  /**
   * Name of the checkbox
   */
  @Prop({ reflect: true }) name?: string

  render() {
    return <input type="checkbox" checked={this.checked} disabled={this.disabled} name={this.name} id={this.name} />
  }
}
