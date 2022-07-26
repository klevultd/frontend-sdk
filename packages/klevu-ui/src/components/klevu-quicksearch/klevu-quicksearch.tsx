import { KlevuFetch, KlevuRecord, trendingProducts } from "@klevu/core"
import { Component, Host, h, State, Listen, Prop } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

@Component({
  tag: "klevu-quicksearch",
  styleUrl: "klevu-quicksearch.css",
  shadow: true,
})
export class KlevuQuicksearch {
  @State() products: KlevuRecord[] = []
  @State() trendingProducts: KlevuRecord[] = [undefined, undefined, undefined, undefined, undefined, undefined]
  @State() suggestions: string[] = []
  @Prop() renderProduct?: (product: KlevuRecord) => HTMLElement

  @Listen("searchResults")
  async onResults(event: CustomEvent<KlevuRecord[]>) {
    this.products = event.detail
  }

  @Listen("searchSuggestions")
  async onSuggestions(event: CustomEvent<string[]>) {
    this.suggestions = event.detail
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
        <klevu-popup>
          <klevu-search-field limit={6} slot="origin"></klevu-search-field>
          <div class="content" slot="content">
            <aside>
              <h3>Search suggestions</h3>
              <ul part="klevu-list">
                {this.suggestions.map((s) => (
                  <li innerHTML={s}></li>
                ))}
              </ul>
              <klevu-latest-searches exportparts={globalExportedParts}></klevu-latest-searches>
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
