import { Component, Host, h, Event, Prop } from "@stencil/core"

@Component({
  tag: "klevu-button",
  styleUrl: "klevu-button.css",
  shadow: true,
})
export class KlevuButton {
  @Prop({ reflect: true })
  disabled: boolean

  render() {
    return (
      <button disabled={this.disabled}>
        <slot />
      </button>
    )
  }
}
