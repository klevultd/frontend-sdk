import { KlevuRecord } from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Prop, State, Fragment, Element } from "@stencil/core"
import { KlevuUIGlobalSettings, closestElement } from "../../utils/utils"
import { getKMCSettings } from "../../utils/getKMCSettings"
import { getTranslation } from "../../utils/getTranslation"
import { KlevuInit } from "../klevu-init/klevu-init"
import { partsExports } from "../../utils/partsExports"

export type KlevuProductOnProductClick = { product: Partial<KlevuRecord>; originalEvent: MouseEvent }
export type KlevuProductAddToCart = { product: Partial<KlevuRecord> }
export type KlevuProductVariant = "line" | "small" | "default"
export type KlevuProductSlots = "top" | "image" | "info" | "bottom"

/**
 * Generic product component that renders product based on KlevuRecord of klevu/core
 * All parts of the component can be replaced with slots.
 *
 * By default the products fill the whole space, but it can be limited
 * with --klevu-product-width and --klevu-product-small-width css variables.
 *
 * @slot top - Empty are before any product content
 * @slot image - Image region of component
 * @slot info - Swatches, titles, brands and prices slot
 * @slot bottom - Empty are after product content
 * @slot addtocart - Add to cart button slot at the end of the component
 *
 * @csspart product-image The image element of component
 * @csspart product-base The container element of whole
 * @csspart product-swatch Single swatch element under the image
 * @csspart product-brandname The brand name of the product
 * @csspart product-name The name of the product
 * @csspart product-description The description of the product
 * @csspart product-price The price of the product
 * @csspart product-vatcaption The vat caption of the product
 * @csspart product-ooscaption The out of stock caption of the product
 * @csspart product-variants-count The number of variants
 * @csspart product-addtocart The add to cart button
 */
@Component({
  tag: "klevu-product",
  styleUrl: "klevu-product.css",
  shadow: true,
})
export class KlevuProduct {
  @Element() el!: HTMLElement

  /**
   * What variant of product to render
   */
  @Prop() variant: KlevuProductVariant = "default"
  /**
   * Product data
   */
  @Prop() product?: Partial<KlevuRecord>

  /**
   * Show add to cart button
   */
  @Prop() showAddToCart?: boolean

  /**
   * Show ratings
   */
  @Prop() showRatings?: boolean

  /**
   * Show ratings
   */
  @Prop() showRatingsCount?: boolean

  /**
   * Text for add to cart button
   */
  @Prop() tAddToCart?: string

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
   * When mousing over product, show hover image if available
   */
  @Prop() hideHoverImage?: boolean

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

  /**
   * Text to be added after the price. Usually used to indicate that does the price include VAT or not.
   */
  @Prop() vatCaption?: string

  /**
   * To show the product code next to product name.
   */
  @Prop() showProductCode?: boolean
  /**
   * Caption to show if product is out of stock
   */
  @Prop() outOfStockCaption?: string
  /**
   * Fallback image url to be used when the product image fails to load.
   */
  @Prop() fallbackProductImageUrl?: string
  /**
   * Turns the component into a product wrapper that handles events
   * automatically. It assumes that whole product is clickable.
   *
   * Component has only one main slot that can contain any content.
   *
   * To prevent product clicking use `event.stopPropagation()` in your
   * events.
   *
   * Component still requires the product parameter as it's data is used
   * send correct data to Klevu analytics
   */
  @Prop() isWrapper?: boolean
  /**
   * Show variants count
   */
  @Prop() showVariantsCount = false

  @State() hoverImage?: string

  /**
   * When products has been clicked
   */
  @Event({
    composed: true,
    cancelable: true,
  })
  klevuProductClick!: EventEmitter<KlevuProductOnProductClick>

  /**
   * When the product add to cart is clicked
   */
  @Event({
    composed: true,
    cancelable: true,
  })
  klevuAddToCart!: EventEmitter<KlevuProductAddToCart>

  @State()
  settings?: KlevuUIGlobalSettings

  async connectedCallback() {
    await KlevuInit.ready()
    const init = closestElement<HTMLKlevuInitElement>("klevu-init", this.el)

    if (!init) {
      console.error("klevu-product needs to be wrapped inside klevu-init")
      return
    }

    this.settings = init?.settings

    init?.addEventListener("klevuInitSettingsUpdated", (e: any) => {
      this.settings = e.detail
    })

    const kmcSettings = getKMCSettings()
    if (kmcSettings) {
      if (this.tAddToCart === undefined) {
        this.tAddToCart = kmcSettings.klevu_uc_userOptions.addToCartButton ?? getTranslation("product.tAddToCart")
      }
      if (this.showAddToCart === undefined) {
        this.showAddToCart = kmcSettings.klevu_addToCartEnabled
      }
      if (this.hideHoverImage === undefined) {
        this.hideHoverImage = !Boolean(kmcSettings.klevu_uc_userOptions.showRolloverImage)
      }
      if (this.hideSwatches === undefined) {
        this.hideSwatches = !Boolean(kmcSettings.klevu_uc_userOptions.showProductSwatches)
      }

      if (this.vatCaption === undefined) {
        this.vatCaption = kmcSettings.klevu_uc_userOptions.vatCaption
      }

      if (this.showProductCode === undefined) {
        this.showProductCode = kmcSettings.klevu_showProductCode
      }
      if (this.fallbackProductImageUrl === undefined) {
        this.fallbackProductImageUrl = kmcSettings.klevu_uc_userOptions.noImageUrl
      }
      if (this.outOfStockCaption === undefined) {
        this.outOfStockCaption = kmcSettings.klevu_uc_userOptions.outOfStockCaption
      }
    }
  }

