import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop } from "@stencil/core"
import { getGlobalSettings, renderPrice } from "../../utils/utils"

@Component({
  tag: "klevu-product",
  styleUrl: "klevu-product.css",
  shadow: true,
})
export class KlevuProduct {
  @Prop() product?: KlevuRecord

  render() {
    if (!this.product) {
      return (
        <Host>
          <div class="container">
            <div class="loading image"></div>
            <div class="loading content">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </Host>
      )
    }

    const settings = getGlobalSettings()
    const isOnSale = this.product.price != this.product.salePrice

    return (
      <Host>
        <a
          href={settings?.generateProductUrl?.(this.product)}
          onClick={settings?.onProductClick ? (e) => settings.onProductClick(this.product, e) : undefined}
          class="container"
        >
          <slot name="image">
            <div
              class="image"
              part="image"
              style={{
                backgroundImage: `url(${this.product.image})`,
              }}
            ></div>
          </slot>
          <slot name="info">
            <div part="info">
              <p>{this.product.name}</p>
              <p
                class={{
                  isOnSale,
                }}
              >
                {renderPrice(this.product.price, this.product.currency)}
              </p>
            </div>
          </slot>
        </a>
      </Host>
    )
  }
}
