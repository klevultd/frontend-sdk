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
import { Component, h, Host, Listen, Prop, State } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"

@Component({
  tag: "klevu-search-landing-page",
  styleUrl: "klevu-search-landing-page.css",
  shadow: true,
})
export class KlevuSearchLandingPage {
  @Prop() limit: number = 24
  @Prop() term!: string
  @Prop() sort?: KlevuSearchSorting
  @Prop() filterCount?: number
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

  private resultObject?: KlevuFetchQueryResult
  private clickEvent?: (id: string, variantId: string) => void

  async connectedCallback() {
    await KlevuInit.ready()
    await this.initialFetch()
  }

  async initialFetch() {
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
    this.resultObject = result.queriesById("search")

    this.results = this.resultObject?.records ?? []
    this.clickEvent = this.resultObject?.getSearchClickSendEvent?.()
  }

  async loadMore() {
    if (!this.resultObject?.next) {
      return
    }
    const nextResultObject = await this.resultObject.next()
    this.resultObject = nextResultObject.queriesById("search")
    this.results = [...this.results, ...(this.resultObject?.records ?? [])]
    this.clickEvent = this.resultObject!.getSearchClickSendEvent?.()
  }

  @Prop() renderProductSlot?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string

  @Listen("productClick")
  productClickHandler(event: CustomEvent<KlevuProductOnProductClick>) {
    if (this.clickEvent && event.detail.product.id) {
      this.clickEvent(event.detail.product.id, event.detail.product.itemGroupId || event.detail.product.id)
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
    this.initialFetch()
  }

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
          class="desktop"
          customOrder={this.filterCustomOrder}
          exportparts={globalExportedParts}
          manager={this.manager}
        ></klevu-facet-list>
        <div class="mobileheader">
          <klevu-heading variant="h1">Searching term "{this.term}"</klevu-heading>
          <klevu-drawer anchor="right" background>
            <klevu-button slot="origin">Filters</klevu-button>
            <klevu-facet-list
              slot="content"
              customOrder={this.filterCustomOrder}
              exportparts={globalExportedParts}
              manager={this.manager}
            ></klevu-facet-list>
          </klevu-drawer>
        </div>
        <section>
          <klevu-heading class="desktop title" variant="h1">
            Searching term "{this.term}"
          </klevu-heading>
          <klevu-product-grid>
            {this.results?.map((p) => (
              <klevu-product product={p} fixedWidth variant="small">
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