  #formatSKU(sku?: string) {
    if (!sku) {
      return ""
    }
    let formattedSKU = sku.toUpperCase()
    if (sku.includes(";;;;")) {
      formattedSKU = formattedSKU.split(";;;;")[0]
    }
    if (formattedSKU.startsWith("(") && formattedSKU.endsWith(")")) {
      return formattedSKU
    } else {
      return "(" + formattedSKU + ")"
    }
  }

  #click(ev: MouseEvent) {
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

    if (this.settings?.onItemClick) {
      try {
        const result = this.settings.onItemClick(this.product, ev)
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

  #addToCart(event: Event) {
    event.stopPropagation()
    event.preventDefault()
    if (!this.product) {
      return
    }
    this.klevuAddToCart.emit({ product: this.product })
  }

  render() {
    if (this.isWrapper) {
      return (
        <Host>
          <div onClick={this.#click.bind(this)}>
            <slot></slot>
          </div>
        </Host>
      )
    }

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

    const isOnSale = this.product.price != this.product.salePrice

    return (
      <Host class={{ line: this.variant === "line" }}>
        <div part="product-base" class={containerClasses}>
          <slot name="top"></slot>
          <a href={this.settings?.generateProductUrl?.(this.product)} onClick={this.#click.bind(this)}>
            {this.hideImage ? null : (
              <slot name="image">
                {this.product?.image || this.hoverImage ? (
                  this.#renderImage()
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
                  <klevu-typography class="brandname" variant="body-s-bold" part="product-brandname">
                    {this.product[this.keyBrand]}
                  </klevu-typography>
                )}
                {this.hideName || !this.product[this.keyName] ? null : (
                  <klevu-typography
                    class="productname"
                    variant="body-s"
                    part="product-name"
                    title={`${this.product[this.keyName]} ${
                      this.showProductCode ? this.#formatSKU(this.product.sku) : ""
                    }`}
                  >
                    {`${this.product[this.keyName]} ${this.showProductCode ? this.#formatSKU(this.product.sku) : ""}`}
                  </klevu-typography>
                )}
                {this.hideDescription || !this.product[this.keyDescription] ? null : (
                  <klevu-typography class="description" variant="body-xs" part="product-description">
                    {this.product[this.keyDescription].substring(0, 100)}
                  </klevu-typography>
                )}
                {this.hidePrice ||
                !this.product.salePrice ||
                !this.product.currency ||
                this.product.inStock === "no" ? null : (
                  <Fragment>
                    <klevu-typography
                      variant="body-l-bold"
                      class={{
                        isOnSale,
                        price: true,
                      }}
                      part="product-price"
                    >
                      {this.settings?.renderPrice?.(this.product.salePrice, this.product.currency) ??
                        this.product.salePrice}
                    </klevu-typography>
                    {this.vatCaption && (
                      <klevu-typography class="vatcaption" variant="body-s" part="product-vatcaption">
                        ({this.vatCaption})
                      </klevu-typography>
                    )}
                  </Fragment>
                )}
                {this.product.inStock === "no" && this.outOfStockCaption && (
                  <klevu-typography class="outOfStockCaption" variant="body-s" part="product-ooscaption">
                    {this.outOfStockCaption}
                  </klevu-typography>
                )}
              </div>
            </slot>
            {this.showVariantsCount && this.product.totalVariants !== undefined && this.variant !== "line" && (
              <slot name="variantsCount">
                <klevu-typography
                  variant="body-s"
                  part="product-variants-count"
                >{`+${this.product.totalVariants} variant(s)`}</klevu-typography>
              </slot>
            )}
            {this.variant !== "line" && <slot name="ratings">{this.#renderRatings()}</slot>}

            <slot name="addtocart">
              <div class="addToCart">
                {this.showAddToCart ? (
                  <klevu-button
                    part="product-addtocart"
                    onClick={this.#addToCart.bind(this)}
                    fullWidth
                    size={this.variant === "small" ? "small" : "normal"}
                    exportparts={partsExports("klevu-button")}
                  >
                    {this.tAddToCart}
                  </klevu-button>
                ) : null}
              </div>
            </slot>
          </a>
          <slot name="bottom"></slot>
          {this.showVariantsCount && this.product.totalVariants !== undefined && this.variant === "line" && (
            <slot name="variantsCount">
              <klevu-typography
                variant="body-s"
                part="product-variants-count"
              >{`+${this.product.totalVariants} variant(s)`}</klevu-typography>
            </slot>
          )}
          {this.variant === "line" && <slot name="ratings">{this.#renderRatings()}</slot>}
        </div>
      </Host>
    )
  }

  #renderImage() {
    let imageUrl = this.product?.image || this.hoverImage

    if (!imageUrl) {
      return null
    }

    let fallback = ""
    if (this.fallbackProductImageUrl) {
      fallback = `, url(${this.fallbackProductImageUrl})`
    }

    return (
      <div
        class="image"
        part="product-image"
        style={{
          backgroundImage: `url(${imageUrl}), url(${imageUrl.replace("needtochange/", "")}), url(${imageUrl.replace(
            "needtochange/",
            "pub/"
          )})${fallback}`,
        }}
      >
        {this.hideHoverImage !== true && this.product?.imageHover ? (
          <div
            class="hover"
            style={{
              backgroundImage: `url(${this.product.imageHover})${fallback}`,
            }}
          ></div>
        ) : null}
      </div>
    )
  }

  #renderRatings() {
    if (!this.showRatings || !this.product?.rating) {
      return null
    }
    return (
      this.showRatings && (
        <div class="ratings">
          {this.product?.rating ? (
            <Fragment>
              <klevu-rating exportparts={partsExports("klevu-rating")} rating={this.product.rating} />
              {this.showRatingsCount && this.product.ratingCount && <span>({this.product.ratingCount})</span>}
            </Fragment>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      )
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
