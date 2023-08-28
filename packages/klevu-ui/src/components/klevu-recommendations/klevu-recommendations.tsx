import {
  KlevuFetch,
  KlevuRecord,
  KlevuResponseQueryObject,
  kmcRecommendation,
  sendRecommendationViewEvent,
  KlevuFetchFunctionReturnValue,
} from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Listen, Prop, State } from "@stencil/core"

import { KlevuProductCustomEvent } from "../../components"
import { KlevuInit } from "../klevu-init/klevu-init"
import { parts } from "../../utils/parts"
import { getKMCSettings } from "../../utils/getKMCSettings"

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
   * When Recommndations data is available or updated
   */
  @Event({
    composed: true,
    cancelable: true,
  })
  data!: EventEmitter<KlevuResponseQueryObject>

  /**
   * Title of the recommendation
   */
  @Prop() recommendationTitle?: string
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
  @State() products: Array<KlevuRecord> = [undefined, undefined, undefined, undefined, undefined, undefined] as any

  #responseObject?: KlevuResponseQueryObject

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

    this.#responseObject = res.queriesById("recommendation")
    if (this.#responseObject) {
      if (this.recommendationTitle === undefined) {
        this.recommendationTitle = this.#responseObject.getQueryParameters()?.kmcConfig?.metadata.title
      }
      this.products = this.#responseObject.records
      this.data.emit(this.#responseObject)
    }
  }

  @Listen("klevuProductClick")
  productClick(
    event: KlevuProductCustomEvent<{
      product: Partial<KlevuRecord>
      originalEvent: MouseEvent
    }>
  ) {
    if (this.#responseObject?.recommendationClickEvent && event.detail.product.id) {
      this.#responseObject?.recommendationClickEvent({
        productId: event.detail.product.id,
        variantId: event.detail.product.itemGroupId || event.detail.product.id,
      })
    }
  }

  render() {
    if (this.products.length === 0) {
      return null
    }

    return (
      <Host>
        <klevu-slides heading={this.recommendationTitle}>
          <slot>
            {this.products.map((product) => (
              <klevu-product
                exportparts={parts["klevu-product"]}
                fixedWidth
                product={product}
                style={{
                  "--klevu-product-width": "300px",
                }}
              ></klevu-product>
            ))}
          </slot>
        </klevu-slides>
      </Host>
    )
  }
}
