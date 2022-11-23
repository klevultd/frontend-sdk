import {
  KlevuFetch,
  categoryMerchandising,
  sendMerchandisingViewEvent,
  listFilters,
  applyFilterWithManager,
  KlevuSearchSorting,
  FilterManager,
  KlevuQueryResult,
  search,
  kmcRecommendation,
  KlevuListenDomEvent,
  KlevuDomEvents,
  KlevuMerchandisingOptions,
  KlevuKMCRecommendationOptions,
  KlevuSearchOptions,
} from "@klevu/core"
import { Component, Host, h, Prop, Event, EventEmitter, Method, Watch, Listen } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick } from "../klevu-product/klevu-product"

export type AllQueryOptions = KlevuMerchandisingOptions | KlevuKMCRecommendationOptions | KlevuSearchOptions

@Component({
  tag: "klevu-query",
  shadow: false,
})
export class KlevuQuery {
  /**
   * What kind of query
   */
  @Prop() type!: "search" | "merchandising" | "recommendation"

  /**
   * Overriden
   */
  @Prop() options?: AllQueryOptions

  /**
   * How to sort
   */
  @Prop() sort?: KlevuSearchSorting

  /**
   * What's the limit on page
   */
  @Prop() limit?: number

  /**
   * Offset of results
   */
  @Prop() offset?: number

  /**
   * To how many filters limit results to
   */
  @Prop() filterCount?: number

  /**
   *
   */
  @Prop() category?: string

  /**
   *
   */
  @Prop() categoryTitle?: string

  /**
   *
   */
  @Prop() searchTerm?: string

  /**
   *
   */
  @Prop() recommendationId?: string

  /**
   *
   */
  @Prop() manager: FilterManager = new FilterManager()

  @Prop() updateOnFilterChange?: boolean

  @Watch("manager")
  @Watch("recommendationId")
  @Watch("searchTerm")
  @Watch("categoryTitle")
  @Watch("category")
  @Watch("filterCount")
  @Watch("offset")
  @Watch("limit")
  @Watch("sort")
  @Watch("options")
  @Watch("type")
  onPropertyChange() {
    this.fetchAgain()
  }

  /**
   * Force component to fetch results again
   */
  @Method()
  async fetchAgain() {
    await this.fetch()
  }

  private stopFilterListening?: Function

  @Event({
    composed: true,
  })
  klevuQueryResult!: EventEmitter<{
    result: KlevuQueryResult
    manager: FilterManager
  }>

  async connectedCallback() {
    await KlevuInit.ready()
    await this.fetch()

    if (this.updateOnFilterChange) {
      this.stopFilterListening = KlevuListenDomEvent(KlevuDomEvents.FilterSelectionUpdate, async () => {
        await this.fetch()
      })
    }
  }

  disconnectedCallback() {
    if (this.stopFilterListening) {
      this.stopFilterListening()
    }
  }

  @Listen("klevu-product-click", {
    capture: true,
  })
  onProductClick(event: CustomEvent<KlevuProductOnProductClick>) {
    console.log("hello?")
    const product = event.detail.product
    switch (this.type) {
      case "merchandising":
        if (product.id && this.categoryTitle) {
          this.mercClick?.(product.id, this.categoryTitle, product.itemGroupId)
        }
        break
      case "recommendation":
        break
      case "search":
        break
      default:
        const e: never = this.type
        throw new Error(e)
    }
  }

  private mercClick?: (productId: string, categoryTitle: string, variantId?: string, override?: any) => void

  private async fetch() {
    const options: AllQueryOptions = {
      limit: this.limit,
      sort: this.sort,
      id: "klevuquery",
      offset: this.offset,
      ...this.options,
    }

    switch (this.type) {
      case "merchandising": {
        if (!this.category || !this.categoryTitle) {
          throw new Error("Missing category or category title")
        }

        const result = await KlevuFetch(
          categoryMerchandising(
            this.category,
            options,
            sendMerchandisingViewEvent(this.categoryTitle),
            listFilters({ filterManager: this.manager, limit: this.filterCount }),
            applyFilterWithManager(this.manager)
          )
        )
        const resultObject = result.queriesById("klevuquery")
        this.mercClick = resultObject?.getCategoryMerchandisingClickSendEvent?.()

        if (!resultObject) {
          console.error("KlevuQuery: Response meta", result.apiResponse?.meta)
          throw new Error("KlevuQuery: Couldn't do fetch.")
        }

        this.klevuQueryResult.emit({
          result: resultObject,
          manager: this.manager,
        })
        break
      }
      case "recommendation": {
        if (!this.recommendationId) {
          throw new Error("Recommendation requires KMC id")
        }
        const result = await KlevuFetch(kmcRecommendation(this.recommendationId))
        const resultObject = result.queriesById("klevuquery")

        if (!resultObject) {
          console.error("KlevuQuery: Response meta", result.apiResponse?.meta)
          throw new Error("KlevuQuery: Couldn't do fetch.")
        }

        this.klevuQueryResult.emit({
          result: resultObject,
          manager: this.manager,
        })
        break
      }
      case "search": {
        if (!this.searchTerm) {
          throw new Error("Search query requires search term")
        }
        const result = await KlevuFetch(search(this.searchTerm, options))
        const resultObject = result.queriesById("klevuquery")

        if (!resultObject) {
          console.error("KlevuQuery: Response meta", result.apiResponse?.meta)
          throw new Error("KlevuQuery: Couldn't do fetch.")
        }

        this.klevuQueryResult.emit({
          result: resultObject,
          manager: this.manager,
        })
        break
      }
      default:
        const e: never = this.type
        throw new Error(e)
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
