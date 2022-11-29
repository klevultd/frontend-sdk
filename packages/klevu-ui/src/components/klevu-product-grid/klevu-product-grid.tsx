import { Component, Element, h, Host } from "@stencil/core"

/**
 * Component to place products on grid
 */
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
