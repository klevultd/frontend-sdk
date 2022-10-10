import { KlevuFetch, KlevuRecord, kmcRecommendation, sendRecommendationViewEvent } from "@klevu/core"
import { Component, Host, h, Prop, State } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProduct } from "../klevu-product/klevu-product"

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
   * The products to display. By default show 5 loading products.
   */
  @State() products: KlevuRecord[] = [undefined, undefined, undefined, undefined, undefined]

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
      product: KlevuRecord
      originalEvent: MouseEvent
    }>
  ) {
    if (this.clickEvent) {
      this.clickEvent(event.detail.product.id, event.detail.product.itemGroupId)
    }
  }

  render() {
    return (
      <Host>
        <klevu-slides>
          {this.products.map((product) => (
            <klevu-product onKlevuProductClick={this.productClick.bind(this)} product={product}></klevu-product>
          ))}
        </klevu-slides>
      </Host>
    )
  }
}
