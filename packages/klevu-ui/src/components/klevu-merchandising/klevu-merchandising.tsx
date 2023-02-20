import {
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuFetch,
  KlevuFetchQueryResult,
  KlevuRecord,
  KlevuSearchSorting,
  listFilters,
  sendMerchandisingViewEvent,
} from "@klevu/core"
import { Component, Element, h, Host, Listen, Prop, State, Watch } from "@stencil/core"
import {
  KlevuPaginationCustomEvent,
  KlevuProductCustomEvent,
  KlevuSortCustomEvent,
  KlevuUtilViewportCustomEvent,
} from "../../components"
import { globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import { ViewportSize } from "../klevu-util-viewport/klevu-util-viewport"

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
   * Order of results
   */
  @Prop() sort?: KlevuSearchSorting

  /**
   * How many filters per facet to show
   */
  @Prop() filterCount?: number

  /**
   * Order filters in given order
   */
  @Prop() filterCustomOrder?: { [key: string]: string[] }

  @State() currentViewPortSize?: ViewportSize

  #viewportUtil!: HTMLKlevuUtilViewportElement
  #layoutElement!: HTMLKlevuLayoutResultsElement

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

  #resultObject?: KlevuFetchQueryResult
  #clickEvent?: (id: string, categoryTitle: string, variantId: string) => void

  async connectedCallback() {
    await KlevuInit.ready()
    await this.#initialFetch()
  }

  @Watch("category")
  async watchPropHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.manager.clear()
      await this.#initialFetch()
    }
  }

  async #initialFetch() {
    const result = await KlevuFetch(
      categoryMerchandising(
        this.category,
        { limit: this.limit, sort: this.sort },
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
    this.#clickEvent = this.#resultObject?.getCategoryMerchandisingClickSendEvent?.()
  }

  async #loadMore() {
    if (!this.#resultObject?.next) {
      return
    }
    const nextResultObject = await this.#resultObject.next()
    this.#resultObject = nextResultObject.queriesById("categoryMerchandising")
    this.results = [...this.results, ...(this.#resultObject?.records ?? [])]
    this.#clickEvent = this.#resultObject?.getCategoryMerchandisingClickSendEvent?.()
  }

  async #paginationChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#resultObject?.getPage) {
      return
    }
    const nextResultObject = await this.#resultObject.getPage({ pageIndex: event.detail - 1 })
    this.#resultObject = nextResultObject.queriesById("categoryMerchandising")
    this.results = this.#resultObject?.records ?? []
    this.#clickEvent = this.#resultObject?.getCategoryMerchandisingClickSendEvent?.()
  }

  async #sortChanged(event: KlevuSortCustomEvent<KlevuSearchSorting>) {
    this.sort = event.detail
    await this.#initialFetch()
  }

  @Listen("productClick")
  productClickHandler(event: KlevuProductCustomEvent<KlevuProductOnProductClick>) {
    if (!event.detail.product.id || !event.detail.product.itemGroupId) {
      return
    }
    if (this.#clickEvent) {
      this.#clickEvent(event.detail.product?.id, this.categoryTitle, event.detail.product.itemGroupId)
    }
  }

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.#viewportUtil.getCurrentSize()
  }

  #applyFilters() {
    this.#initialFetch()
    this.#layoutElement.closeDrawer()
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
            accordion
            customOrder={this.filterCustomOrder}
            exportparts={globalExportedParts}
            manager={this.manager}
            useApplyButton={isMobile}
            onKlevuApplyFilters={this.#applyFilters.bind(this)}
          ></klevu-facet-list>
          <div slot="header" class="header">
            <klevu-typography slot="header" variant="h1">
              {this.categoryTitle}
            </klevu-typography>
            <klevu-sort onKlevuSortChanged={this.#sortChanged.bind(this)}></klevu-sort>
          </div>
          <klevu-product-grid slot="content">
            {this.results.map((p) => (
              <klevu-product product={p} fixedWidth>
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
            ) : this.#resultObject?.next ? (
              <klevu-button onClick={this.#loadMore.bind(this)}>Load more</klevu-button>
            ) : null}
          </div>
        </klevu-layout-results>
      </Host>
    )
  }
}
