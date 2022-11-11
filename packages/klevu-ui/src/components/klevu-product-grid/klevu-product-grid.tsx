import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop, Element } from "@stencil/core"
import type { KlevuProductVariant } from "../klevu-product/klevu-product"

@Component({
  tag: "klevu-product-grid",
  styleUrl: "klevu-product-grid.css",
  shadow: true,
})
export class KlevuProductGrid {
  @Prop() products?: Array<KlevuRecord | undefined> = []
  @Prop() renderProduct?: (product: KlevuRecord | undefined) => HTMLElement
  @Prop() productProps?: Partial<{
    variant: KlevuProductVariant
  }>
  @Element() el?: HTMLKlevuProductGridElement
  render() {
    if (this.renderProduct && this.products) {
      const elementList = this.products.map((product) => {
        return this.renderProduct!(product)
      })
      this.el?.shadowRoot?.append(...elementList)
      return
    }

    return (
      <Host>
        <div class="container">
          <slot />
          {this.products?.map((product) => (
            <klevu-product fixedWidth product={product} variant={this.productProps?.variant}></klevu-product>
          ))}
        </div>
      </Host>
    )
  }
}
