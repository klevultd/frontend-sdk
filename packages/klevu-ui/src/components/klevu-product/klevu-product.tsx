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
 * By default the products fill the whole space, but it can be limited
 * with --kleu-product-width and --klevu-product-small-width css variables.
 *
 * @slot top - Empty are before any product content
 * @slot image - Image region of component
 * @slot info - Swatches, titles, brands and prices slot
 * @slot bottom - Empty are after product content
 *
 * @csspart product-image - The image element of component
 * @csspart product-container - The container element of whole
 * @csspart product-swatch - Single swatch element under the image
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

  /**
   * What key to use for brand value
   */
  @Prop() keyBrand = "brand"

  /**
   * What key to use for name value
   */
  @Prop() keyName = "name"

  /**
   * What key to use for description value
   */
  @Prop() keyDescription = "shortDesc"

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
    const typeClasses = {
      small: this.variant === "small",
      line: this.variant === "line",
      default: this.variant === "default",
    }
    const containerClasses: any = {
      container: true,
      fixedWidth: Boolean(this.fixedWidth),
      ...typeClasses,
    }

    if (!this.product) {
      return (
        <Host class={{ ...typeClasses, loading: true }}>
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

    return (
      <Host class={{ line: this.variant === "line" }}>
        <div part="product-container" class={containerClasses}>
          <slot name="top"></slot>
          <a href={settings?.generateProductUrl?.(this.product)} onClick={this.#click.bind(this)}>
            {this.hideImage ? null : (
              <slot name="image">
                {this.product?.image || this.hoverImage ? (
                  <div
                    class="image"
                    part="product-image"
                    style={{
                      backgroundImage: `url(${this.hoverImage || this.product.image})`,
                    }}
                  ></div>
                ) : (
                  <div class="image no-image" part="product-image">
                    <klevu-icon name="image_not_supported"></klevu-icon>
                  </div>
                )}
              </slot>
            )}
            <slot name="info">
              {this.#renderSwatch()}
              <div class="info">
                {this.hideBrand || !this.product[this.keyBrand] ? null : (
                  <klevu-typography class="brandname" variant="body-s-bold">
                    {this.product[this.keyBrand]}
                  </klevu-typography>
                )}
                {this.hideName || !this.product[this.keyName] ? null : (
                  <klevu-typography class="productname" variant="body-s">
                    {this.product[this.keyName]}
                  </klevu-typography>
                )}
                {this.hideDescription || !this.product[this.keyDescription] ? null : (
                  <klevu-typography class="description" variant="body-xs">
                    {this.product[this.keyDescription].substring(0, 100)}
                  </klevu-typography>
                )}
                {this.hidePrice || !this.product.salePrice || !this.product.currency ? null : (
                  <klevu-typography
                    variant="body-l-bold"
                    class={{
                      isOnSale,
                      price: true,
                    }}
                  >
                    {renderPrice(this.product.salePrice, this.product.currency)}
                  </klevu-typography>
                )}
              </div>
            </slot>
          </a>
          <slot name="bottom"></slot>
        </div>
      </Host>
    )
  }

  #renderSwatch() {
    if (this.hideSwatches) {
      return null
    }

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

    if (swatches.length === 0) {
      return null
    }

    return (
      <div class="swatches" onMouseLeave={() => (this.hoverImage = undefined)}>
        {swatches.map((swatch) => (
          <div
            part="product-swatch"
            style={{
              backgroundColor: swatch.Color
                ? CSS.supports("color", swatch.Color)
                  ? swatch.Color
                  : "lightgray"
                : "lightgray",
              backgroundImage:
                swatch.SwatchImage || swatch.Image ? `url(${swatch.SwatchImage || swatch.Image})` : undefined,
            }}
            onMouseEnter={() => (this.hoverImage = swatch.Image)}
          ></div>
        ))}
      </div>
    )
  }
}
