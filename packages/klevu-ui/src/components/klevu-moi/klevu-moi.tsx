import { Component, Host, h } from "@stencil/core"

/**
 * Klevu MOI Application
 */
@Component({
  tag: "klevu-moi",
  styleUrl: "klevu-moi.css",
  shadow: true,
})
export class KlevuMoi {
  render() {
    return (
      <Host>
        Hello world
        <slot></slot>
      </Host>
    )
  }
}
