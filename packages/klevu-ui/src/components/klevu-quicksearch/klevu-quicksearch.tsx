import { KlevuFetch, KlevuRecord, trendingProducts } from "@klevu/core"
import { Component, Host, h, State, Listen, Prop } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import type { KlevuPopupAnchor } from "../klevu-popup/klevu-popup"
import { KlevuProductOnProductClick } from "../klevu-product/klevu-product"
import { SearchResultsEventData, SuggestionsEventData } from "../klevu-search-field/klevu-search-field"

@Component({
  tag: "klevu-quicksearch",
  styleUrl: "klevu-quicksearch.css",
  shadow: true,
})
export class KlevuQuicksearch {
  @Prop() renderProduct?: (product: KlevuRecord) => HTMLElement
  @Prop() fallbackTerm?: string
  @Prop() popupAnchor?: KlevuPopupAnchor
  @Prop() searchCategories?: boolean
  @Prop() searchCmsPages?: boolean

  @State() products: KlevuRecord[] = []
  @State() trendingProducts: KlevuRecord[] = [undefined, undefined, undefined, undefined, undefined, undefined]
  @State() suggestions: string[] = []
  @State() cmsPages?: KlevuRecord[]
  @State() categories?: KlevuRecord[]

  clickEvent?: (productId: string, variantId?: string) => void

  popup: HTMLKlevuPopupElement

  @Listen("klevuSearchResults")
  async onResults(event: CustomEvent<SearchResultsEventData>) {
    this.clickEvent = event.detail.search?.getSearchClickSendEvent?.()
    this.products = event.detail.search?.records
    this.cmsPages = event.detail.cms?.records
    this.categories = event.detail.category?.records
    this.popup.openModal()
  }

  @Listen("klevuSearchSuggestions")
  async onSuggestions(event: CustomEvent<SuggestionsEventData>) {
    this.suggestions = event.detail
  }

  @Listen("klevuProductClick")
  onProductClick(event: CustomEvent<KlevuProductOnProductClick>) {
    const { product } = event.detail
    this.clickEvent(product.id, product.itemGroupId)
  }

  async connectedCallback() {
    const trendingProductsQuery = await KlevuFetch(
      trendingProducts({
        limit: 6,
      })
    )
    const resultObject = trendingProductsQuery.queriesById("trendingProducts")
    if (resultObject) {
      this.trendingProducts = resultObject.records
    }
  }

  render() {
    return (
      <Host>
        <klevu-popup anchor={this.popupAnchor} ref={(el) => (this.popup = el)} fullwidthContent>
          <klevu-search-field
            limit={6}
            slot="origin"
            searchProducts
            searchSuggestions
            fallback-term={this.fallbackTerm}
            searchCmsPages={this.searchCmsPages}
            searchCategories={this.searchCategories}
          ></klevu-search-field>
          <div class="content" slot="content">
            <aside>
              <klevu-suggestions-list
                exportparts={globalExportedParts}
                suggestions={this.suggestions}
              ></klevu-suggestions-list>
              <klevu-latest-searches exportparts={globalExportedParts}></klevu-latest-searches>
              {this.cmsPages && <klevu-cms-list pages={this.cmsPages}></klevu-cms-list>}
              {this.categories && <klevu-cms-list pages={this.categories} caption="Categories"></klevu-cms-list>}
            </aside>
            {this.products.length > 0 ? (
              <section>
                <h3>Search results</h3>
                <klevu-product-grid renderProduct={this.renderProduct} products={this.products}></klevu-product-grid>
              </section>
            ) : this.products.length === 0 && this.trendingProducts.length > 0 ? (
              <section>
                <h3>Trending products</h3>
                <klevu-product-grid
                  renderProduct={this.renderProduct}
                  products={this.trendingProducts}
                ></klevu-product-grid>
              </section>
            ) : null}
          </div>
        </klevu-popup>
      </Host>
    )
  }
}
