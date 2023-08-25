import {
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuDomEvents,
  KlevuFetch,
  KlevuFetchModifer,
  KlevuKMCRecommendationOptions,
  KlevuListenDomEvent,
  KlevuMerchandisingOptions,
  KlevuQueryResult,
  KlevuResponseQueryObject,
  KlevuSearchOptions,
  KlevuSearchSorting,
  KlevuSuggestionResult,
  kmcRecommendation,
  listFilters,
  search,
  sendMerchandisingViewEvent,
  sendSearchEvent,
  suggestions,
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
   * By default component will fetch results on init or on property change. This can be disabled with this prop.
   */
  @Prop() disableInitialFetch?: boolean

  /**
   * When searching should search suggestions be fetched
   */
  @Prop() searchSuggestions?: boolean

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
   * Fetch filters on the request
   */
  @Prop() filterGet?: boolean

  /**
   * To how many filters limit results to
   */
  @Prop() filterCount?: number

  /**
   * Should get price filters
   */
  @Prop() filterWithPrices?: boolean

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
   * Which products are in cart. Required for some recommendation types
   */
  @Prop() recommendationCartProductIds?: string[]

  /**
   * Which product is currently being viewed. Required for some recommendation types
   */
  @Prop() recommendationCurrentProductId?: string

  /**
   * What is the item group id of the product being viewed. Required for some recommendation types
   */
  @Prop() recommendationItemGroupId?: string

  /**
   * Which category path to use for recommendation. Required for some recommendation types
   */
  @Prop() recommendationCategoryPath?: string

  /**
   * @klevu/core FilterManager used for filters. If none is set, new one is created
   */
  @Prop() manager: FilterManager = new FilterManager()

  /**
   * Should component listen to changes to filters
   */
  @Prop() updateOnFilterChange?: boolean

  /**
   * Override default modifiers. This will disable default modifiers and ones set by filter props
   */
  @Prop() overrideModifiers?: KlevuFetchModifer[]

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
    this.fetch()
  }

  /**
   * Force component to fetch results. This is called automatically when properties change.
   */
  @Method()
  async fetch() {
    await this.#fetch()
  }

  #stopFilterListening?: Function

  @Event({
    composed: true,
  })
  klevuQueryResult!: EventEmitter<{
    result: KlevuQueryResult
    suggestions?: KlevuSuggestionResult
    manager: FilterManager
  }>

  async connectedCallback() {
    await KlevuInit.ready()

    if (!this.disableInitialFetch) {
      await this.#fetch()
    }

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
          this.#lastResult.categoryMerchandisingClickEvent?.({
            productId: product.id,
            categoryTitle: this.categoryTitle,
            variantId: product.itemGroupId,
          })
        }
        break
      case "recommendation":
        this.#lastResult.recommendationClickEvent?.({ productId: product.id, variantId: product.itemGroupId })
        break
      case "search":
        this.#lastResult.searchClickEvent?.({ productId: product.id, variantId: product.itemGroupId })
        break
      default:
        const e: never = this.type
        throw new Error(e)
    }
  }

  #lastResult?: KlevuResponseQueryObject

  async #fetch() {
    const options: AllQueryOptions = {
      limit: this.limit,
      sort: this.sort,
      id: "klevuquery",
      offset: this.offset,
      ...this.options,
    }

    const modifiers: KlevuFetchModifer[] = []

    if (this.filterGet) {
      modifiers.push(
        listFilters({
          filterManager: this.manager,
          limit: this.filterCount,
          rangeFilterSettings: this.filterWithPrices
            ? [
                {
                  key: "klevu_price",
                  minMax: true,
                },
              ]
            : undefined,
        })
      )
      modifiers.push(applyFilterWithManager(this.manager))
    }

    switch (this.type) {
      case "merchandising": {
        if (!this.category || !this.categoryTitle) {
          throw new Error("Missing category or category title")
        }

        if (this.sendSearchViewEvent) {
          modifiers.push(sendMerchandisingViewEvent(this.categoryTitle))
        }

        const usedModifiers = this.overrideModifiers || modifiers
        const result = await KlevuFetch(categoryMerchandising(this.category, options, ...usedModifiers))
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
        const usedModifiers = this.overrideModifiers || modifiers
        const result = await KlevuFetch(
          kmcRecommendation(
            this.recommendationId,
            {
              cartProductIds: this.recommendationCartProductIds,
              categoryPath: this.recommendationCategoryPath,
              currentProductId: this.recommendationCurrentProductId,
              itemGroupId: this.recommendationItemGroupId,
            },
            ...usedModifiers
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
      case "search": {
        if (!this.searchTerm) {
          throw new Error("Search query requires search term")
        }

        if (this.sendSearchViewEvent) {
          modifiers.push(sendSearchEvent())
        }

        const usedModifiers = this.overrideModifiers || modifiers
        const queries = [search(this.searchTerm, options, ...usedModifiers)]

        if (this.searchSuggestions) {
          queries.push(suggestions(this.searchTerm))
        }

        const result = await KlevuFetch(...queries)
        const resultObject = result.queriesById("klevuquery")
        const suggestionsResult = result.suggestionsById("suggestions")

        if (!resultObject) {
          console.error("KlevuQuery: Response meta", result.apiResponse?.meta)
          throw new Error("KlevuQuery: Couldn't do fetch.")
        }

        this.#lastResult = resultObject
        this.klevuQueryResult.emit({
          result: resultObject,
          manager: this.manager,
          suggestions: suggestionsResult,
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
