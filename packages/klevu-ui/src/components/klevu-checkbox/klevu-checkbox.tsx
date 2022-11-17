import { Component, Host, h, Prop } from "@stencil/core"

// this component needs to implement new ElementInternals as soon as it's implemented
// https://github.com/ionic-team/stencil/issues/2284

@Component({
  tag: "klevu-checkbox",
  styleUrl: "klevu-checkbox.css",
  shadow: true,
})
export class KlevuCheckbox {
  @Prop({ reflect: true }) checked?: boolean
  @Prop({ reflect: true }) value?: string
  @Prop({ reflect: true }) disabled?: boolean
  @Prop({ reflect: true }) name?: string

  render() {
    return <input type="checkbox" checked={this.checked} disabled={this.disabled} name={this.name} id={this.name} />
  }
}
