import { Component, Host, h, Element } from "@stencil/core"

@Component({
  tag: "klevu-product-grid",
  styleUrl: "klevu-product-grid.css",
  shadow: true,
})
export class KlevuProductGrid {
  @Element() el?: HTMLKlevuProductGridElement
  render() {
    return (
      <Host>
        <div class="container">
          <slot />
        </div>
      </Host>
    )
  }
}
