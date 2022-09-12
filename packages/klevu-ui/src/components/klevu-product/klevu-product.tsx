import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"
import { getGlobalSettings, renderPrice } from "../../utils/utils"

export type KlevuProductOnProductClick = { product: KlevuRecord; originalEvent: MouseEvent }
export type KlevuProductVariant = "line" | "small" | "default"

@Component({
  tag: "klevu-product",
  styleUrl: "klevu-product.css",
  shadow: true,
})
export class KlevuProduct {
  @Prop() variant: KlevuProductVariant = "default"
  @Prop() product?: KlevuRecord
  @Event({
    composed: true,
    cancelable: true,
  })
  klevuProductClick: EventEmitter<KlevuProductOnProductClick>

  click(ev: MouseEvent) {
    const settings = getGlobalSettings()

    const sentEvent = this.klevuProductClick.emit({
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
    const coantainerClasses = {
      container: true,
      small: this.variant === "small",
      line: this.variant === "line",
      default: this.variant === "default",
    }

    if (!this.product) {
      return (
        <Host>
          <div class={coantainerClasses}>
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
          onClick={this.click.bind(this)}
          class={coantainerClasses}
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
          <div class="info" slot="info">
            <p class="productname">{this.product.name}</p>
            <p class="description">{this.product.shortDesc}</p>
            <p
              class={{
                isOnSale,
                price: true,
              }}
            >
              {renderPrice(this.product.price, this.product.currency)}
            </p>
          </div>
        </a>
      </Host>
    )
  }
}
