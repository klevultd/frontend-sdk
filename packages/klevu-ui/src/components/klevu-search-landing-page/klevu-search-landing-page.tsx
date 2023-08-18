import {
  applyFilterWithManager,
  FilterManager,
  KlevuFetch,
  KlevuRecord,
  KlevuResponseQueryObject,
  KlevuSearchSorting,
  listFilters,
  search,
  sendSearchEvent,
} from "@klevu/core"
import { Component, h, Host, Listen, Prop, State, Watch, Event, EventEmitter } from "@stencil/core"
import { parts } from "../../utils/parts"
import {
  KlevuPaginationCustomEvent,
  KlevuProductCustomEvent,
  KlevuSortCustomEvent,
  KlevuUtilViewportCustomEvent,
  ViewportSize,
} from "../../components"

import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import { getTranslation } from "../../utils/getTranslation"
import { stringConcat } from "../../utils/stringConcat"

/**
 * Full app component for search landing page
 *
 * @slot header - Header container
 * @slot footer - Footer container
 * @slot content - Product grid items including the grid container
 * @slot facets - Sidebar of facets content
 */
@Component({
  tag: "klevu-search-landing-page",
  styleUrl: "klevu-search-landing-page.css",
  shadow: true,
})
export class KlevuSearchLandingPage {
  /**
   * How many results to display on a page
   */
  @Prop() limit: number = 24
  /**
   * What term was used for search
   */
  @Prop() term!: string
  /**
   * In which order to set the products
   */
  @Prop() sort?: KlevuSearchSorting
  /**
   * How many products to display in filters
   */
  @Prop() filterCount?: number
  /**
   * Order filters in a customer order
   */
  @Prop() filterCustomOrder?: { [key: string]: string[] }

  /**
   * Use pagination instead of loading more
   */
  @Prop() usePagination?: boolean

  /**
   * The title of the page
   */
  @Prop() tSearchTitle = getTranslation("searchLandingPage.tSearchTitle")

  /**
   * Text of load more button
   */
  @Prop() tLoadMore = getTranslation("searchLandingPage.tLoadMore")

  @State() results: Array<KlevuRecord> = []
  @State() manager = new FilterManager()
  @State() currentViewPortSize?: ViewportSize

  #resultObject?: KlevuResponseQueryObject

  #viewportUtil!: HTMLKlevuUtilViewportElement
  #layoutElement!: HTMLKlevuLayoutResultsElement
  #facetListElement!: HTMLKlevuFacetListElement

  async connectedCallback() {
    await KlevuInit.ready()
    await this.#fetchData()
  }

  @Watch("term")
  termChanged(oldValue: string, newValue: string) {
    this.#fetchData()
  }

  async #fetchData() {
    const result = await KlevuFetch(
      search(
        this.term,
        { limit: this.limit, sort: this.sort },
        sendSearchEvent(),
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
    this.#resultObject = result.queriesById("search")
    this.results = this.#resultObject?.records ?? []
    this.#emitChanges()
  }

  async loadMore() {
    if (!this.#resultObject?.getPage) {
      return
    }
    const nextResultObject = await this.#resultObject.getPage()
    this.#resultObject = nextResultObject?.queriesById("search")
    this.results = [...this.results, ...(this.#resultObject?.records ?? [])]
    this.#emitChanges()
  }

  async paginationChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#resultObject?.getPage) {
      return
    }
    const nextResultObject = await this.#resultObject.getPage({ pageIndex: event.detail - 1 })
    this.#resultObject = nextResultObject?.queriesById("search")
    this.results = this.#resultObject?.records ?? []
    this.#emitChanges()
  }

  @Listen("productClick")
  productClickHandler(event: KlevuProductCustomEvent<KlevuProductOnProductClick>) {
    if (this.#resultObject?.searchClickEvent && event.detail.product.id) {
      this.#resultObject.searchClickEvent({
        productId: event.detail.product.id,
        variantId: event.detail.product.itemGroupId || event.detail.product.id,
      })
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
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

  @Event({
    composed: true,
  })
  data!: EventEmitter<{ resultObject: KlevuResponseQueryObject; records: KlevuRecord[]; manager: FilterManager }>

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  #emitChanges() {
    if (!this.#resultObject) {
      return
    }
    this.data.emit({
      resultObject: this.#resultObject,
      records: this.results,
      manager: this.manager,
    })
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.#viewportUtil.getCurrentSize()
  }

  async #sortChanged(event: KlevuSortCustomEvent<KlevuSearchSorting>) {
    this.sort = event.detail
    await this.#fetchData()
  }

  #applyFilters() {
    this.#fetchData()
    this.#layoutElement.closeDrawer()
  }

  #isMobile() {
    return this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"
  }

  #mobileDrawerOpened() {
    this.#facetListElement.updateApplyFilterState()
  }

  render() {
    const isMobile = this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"

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
          <slot name="facets" slot="sidebar">
            <klevu-facet-list
              ref={(el) => (this.#facetListElement = el as HTMLKlevuFacetListElement)}
              customOrder={this.filterCustomOrder}
              manager={this.manager}
              useApplyButton={isMobile}
              onKlevuApplyFilters={this.#applyFilters.bind(this)}
            ></klevu-facet-list>
          </slot>
          <div slot="header" class="header">
            <klevu-typography slot="header" variant="h1">
              {stringConcat(this.tSearchTitle, [this.term])}
            </klevu-typography>
            <klevu-sort variant="inline" onKlevuSortChanged={this.#sortChanged.bind(this)}></klevu-sort>
          </div>
          <slot name="content" slot="content">
            <klevu-product-grid slot="content">
              {this.results?.map((p) => (
                <klevu-product product={p} fixedWidth exportparts={parts["klevu-product"]}></klevu-product>
              ))}
            </klevu-product-grid>
          </slot>
          <div slot="footer" class="footer">
            {this.usePagination && this.#resultObject ? (
              <klevu-pagination
                queryResult={this.#resultObject}
                onKlevuPaginationChange={this.paginationChange.bind(this)}
              ></klevu-pagination>
            ) : this.#resultObject?.getPage ? (
              <klevu-button onClick={this.loadMore.bind(this)}>${this.tLoadMore}</klevu-button>
            ) : null}
          </div>
        </klevu-layout-results>
      </Host>
    )
  }
}
