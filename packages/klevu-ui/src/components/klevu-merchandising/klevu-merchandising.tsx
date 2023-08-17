import {
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuFetch,
  KlevuFetchQueryResult,
  KlevuMerchandisingOptions,
  KlevuRecord,
  KlevuResponseQueryObject,
  KlevuSearchSorting,
  listFilters,
  sendMerchandisingViewEvent,
} from "@klevu/core"
import { Component, Element, h, Host, Listen, Prop, State, Watch } from "@stencil/core"
import { parts } from "../../utils/parts"
import {
  KlevuPaginationCustomEvent,
  KlevuProductCustomEvent,
  KlevuSortCustomEvent,
  KlevuUtilViewportCustomEvent,
} from "../../components"

import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import { ViewportSize } from "../klevu-util-viewport/klevu-util-viewport"
import { getTranslation } from "../../utils/getTranslation"

/**
 * Full merchandising app to power up your product grid pages
 */
@Component({
  tag: "klevu-merchandising",
  styleUrl: "klevu-merchandising.css",
  shadow: true,
})
export class KlevuMerchandising {
  /**
   * Should display pagination instead of load next
   */
  @Prop() usePagination?: boolean

  /**
   * Count of products for page
   */
  @Prop() limit: number = 24

  /**
   * Which category products
   */
  @Prop() category!: string

  /**
   * Category title
   */
  @Prop() categoryTitle!: string

  /**
   * Text for load more button
   */
  @Prop() tLoadMore = getTranslation("merchandising.tLoadMore")

  /**
   * Order of results
   */
  @Prop() sort?: KlevuSearchSorting

  /**
   * How many filters per facet to show
   */
  @Prop() filterCount?: number

  /**
   * Object to override and settings on search options
   */
  @Prop() options?: KlevuMerchandisingOptions

  /**
   * Order filters in given order
   */
  @Prop() filterCustomOrder?: { [key: string]: string[] }

  /**
   * Pass custom options for the sort dropdown
   */
  @Prop()
  sortOptions?: Array<{ value: KlevuSearchSorting; text: string }>

  @State() currentViewPortSize?: ViewportSize

  #viewportUtil!: HTMLKlevuUtilViewportElement
  #layoutElement!: HTMLKlevuLayoutResultsElement
  #facetListElement!: HTMLKlevuFacetListElement

  @State() results: Array<KlevuRecord | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]
  @State() manager = new FilterManager()

  @Element() el!: HTMLElement

  #resultObject?: KlevuResponseQueryObject

  async connectedCallback() {
    await KlevuInit.ready()
    await this.#fetchData()
  }

  @Watch("category")
  async watchPropHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.manager.clear()
      await this.#fetchData()
    }
  }

  async #fetchData() {
    const result = await KlevuFetch(
      categoryMerchandising(
        this.category,
        { limit: this.limit, sort: this.sort, ...this.options },
        sendMerchandisingViewEvent(this.categoryTitle),
        listFilters({
          filterManager: this.manager,
          limit: this.filterCount,
          rangeFilterSettings: [
            {
              key: "klevu_price",
              minMax: true,
            },
          ],
        }),
        applyFilterWithManager(this.manager)
      )
    )
    this.#resultObject = result.queriesById("categoryMerchandising")

    this.results = this.#resultObject?.records ?? []
  }

  async #loadMore() {
    if (!this.#resultObject?.getPage) {
      return
    }
    const nextResultObject = await this.#resultObject.getPage()
    this.#resultObject = nextResultObject?.queriesById("categoryMerchandising")
    this.results = [...this.results, ...(this.#resultObject?.records ?? [])]
  }

  async #paginationChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#resultObject?.getPage) {
      return
    }
    const nextResultObject = await this.#resultObject.getPage({ pageIndex: event.detail - 1 })
    this.#resultObject = nextResultObject?.queriesById("categoryMerchandising")
    this.results = this.#resultObject?.records ?? []
  }

  async #sortChanged(event: KlevuSortCustomEvent<KlevuSearchSorting>) {
    this.sort = event.detail
    await this.#fetchData()
  }

  @Listen("productClick")
  productClickHandler(event: KlevuProductCustomEvent<KlevuProductOnProductClick>) {
    if (!event.detail.product.id || !event.detail.product.itemGroupId) {
      return
    }
    if (this.#resultObject?.categoryMerchandisingClickEvent) {
      this.#resultObject?.categoryMerchandisingClickEvent({
        productId: event.detail.product.id,
        variantId: event.detail.product.itemGroupId,
        categoryTitle: this.categoryTitle,
      })
    }
  }

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.#viewportUtil.getCurrentSize()
  }

  #applyFilters() {
    this.#fetchData()
    this.#layoutElement.closeDrawer()
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterManagerFiltersUpdated() {
    if (this.#isMobile()) {
      return
    }
    this.#fetchData()
  }

  /**
   * Rendering function created to put custom content to klevu-product slots. Provides a product being rendered.
   * This function is called for each slot (top, image, info and bottom) of the component. Second parameter provides
   * slot requested. Return null for slots that you do not want to render.
   */
  @Prop() renderProductSlot?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string | null
  #internalRenderProductSlot(product: KlevuRecord | undefined, slot: KlevuProductSlots) {
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

  #isMobile() {
    return this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"
  }

  #mobileDrawerOpened() {
    this.#facetListElement.updateApplyFilterState()
  }

  render() {
    return (
      <Host>
        <klevu-util-viewport
          onSizeChanged={this.#sizeChange.bind(this)}
          ref={(el) => (this.#viewportUtil = el as HTMLKlevuUtilViewportElement)}
        ></klevu-util-viewport>
        <klevu-layout-results
          onDrawerOpened={this.#mobileDrawerOpened.bind(this)}
          ref={(el) => (this.#layoutElement = el as HTMLKlevuLayoutResultsElement)}
        >
          <klevu-facet-list
            ref={(el) => (this.#facetListElement = el as HTMLKlevuFacetListElement)}
            slot="sidebar"
            accordion
            customOrder={this.filterCustomOrder}
            manager={this.manager}
            useApplyButton={this.#isMobile()}
            onKlevuApplyFilters={this.#applyFilters.bind(this)}
          ></klevu-facet-list>
          <div slot="header" class="header">
            <klevu-typography variant="h1">{this.categoryTitle}</klevu-typography>
            <klevu-sort
              variant="inline"
              onKlevuSortChanged={this.#sortChanged.bind(this)}
              options={this.sortOptions}
            ></klevu-sort>
          </div>
          <klevu-product-grid slot="content">
            {this.results.map((p) => (
              <klevu-product product={p} fixedWidth exportparts={parts["klevu-product"]}>
                {this.#internalRenderProductSlot(p, "top")}
                {this.#internalRenderProductSlot(p, "image")}
                {this.#internalRenderProductSlot(p, "info")}
                {this.#internalRenderProductSlot(p, "bottom")}
              </klevu-product>
            ))}
          </klevu-product-grid>
          <div slot="footer" class="footer">
            {this.usePagination && this.#resultObject ? (
              <klevu-pagination
                queryResult={this.#resultObject}
                onKlevuPaginationChange={this.#paginationChange.bind(this)}
              ></klevu-pagination>
            ) : this.#resultObject?.getPage ? (
              <klevu-button onClick={this.#loadMore.bind(this)}>{this.tLoadMore}</klevu-button>
            ) : null}
          </div>
        </klevu-layout-results>
      </Host>
    )
  }
}
