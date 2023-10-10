import {
  KlevuFetch,
  KlevuRecord,
  KlevuResponseQueryObject,
  kmcRecommendation,
  sendRecommendationViewEvent,
  KlevuFetchFunctionReturnValue,
  KlevuKMCRecommendations,
  KlevuResponseObject,
} from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Listen, Prop, State } from "@stencil/core"

import { KlevuProductCustomEvent, KlevuUtilViewportCustomEvent, ViewportSize } from "../../components"
import { KlevuInit } from "../klevu-init/klevu-init"
import { partsExports } from "../../utils/partsExports"

/**
 * Full recommendation banner solution
 * @slot default - The content of the banner
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
  klevuData!: EventEmitter<KlevuResponseQueryObject>

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

  @State() currentViewPortSize?: ViewportSize
  /**
   * For Static banner in recommendations
   */
  @State() imageDetails?: { url: string; altTag: string }
  #responseObject?: KlevuResponseQueryObject
  #viewportUtil!: HTMLKlevuUtilViewportElement
  #staticContent?: KlevuKMCRecommendations["staticContent"]

  async connectedCallback() {
    await KlevuInit.ready()

    if (!this.recommendationId) {
      throw new Error("recommendationId is required")
    }

    const recommendationPayload = await kmcRecommendation(
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

    const kmcConfig = recommendationPayload.params?.kmcConfig
    if (kmcConfig?.search.recsAction === "STATIC_CONTENT") {
      if (kmcConfig?.staticContent && kmcConfig?.staticContent.length > 0) {
        this.#staticContent = kmcConfig.staticContent
        this.#setCurrentImageDetails()
        // Added to execute the onResult of sendRecommendationViewEvent
        // Need to improve this
        new KlevuResponseObject(
          {
            meta: {
              qTime: 0,
              responseCode: 200,
            },
          },
          [recommendationPayload]
        )
      }
    } else {
      const res = await KlevuFetch(recommendationPayload)
      this.#responseObject = res.queriesById("recommendation")

      if (this.#responseObject) {
        if (this.recommendationTitle === undefined) {
          this.recommendationTitle = this.#responseObject.getQueryParameters()?.kmcConfig?.metadata.title
        }
        this.products = this.#responseObject.records
        this.klevuData.emit(this.#responseObject)
      }
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

  async componentDidLoad() {
    if (this.#viewportUtil) {
      this.currentViewPortSize = await this.#viewportUtil.getCurrentSize()
    }
  }

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
    this.#setCurrentImageDetails()
  }
  #isMobile() {
    return this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"
  }
  #setCurrentImageDetails() {
    if (!this.#staticContent || this.#staticContent.length === 0) {
      return
    }
    let image
    if (this.#isMobile()) {
      image = this.#staticContent[0].image.find((i) => i.resolution === "mobile")
      if (!image) {
        image = this.#staticContent[0].image.find((i) => i.resolution === "desktop")
      }
    } else {
      image = this.#staticContent[0].image.find((i) => i.resolution === "desktop")
    }

    if (!image) {
      return
    }
    this.imageDetails = {
      url: image.url,
      altTag: image.altTag,
    }
  }

  #staticBannerClick() {
    // Need to see how this will get called since we dont have response object
    // if (this.#responseObject?.recommendationClickEvent) {
    //   this.#responseObject.recommendationClickEvent({ productId: this.currentProductId || "" })
    // }
  }

  render() {
    if (this.products.length === 0) {
      return null
    }

    return (
      <Host>
        <slot>
          <klevu-util-viewport
            onKlevuSizeChanged={this.#sizeChange.bind(this)}
            ref={(el) => (this.#viewportUtil = el as HTMLKlevuUtilViewportElement)}
          ></klevu-util-viewport>
          {this.#staticContent && this.#staticContent.length > 0 && this.imageDetails ? (
            <div class={{ staticImage: true, isMobile: this.#isMobile() }}>
              <klevu-banner
                exportparts={partsExports("klevu-banner")}
                onKlevuBannerClick={this.#staticBannerClick.bind(this)}
                altText={this.imageDetails.altTag}
                imageUrl={this.imageDetails.url}
                linkUrl={this.#staticContent[0].targetUrl}
              />
            </div>
          ) : this.products ? (
            <klevu-slides exportparts={partsExports("klevu-slides")} heading={this.recommendationTitle}>
              {this.products.map((product) => (
                <klevu-product
                  exportparts={partsExports("klevu-product")}
                  fixedWidth
                  product={product}
                  style={{
                    "--klevu-product-width": "300px",
                  }}
                ></klevu-product>
              ))}
            </klevu-slides>
          ) : (
            "No details available for Recommendation"
          )}
        </slot>
      </Host>
    )
  }
}
