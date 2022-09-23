import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop, Event, EventEmitter, State } from "@stencil/core"
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
  @Prop() hideSwatches?: boolean
  @Prop() hidePrice?: boolean
  @Prop() hideDescription?: boolean
  @Prop() hideName?: boolean
  @Prop() hideImage?: boolean
  @Prop() hideBrand?: boolean

  @State() hoverImage?: string

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

    const swatches: Array<{
      Id?: string
      Color?: string
      Image?: string
      SwatchImage?: string
    }> = []
    if (!this.hideSwatches) {
      const swatchesParts = this.product.swatchesInfo.split(" ;;;; ")

      for (const sPart of swatchesParts) {
        const splitPos = sPart.indexOf(":")
        const key = sPart.substring(0, splitPos)
        const value = sPart.substring(splitPos + 1)
        for (const keyStart of ["variantId", "variantColor", "variantImage", "variantSwatchImage"]) {
          if (key.startsWith(keyStart)) {
            const index = parseInt(key.substring(keyStart.length)) - 1
            if (!swatches[index]) {
              swatches[index] = {}
            }
            swatches[index][keyStart.substring("variant".length)] = value
          }
        }
      }
    }

    return (
      <Host>
        <a
          href={settings?.generateProductUrl?.(this.product)}
          onClick={this.click.bind(this)}
          class={coantainerClasses}
        >
          {this.hideImage ? null : (
            <slot name="image">
              <div
                class="image"
                part="image"
                style={{
                  backgroundImage: `url(${this.hoverImage || this.product.image})`,
                }}
              ></div>
            </slot>
          )}
          {!this.hideSwatches && swatches.length > 1 ? (
            <div class="swatches" onMouseLeave={() => (this.hoverImage = undefined)}>
              {swatches.map((swatch) => (
                <div
                  style={{
                    backgroundColor: swatch.Color,
                    backgroundImage: `url(${swatch.SwatchImage || swatch.Image})`,
                  }}
                  onMouseEnter={() => (this.hoverImage = swatch.Image)}
                ></div>
              ))}
            </div>
          ) : null}
          <div class="info" slot="info">
            {this.hideBrand ? null : <p class="brandname">{this.product.brand}</p>}
            {this.hideName ? null : <p class="productname">{this.product.name}</p>}
            {this.hideDescription ? null : <p class="description">{this.product.shortDesc}</p>}
            {this.hidePrice ? null : (
              <p
                class={{
                  isOnSale,
                  price: true,
                }}
              >
                {renderPrice(this.product.price, this.product.currency)}
              </p>
            )}
          </div>
        </a>
      </Host>
    )
  }
}