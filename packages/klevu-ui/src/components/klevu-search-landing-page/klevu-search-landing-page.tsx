import {
  applyFilterWithManager,
  FilterManager,
  KlevuFetch,
  KlevuFetchQueryResult,
  KlevuRecord,
  KlevuSearchSorting,
  listFilters,
  search,
  sendSearchEvent,
} from "@klevu/core"
import { Component, h, Host, Listen, Prop, State, Watch } from "@stencil/core"
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

/**
 * Full app component for search landing page
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
  @State() currentViewPortSize?: ViewportSize

  #resultObject?: KlevuFetchQueryResult
  #clickEvent?: (id: string, variantId: string) => void

  #viewportUtil!: HTMLKlevuUtilViewportElement
  #layoutElement!: HTMLKlevuLayoutResultsElement

  async connectedCallback() {
    await KlevuInit.ready()
    await this.#initialFetch()
  }

  @Watch("term")
  termChanged(oldValue: string, newValue: string) {
    this.#initialFetch()
  }

  async #initialFetch() {
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
    this.#clickEvent = this.#resultObject?.getSearchClickSendEvent?.()
  }

  async loadMore() {
    if (!this.#resultObject?.next) {
      return
    }
    const nextResultObject = await this.#resultObject.next()
    this.#resultObject = nextResultObject.queriesById("search")
    this.results = [...this.results, ...(this.#resultObject?.records ?? [])]
    this.#clickEvent = this.#resultObject!.getSearchClickSendEvent?.()
  }

  async paginationChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#resultObject?.getPage) {
      return
    }
    const nextResultObject = await this.#resultObject.getPage({ pageIndex: event.detail - 1 })
    this.#resultObject = nextResultObject.queriesById("search")
    this.results = this.#resultObject?.records ?? []
    this.#clickEvent = this.#resultObject?.getSearchClickSendEvent?.()
  }

  @Listen("productClick")
  productClickHandler(event: KlevuProductCustomEvent<KlevuProductOnProductClick>) {
    if (this.#clickEvent && event.detail.product.id) {
      this.#clickEvent(event.detail.product.id, event.detail.product.itemGroupId || event.detail.product.id)
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
    this.#initialFetch()
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

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.#viewportUtil.getCurrentSize()
  }

  async #sortChanged(event: KlevuSortCustomEvent<KlevuSearchSorting>) {
    this.sort = event.detail
    await this.#initialFetch()
  }

  #applyFilters() {
    this.#initialFetch()
    this.#layoutElement.closeDrawer()
  }

  render() {
    const isMobile = this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"

    return (
      <Host>
        <klevu-util-viewport
          onSizeChanged={this.#sizeChange.bind(this)}
          ref={(el) => (this.#viewportUtil = el as HTMLKlevuUtilViewportElement)}
        ></klevu-util-viewport>
        <klevu-layout-results ref={(el) => (this.#layoutElement = el as HTMLKlevuLayoutResultsElement)}>
          <klevu-facet-list
            slot="sidebar"
            customOrder={this.filterCustomOrder}
            manager={this.manager}
            useApplyButton={isMobile}
            onKlevuApplyFilters={this.#applyFilters.bind(this)}
          ></klevu-facet-list>
          <div slot="header" class="header">
            <klevu-typography slot="header" variant="h1">
              Searching term "{this.term}"
            </klevu-typography>
            <klevu-sort variant="inline" onKlevuSortChanged={this.#sortChanged.bind(this)}></klevu-sort>
          </div>
          <klevu-product-grid slot="content">
            {this.results?.map((p) => (
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
                onKlevuPaginationChange={this.paginationChange.bind(this)}
              ></klevu-pagination>
            ) : this.#resultObject?.next ? (
              <klevu-button onClick={this.loadMore.bind(this)}>Load more</klevu-button>
            ) : null}
          </div>
        </klevu-layout-results>
      </Host>
    )
  }
}
