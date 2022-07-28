import { Component, Host, h } from "@stencil/core"

@Component({
  tag: "klevu-product-grid",
  styleUrl: "klevu-product-grid.css",
  shadow: true,
})
export class KlevuProductGrid {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
