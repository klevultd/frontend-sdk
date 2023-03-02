import { Component, h, Host, Prop } from "@stencil/core"

/**
 * Component to place products on grid. Very simple container for products.
 *
 * @cssprop --klevu-product-grid-spacing --klevu-spacing-large spacing between grid items;
 */
@Component({
  tag: "klevu-product-grid",
  styleUrl: "klevu-product-grid.css",
  shadow: true,
})
export class KlevuProductGrid {
  /**
   * Place products in grid with this many products
   */
  @Prop() itemsPerRow?: number
  render() {
    if (this.itemsPerRow) {
      return (
        <Host>
          <div
            class="gridcontainer"
            style={{
              gridTemplateColumns: `repeat(${this.itemsPerRow}, 1fr)`,
            }}
          >
            <slot />
          </div>
        </Host>
      )
    }

    return (
      <Host>
        <div class="container">
          <slot />
        </div>
      </Host>
    )
  }
}
