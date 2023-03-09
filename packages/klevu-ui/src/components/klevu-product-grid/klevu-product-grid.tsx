import { Component, h, Host, Prop } from "@stencil/core"

/**
 * Component to place products on grid. Very simple container for products.
 *
 * @cssprop --klevu-product-grid-spacing --klevu-spacing-05 spacing between grid items;
 */
@Component({
  tag: "klevu-product-grid",
  styleUrl: "klevu-product-grid.css",
  shadow: true,
})
export class KlevuProductGrid {
  /**
   * Force to place products in grid with given number of columns.
   */
  @Prop() itemsPerRow?: number
  render() {
    const style: any = {}
    if (this.itemsPerRow) {
      style.gridTemplateColumns = `repeat(${this.itemsPerRow}, 1fr)`
    }
    return (
      <Host>
        <div class="gridcontainer" style={style}>
          <slot />
        </div>
      </Host>
    )
  }
}
