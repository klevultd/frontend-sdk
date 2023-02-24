import {
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuFetchModifer,
  KlevuFetchQueryResult,
  KlevuKMCRecommendationOptions,
  KlevuListenDomEvent,
  KlevuMerchandisingOptions,
  KlevuQueryResult,
  KlevuSearchOptions,
  KlevuSearchSorting,
  kmcRecommendation,
  listFilters,
  search,
  sendMerchandisingViewEvent,
  sendSearchEvent,
} from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Listen, Method, Prop, Watch } from "@stencil/core"
import { KlevuProductCustomEvent } from "../../components"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick } from "../klevu-product/klevu-product"

export type AllQueryOptions = KlevuMerchandisingOptions | KlevuKMCRecommendationOptions | KlevuSearchOptions

/**
 * __klevu-query__ component is a special kind of component that makes queries to Klevu defined by the
 * __type__ parameter. It also listens to clicks to __klevu-product__ -component and sends analytical data to Klevu
 * based on that. This components gives you ability to create any kind of UI with Klevu components or by using your own
 * components! Just use __klevu-query__ to fetch the data and __klevu-product__ to render the product
 * cards. Whole content of __klevu-product__ can be replaced with your content.
 */
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
   * Should search view event be sent. View event is important for analytical cases.
   * In case of a search this should be used only when creating a landing page for search.
   */
  @Prop() sendSearchViewEvent?: boolean

  /**
   * Object to override and settings on search options
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
   * Which category to do merchandising. Required for "merchandising" type
   */
  @Prop() category?: string

  /**
   * Which category title to have on page. Required for "merchandising" type
   */
  @Prop() categoryTitle?: string

  /**
   * What to search. Required for "search" type.
   */
  @Prop() searchTerm?: string

  /**
   * Which recommendation to fetch from Klevu Merchant Center. Required for "recommendation" type
   */
  @Prop() recommendationId?: string

  /**
   * Manager used for filters
   */
  @Prop() manager: FilterManager = new FilterManager()

  /**
   * Should component listen to changes to filters
   */
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
    await this.#fetch()
  }

  #stopFilterListening?: Function

  @Event({
    composed: true,
  })
  klevuQueryResult!: EventEmitter<{
    result: KlevuQueryResult
    manager: FilterManager
  }>

  async connectedCallback() {
    await KlevuInit.ready()
    await this.#fetch()

    if (this.updateOnFilterChange) {
      this.#stopFilterListening = KlevuListenDomEvent(KlevuDomEvents.FilterSelectionUpdate, async () => {
        await this.#fetch()
      })
    }
  }

  disconnectedCallback() {
    if (this.#stopFilterListening) {
      this.#stopFilterListening()
    }
  }

  @Listen("klevuProductClick", {
    capture: true,
    target: "body",
  })
  onProductClick(event: KlevuProductCustomEvent<KlevuProductOnProductClick>) {
    const product = event.detail.product
    if (!this.#lastResult || !product.id) {
      return
    }

    switch (this.type) {
      case "merchandising":
        if (this.categoryTitle) {
          this.#lastResult.getCategoryMerchandisingClickSendEvent?.()(
            product.id,
            this.categoryTitle,
            product.itemGroupId
          )
        }
        break
      case "recommendation":
        this.#lastResult.getRecommendationClickSendEvent?.()(product.id, product.itemGroupId)
        break
      case "search":
        this.#lastResult.getSearchClickSendEvent?.()(product.id, product.itemGroupId)
        break
      default:
        const e: never = this.type
        throw new Error(e)
    }
  }

  #lastResult?: KlevuFetchQueryResult

  async #fetch() {
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

        if (!resultObject) {
          console.error("KlevuQuery: Response meta", result.apiResponse?.meta)
          throw new Error("KlevuQuery: Couldn't do fetch.")
        }

        this.#lastResult = resultObject
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

        this.#lastResult = resultObject
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

        const modifiers: KlevuFetchModifer[] = []
        if (this.sendSearchViewEvent) {
          modifiers.push(sendSearchEvent())
        }

        const result = await KlevuFetch(search(this.searchTerm, options, ...modifiers))
        const resultObject = result.queriesById("klevuquery")

        if (!resultObject) {
          console.error("KlevuQuery: Response meta", result.apiResponse?.meta)
          throw new Error("KlevuQuery: Couldn't do fetch.")
        }

        this.#lastResult = resultObject
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
