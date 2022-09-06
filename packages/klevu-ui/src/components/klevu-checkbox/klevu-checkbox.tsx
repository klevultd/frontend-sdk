import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "klevu-checkbox",
  styleUrl: "klevu-checkbox.css",
  shadow: true,
})
export class KlevuCheckbox {
  @Prop({ reflect: true }) checked: boolean
  @Prop({ reflect: true }) value: string
  @Prop({ reflect: true }) disabled: boolean
  render() {
    return <input type="checkbox" checked={this.checked} disabled={this.disabled} />
  }
}
