import {
  KlevuFetch,
  KlevuRecord,
  search,
  sendSearchEvent,
  KlevuFetchQueryResult,
  FilterManager,
  listFilters,
  applyFilterWithManager,
} from "@klevu/core"
import { Component, Host, h, Prop, Listen, State } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { KlevuProductOnProductClick } from "../klevu-product/klevu-product"

@Component({
  tag: "klevu-search-landing-page",
  styleUrl: "klevu-search-landing-page.css",
  shadow: true,
})
export class KlevuSearchLandingPage {
  @Prop() limit: number = 24
  @Prop() term!: string

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
  private clickEvent: (id: string, variantId: string) => void

  async connectedCallback() {
    await this.initialFetch()
  }

  async initialFetch() {
    const result = await KlevuFetch(
      search(
        this.term,
        { limit: this.limit },
        sendSearchEvent(),
        listFilters({ filterManager: this.manager }),
        applyFilterWithManager(this.manager)
      )
    )
    this.resultObject = result.queriesById("search")

    this.results = this.resultObject?.records ?? []
    this.clickEvent = this.resultObject?.getSearchClickSendEvent?.()
  }

  async loadMore() {
    const nextResultObject = await this.resultObject.next()
    this.resultObject = nextResultObject.queriesById("search")
    this.results = [...this.results, ...(this.resultObject?.records ?? [])]
    this.clickEvent = this.resultObject.getSearchClickSendEvent?.()
  }

  @Listen("productClick")
  productClickHandler(event: CustomEvent<KlevuProductOnProductClick>) {
    if (this.clickEvent) {
      this.clickEvent(event.detail.product.id, event.detail.product.itemGroupId)
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate(event) {
    this.initialFetch()
  }

  render() {
    return (
      <Host>
        <klevu-facet-list exportparts={globalExportedParts} manager={this.manager}></klevu-facet-list>
        <section>
          <klevu-product-grid products={this.results}></klevu-product-grid>
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
