import { Component, h, Host, Prop } from "@stencil/core"

/**
 * Component to place products on grid. Very simple container for products.
 * @csspart product-grid-base The container for the grid
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
        <div class="gridcontainer" style={style} part="product-grid-base">
          <slot />
        </div>
      </Host>
    )
  }
}
