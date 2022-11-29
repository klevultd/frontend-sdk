import { KlevuFetch, KlevuRecord, kmcRecommendation, sendRecommendationViewEvent } from "@klevu/core"
import { Component, h, Host, Prop, State } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductSlots } from "../klevu-product/klevu-product"

/**
 * Full recommendation banner solution
 */
@Component({
  tag: "klevu-recommendations",
  styleUrl: "klevu-recommendations.css",
  shadow: true,
})
export class KlevuRecommendations {
  /**
   * Title of the recommendation
   */
  @Prop() recommendationTitle!: string
  /**
   * The ID of the recommendation
   */
  @Prop() recommendationId!: string

  /**
   * For cart recommendation you need to provide product id's in cart
   */
  @Prop() cartProductIds?: string[]

  /**
   * For category product recommendation you need to provide categery path
   */
  @Prop() categoryPath?: string

  /**
   * For similiar products recommendation you need to provide productId and itemGroupId
   */
  @Prop() currentProductId?: string

  /**
   * For similiar products recommendation you need to provide productId and itemGroupId
   */
  @Prop() itemGroupId?: string

  /**
   * The products to display
   */
  @State() products: Array<KlevuRecord> = []

  @State() clickEvent?: (productId: string, variantId?: string) => void

  /**
   * Rendering function created to put custom content to klevu-product slots. Provides a product being rendered.
   * This function is called for each slot (top, image, info and bottom) of the component. Second parameter provides
   * slot requested. Return null for slots that you do not want to render.
   */
  @Prop() renderProductSlot?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string | null
  private internalRenderProductSlot(product: KlevuRecord | undefined, slot: KlevuProductSlots) {
    if (!this.renderProductSlot || !product) {
      return null
    }

    const content = this.renderProductSlot(product, slot)

    if (content === null) {
      return null
    }

    if (typeof content === "string") {
      return <div slot={slot} innerHTML={content}></div>
    }

    return (
      <div
        slot={slot}
        ref={(el) => {
          if (!el) {
            return
          }
          el.innerHTML = ""
          el.appendChild(content)
        }}
      ></div>
    )
  }

  async connectedCallback() {
    await KlevuInit.ready()

    if (!this.recommendationId) {
      throw new Error("recommendationId is required")
    }

    const res = await KlevuFetch(
      kmcRecommendation(
        this.recommendationId,
        {
          id: "recommendation",
          cartProductIds: this.cartProductIds,
          categoryPath: this.categoryPath,
          currentProductId: this.currentProductId,
          itemGroupId: this.itemGroupId,
        },
        sendRecommendationViewEvent(this.recommendationTitle)
      )
    )

    const resultObject = res.queriesById("recommendation")
    if (resultObject) {
      this.products = resultObject.records
      if (resultObject.getRecommendationClickSendEvent) {
        this.clickEvent = resultObject.getRecommendationClickSendEvent()
      }
    }
  }

  productClick(
    event: CustomEvent<{
      product: Partial<KlevuRecord>
      originalEvent: MouseEvent
    }>
  ) {
    if (this.clickEvent && event.detail.product.id) {
      this.clickEvent(event.detail.product.id, event.detail.product.itemGroupId || event.detail.product.id)
    }
  }

  render() {
    if (this.products.length === 0) {
      return null
    }

    return (
      <Host>
        <klevu-slides>
          {this.products.map((product) => (
            <klevu-product fixedWidth onKlevuProductClick={this.productClick.bind(this)} product={product}>
              {this.internalRenderProductSlot(product, "top")}
              {this.internalRenderProductSlot(product, "image")}
              {this.internalRenderProductSlot(product, "info")}
              {this.internalRenderProductSlot(product, "bottom")}
            </klevu-product>
          ))}
        </klevu-slides>
      </Host>
    )
  }
}
