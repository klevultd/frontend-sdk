import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "klevu-product-grid",
  styleUrl: "klevu-product-grid.css",
  shadow: true,
})
export class KlevuProductGrid {
  @Prop() products: KlevuRecord[] = []
  render() {
    return (
      <Host>
        <slot>
          {this.products.map((product) => (
            <klevu-product product={product}></klevu-product>
          ))}
        </slot>
      </Host>
    )
  }
}
