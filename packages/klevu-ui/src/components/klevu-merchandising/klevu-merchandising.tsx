import {
  KlevuRecord,
  FilterManager,
  KlevuFetchQueryResult,
  KlevuFetch,
  listFilters,
  applyFilterWithManager,
  categoryMerchandising,
  sendMerchandisingViewEvent,
  KlevuSearchSorting,
} from "@klevu/core"
import { Component, Host, h, Listen, Prop, State } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick } from "../klevu-product/klevu-product"

@Component({
  tag: "klevu-merchandising",
  styleUrl: "klevu-merchandising.css",
  shadow: true,
})
export class KlevuMerchandising {
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
   * Custom rendering of product. Can pass any HTML element as return value
   */
  @Prop() renderProduct?: (product: KlevuRecord) => HTMLElement

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

  @State() results: KlevuRecord[] = [
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

  private resultObject: KlevuFetchQueryResult
  private clickEvent: (id: string, categoryTitle: string, variantId: string) => void

  async connectedCallback() {
    await KlevuInit.ready()
    await this.initialFetch()
  }

  async initialFetch() {
    const result = await KlevuFetch(
      categoryMerchandising(
        this.category,
        { limit: this.limit, sort: this.sort },
        sendMerchandisingViewEvent(this.categoryTitle),
        listFilters({ filterManager: this.manager, limit: this.filterCount }),
        applyFilterWithManager(this.manager)
      )
    )
    this.resultObject = result.queriesById("categoryMerchandising")

    this.results = this.resultObject?.records ?? []
    this.clickEvent = this.resultObject?.getSearchClickSendEvent?.()
  }

  async loadMore() {
    const nextResultObject = await this.resultObject.next()
    this.resultObject = nextResultObject.queriesById("categoryMerchandising")
    this.results = [...this.results, ...(this.resultObject?.records ?? [])]
    this.clickEvent = this.resultObject.getCategoryMerchandisingClickSendEvent?.()
  }

  @Listen("productClick")
  productClickHandler(event: CustomEvent<KlevuProductOnProductClick>) {
    if (this.clickEvent) {
      this.clickEvent(event.detail.product.id, this.categoryTitle, event.detail.product.itemGroupId)
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate(event) {
    this.initialFetch()
  }

  render() {
    return (
      <Host>
        <klevu-facet-list
          customOrder={this.filterCustomOrder}
          exportparts={globalExportedParts}
          manager={this.manager}
        ></klevu-facet-list>
        <section>
          <klevu-heading variant="h1">{this.categoryTitle}</klevu-heading>
          <klevu-product-grid renderProduct={this.renderProduct} products={this.results}></klevu-product-grid>
          {this.resultObject?.next ? (
            <div class="loadmorebuttoncontainer">
              <klevu-button onClick={this.loadMore.bind(this)}>Load more</klevu-button>
            </div>
          ) : null}
        </section>
      </Host>
    )
  }
}
