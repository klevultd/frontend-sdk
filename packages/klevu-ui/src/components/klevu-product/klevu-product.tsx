import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"
import { getGlobalSettings, renderPrice } from "../../utils/utils"

export type KlevuProductOnProductClick = { product: KlevuRecord; originalEvent: MouseEvent }

@Component({
  tag: "klevu-product",
  styleUrl: "klevu-product.css",
  shadow: true,
})
export class KlevuProduct {
  @Prop() addToCart?: boolean
  @Prop() product?: KlevuRecord
  @Event({
    composed: true,
    cancelable: true,
  })
  productClick: EventEmitter<KlevuProductOnProductClick>

  click(ev: MouseEvent) {
    const settings = getGlobalSettings()

    const sentEvent = this.productClick.emit({
      product: this.product,
      originalEvent: ev,
    })

    if (sentEvent.defaultPrevented) {
      ev.preventDefault()
      return false
    }

    if (settings?.onProductClick) {
      try {
        const result = settings.onProductClick(this.product, ev)
        if (result === false) {
          ev.preventDefault()
          return false
        }
      } catch (e) {
        console.error(e)
        ev.preventDefault()
        return false
      }
    }
  }

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
        <a href={settings?.generateProductUrl?.(this.product)} onClick={this.click.bind(this)} class="container">
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
            <p class="productname">{this.product.name}</p>
            <p
              class={{
                isOnSale,
                price: true,
              }}
            >
              {renderPrice(this.product.price, this.product.currency)}
            </p>
          </slot>
          {this.addToCart && <div>Add to cart</div>}
        </a>
      </Host>
    )
  }
}
