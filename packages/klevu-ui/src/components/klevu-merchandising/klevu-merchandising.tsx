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
import { Component, Host, h, Listen, Prop, State, Watch, Fragment, Element } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"

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

  private resultObject?: KlevuFetchQueryResult
  private clickEvent?: (id: string, categoryTitle: string, variantId: string) => void

  async connectedCallback() {
    await KlevuInit.ready()
    await this.initialFetch()
  }

  @Watch("category")
  async watchPropHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.manager.clear()
      await this.initialFetch()
    }
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
    this.clickEvent = this.resultObject?.getCategoryMerchandisingClickSendEvent?.()
  }

  async loadMore() {
    if (!this.resultObject?.next) {
      return
    }
    const nextResultObject = await this.resultObject.next()
    this.resultObject = nextResultObject.queriesById("categoryMerchandising")
    this.results = [...this.results, ...(this.resultObject?.records ?? [])]
    this.clickEvent = this.resultObject?.getCategoryMerchandisingClickSendEvent?.()
  }

  @Listen("productClick")
  productClickHandler(event: CustomEvent<KlevuProductOnProductClick>) {
    if (!event.detail.product.id || !event.detail.product.itemGroupId) {
      return
    }
    if (this.clickEvent) {
      this.clickEvent(event.detail.product?.id, this.categoryTitle, event.detail.product.itemGroupId)
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
    this.initialFetch()
  }

  @Prop() renderProductSlot?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string
  private internalRenderProductSlot(product: KlevuRecord | undefined, slot: KlevuProductSlots) {
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
    return (
      <Host>
        <klevu-facet-list
          accordion
          class="desktop"
          customOrder={this.filterCustomOrder}
          exportparts={globalExportedParts}
          manager={this.manager}
        ></klevu-facet-list>
        <div class="mobileheader">
          <klevu-heading variant="h1">{this.categoryTitle}</klevu-heading>
          <klevu-drawer anchor="right" background>
            <klevu-button slot="origin">Filters</klevu-button>
            <klevu-facet-list
              slot="content"
              accordion
              customOrder={this.filterCustomOrder}
              exportparts={globalExportedParts}
              manager={this.manager}
            ></klevu-facet-list>
          </klevu-drawer>
        </div>
        <section>
          <klevu-heading class="desktop title" variant="h1">
            {this.categoryTitle}
          </klevu-heading>
          <klevu-product-grid>
            {this.results.map((p) => (
              <klevu-product product={p} fixedWidth>
                {this.internalRenderProductSlot(p, "top")}
                {this.internalRenderProductSlot(p, "image")}
                {this.internalRenderProductSlot(p, "info")}
                {this.internalRenderProductSlot(p, "bottom")}
              </klevu-product>
            ))}
          </klevu-product-grid>
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
