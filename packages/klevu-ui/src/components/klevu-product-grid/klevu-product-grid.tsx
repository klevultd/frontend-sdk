import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop, Element } from "@stencil/core"
import type { KlevuProductVariant } from "../klevu-product/klevu-product"

@Component({
  tag: "klevu-product-grid",
  styleUrl: "klevu-product-grid.css",
  shadow: true,
})
export class KlevuProductGrid {
  @Prop() products: KlevuRecord[] = []
  @Prop() renderProduct?: (product: KlevuRecord) => HTMLElement
  @Prop() productProps?: Partial<{
    variant: KlevuProductVariant
  }>
  @Element() el: HTMLElement
  render() {
    if (this.renderProduct) {
      const elementList = this.products.map((product) => this.renderProduct(product))
      this.el.shadowRoot.append(...elementList)
      return
    }

    return (
      <Host>
        <slot>
          {this.products.map((product) => (
            <klevu-product product={product} variant={this.productProps?.variant}></klevu-product>
          ))}
        </slot>
      </Host>
    )
  }
}
