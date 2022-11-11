import { KlevuFetch, KlevuRecord, kmcRecommendation, sendRecommendationViewEvent } from "@klevu/core"
import { Component, Host, h, Prop, State } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"

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
            <klevu-product
              fixedWidth
              onKlevuProductClick={this.productClick.bind(this)}
              product={product}
            ></klevu-product>
          ))}
        </klevu-slides>
      </Host>
    )
  }
}
