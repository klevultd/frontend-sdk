import { KlevuRecord } from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core"
import { getGlobalSettings, renderPrice } from "../../utils/utils"

export type KlevuProductOnProductClick = { product: Partial<KlevuRecord>; originalEvent: MouseEvent }
export type KlevuProductVariant = "line" | "small" | "default"
export type KlevuProductSlots = "top" | "image" | "info" | "bottom"

/**
 * Generic product component that renders product based on KlevuRecord of @klevu/core
 * All parts of the component can be replaced with slots.
 *
 * @slot top - Empty are before any product content
 * @slot image - Image region of component
 * @slot info - Swatches, titles, brands and prices slot
 * @slot bottom - Empty are after product content
 *
 * @csspart image - The image element of component
 * @csspart container - The container element of whole
 *
 * @cssprop --klevu-product-width - Width of the product
 * @cssprop --klevu-product-small-width - Width of the product when small variant is used
 * @cssprop --klevu-product-image-aspect-ratio - On what aspect the background image will be
 * @cssprop --klevu-product-image-fill - How to fill image to it's space.
 */
@Component({
  tag: "klevu-product",
  styleUrl: "klevu-product.css",
  shadow: true,
})
export class KlevuProduct {
  /**
   * What variant of product to render
   */
  @Prop() variant: KlevuProductVariant = "default"
  /**
   * Product data
   */
  @Prop() product?: Partial<KlevuRecord>
  /**
   * Do not show swatches in products
   */
  @Prop() hideSwatches?: boolean
  /**
   * Hides price from info
   */
  @Prop() hidePrice?: boolean
  /**
   * Hides description from info
   */
  @Prop() hideDescription?: boolean
  /**
   * Hides name from info
   */
  @Prop() hideName?: boolean
  /**
   * Hides image
   */
  @Prop() hideImage?: boolean
  /**
   * Hides brand information
   */
  @Prop() hideBrand?: boolean
  /**
   * Force certain width for product. Do not use max-width
   */
  @Prop() fixedWidth?: boolean

  @State() hoverImage?: string

  /**
   * When products has been clicked
   */
  @Event({
    composed: true,
    cancelable: true,
  })
  klevuProductClick!: EventEmitter<KlevuProductOnProductClick>

  #click(ev: MouseEvent) {
    const settings = getGlobalSettings()

    if (!this.product) {
      return
    }

    const sentEvent = this.klevuProductClick.emit({
      product: this.product,
      originalEvent: ev,
    })

    if (sentEvent.defaultPrevented) {
      ev.preventDefault()
      return false
    }

    if (settings?.onItemClick) {
      try {
        const result = settings.onItemClick(this.product, ev)
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
    const containerClasses = {
      container: true,
      small: this.variant === "small",
      line: this.variant === "line",
      default: this.variant === "default",
      fixedWidth: Boolean(this.fixedWidth),
    }

    if (!this.product) {
      return (
        <Host>
          <div class={containerClasses}>
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
      const swatchesParts = this.product?.swatchesInfo?.split(" ;;;; ")

      for (const sPart of swatchesParts ?? []) {
        const splitPos = sPart.indexOf(":")
        const key = sPart.substring(0, splitPos)
        const value = sPart.substring(splitPos + 1)
        for (const keyStart of ["variantId", "variantColor", "variantImage", "variantSwatchImage"]) {
          if (key.startsWith(keyStart)) {
            const index = parseInt(key.substring(keyStart.length)) - 1
            if (!swatches[index]) {
              swatches[index] = {}
            }
            // @ts-expect-error
            swatches[index][keyStart.substring("variant".length)] = value
          }
        }
      }
    }

    return (
      <Host>
        <div part="container" class={containerClasses}>
          <slot name="top"></slot>
          <a href={settings?.generateProductUrl?.(this.product)} onClick={this.#click.bind(this)}>
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
            <slot name="info">
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

              <div class="info">
                {this.hideBrand ? null : <p class="brandname">{this.product.brand}</p>}
                {this.hideName ? null : <p class="productname">{this.product.name}</p>}
                {this.hideDescription ? null : <p class="description">{this.product.shortDesc}</p>}
                {this.hidePrice || !this.product.salePrice || !this.product.currency ? null : (
                  <p
                    class={{
                      isOnSale,
                      price: true,
                    }}
                  >
                    {renderPrice(this.product.salePrice, this.product.currency)}
                  </p>
                )}
              </div>
            </slot>
          </a>
          <slot name="bottom"></slot>
        </div>
      </Host>
    )
  }
}
