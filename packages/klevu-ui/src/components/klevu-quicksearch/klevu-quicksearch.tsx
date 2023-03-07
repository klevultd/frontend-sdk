import { Placement } from "@floating-ui/dom"
import {
  KlevuEvents,
  KlevuFetch,
  KlevuQueryResult,
  KlevuRecord,
  KlevuSearchSorting,
  trendingProducts,
} from "@klevu/core"
import { Component, Fragment, h, Host, Listen, Prop, State } from "@stencil/core"
import { KlevuPaginationCustomEvent, KlevuSearchFieldCustomEvent, KlevuTextfieldCustomEvent } from "../../components"
import { KlevuQueryCustomEvent } from "../../components"
import { globalExportedParts } from "../../utils/utils"
import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import {
  SearchFieldVariant,
  SearchResultsEventData,
  SuggestionsEventData,
} from "../klevu-search-field/klevu-search-field"

/**
 * Full app to create search bar that popups trending products and search results.
 *
 * @slot content - Popup content
 */
@Component({
  tag: "klevu-quicksearch",
  styleUrl: "klevu-quicksearch.css",
  shadow: true,
})
export class KlevuQuicksearch {
  /**
   * What term should be used if there isn't enough results
   */
  @Prop() fallbackTerm?: string
  /**
   * Anchor popup to witch side
   */
  @Prop() popupAnchor?: Placement = "bottom-end"
  /**
   * Should component search for categories too
   */
  @Prop() searchCategories?: boolean
  /**
   * Should component search for CMS pages too
   */
  @Prop() searchCmsPages?: boolean
  /**
   * Placeholder for input text
   */
  @Prop() placeholder?: string
  /**
   * Text of search button
   */
  @Prop() searchText?: string

  /**
   * Change variant of the search field
   */
  @Prop() searchFieldVariant: SearchFieldVariant = "default"

  /**
   * Function to render custom products. Result has to be native HTML element or a string. Provides a product being rendered.
   * This function is called for each slot (top, image, info and bottom) of the component. Second parameter provides
   * slot requested. Return null for slots that you do not want to render.
   */
  @Prop() renderProductSlot?: (product: KlevuRecord, productSlot: KlevuProductSlots) => HTMLElement | string | null

  @State() products?: KlevuRecord[] = []
  @State() trendingProducts: Array<KlevuRecord | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]
  @State() suggestions: string[] = []
  @State() cmsPages?: KlevuRecord[]
  @State() categories?: KlevuRecord[]
  @State() queryResult?: KlevuQueryResult
  @State() searchSort?: KlevuSearchSorting

  #searchField?: HTMLKlevuSearchFieldElement

  clickEvent?: (productId: string, variantId?: string) => void

  popup?: HTMLKlevuPopupElement

  @Listen("klevuTextChange")
  async onTextChange(event: KlevuTextfieldCustomEvent<string>) {
    console.log(event.detail)
    if (event.detail === "") {
      this.suggestions = []
      this.products = []
    }
  }

  @Listen("klevuSearchResults")
  async onResults(event: KlevuSearchFieldCustomEvent<SearchResultsEventData>) {
    this.clickEvent = event.detail.search?.getSearchClickSendEvent?.()
    this.products = event.detail.search?.records
    this.cmsPages = event.detail.cms?.records
    this.categories = event.detail.category?.records
    this.popup?.openModal()
    this.queryResult = await this.#searchField?.getQueryResult("search")
  }

  async #searchPageChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#searchField) {
      return
    }
    this.#searchField.getPage("search", event.detail - 1)
    this.queryResult = await this.#searchField?.getQueryResult("search")
  }

  @Listen("klevuSearchSuggestions")
  async onSuggestions(event: KlevuSearchFieldCustomEvent<SuggestionsEventData>) {
    this.suggestions = event.detail
  }

  @Listen("klevuProductClick")
  onProductClick(event: KlevuSearchFieldCustomEvent<KlevuProductOnProductClick>) {
    const { product } = event.detail
    this.popup?.closeModal()
    if (product.id) {
      this.clickEvent?.(product.id, product.itemGroupId || product.id)
    }
  }

  async connectedCallback() {
    await KlevuInit.ready()
    const trendingProductsQuery = await KlevuFetch(
      trendingProducts({
        limit: 10,
      })
    )
    const resultObject = trendingProductsQuery.queriesById("trendingProducts")
    if (resultObject) {
      this.trendingProducts = resultObject.records
    }
  }

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
    return (
      <Host>
        <klevu-popup anchor={this.popupAnchor} ref={(el) => (this.popup = el)} fullwidthContent openAtFocus>
          <klevu-search-field
            ref={(el) => (this.#searchField = el)}
            limit={6}
            sort={this.searchSort}
            slot="origin"
            searchProducts
            searchSuggestions
            searchText={this.searchText}
            placeholder={this.placeholder}
            fallback-term={this.fallbackTerm}
            searchCmsPages={this.searchCmsPages}
            searchCategories={this.searchCategories}
            onFocus={() => this.popup?.openModal()}
            exportparts={globalExportedParts}
            variant={this.searchFieldVariant}
          ></klevu-search-field>
          <div class="content" slot="content">
            {(this.products ?? []).length > 0 ? (
              <Fragment>
                <aside>
                  <klevu-suggestions-list
                    exportparts={globalExportedParts}
                    suggestions={this.suggestions}
                  ></klevu-suggestions-list>
                  {this.cmsPages && <klevu-cms-list pages={this.cmsPages}></klevu-cms-list>}
                  {this.categories && <klevu-cms-list pages={this.categories} caption="Categories"></klevu-cms-list>}
                </aside>
                <section>
                  <div class="resultheader">
                    <klevu-typography variant="h3">Search results</klevu-typography>
                    <klevu-sort
                      variant="inline"
                      exportparts={globalExportedParts}
                      onKlevuSortChanged={(event) => (this.searchSort = event.detail)}
                    ></klevu-sort>
                  </div>
                  <klevu-product-grid class="desktop" itemsPerRow={3}>
                    {this.products?.map((p) => (
                      <klevu-product product={p} fixedWidth variant="small">
                        {this.#internalRenderProductSlot(p, "top")}
                        {this.#internalRenderProductSlot(p, "image")}
                        {this.#internalRenderProductSlot(p, "info")}
                        {this.#internalRenderProductSlot(p, "bottom")}
                      </klevu-product>
                    ))}
                  </klevu-product-grid>
                  <klevu-product-grid class="mobile">
                    {this.products?.map((p) => (
                      <klevu-product product={p} fixedWidth variant="line">
                        {this.#internalRenderProductSlot(p, "top")}
                        {this.#internalRenderProductSlot(p, "image")}
                        {this.#internalRenderProductSlot(p, "info")}
                        {this.#internalRenderProductSlot(p, "bottom")}
                      </klevu-product>
                    ))}
                  </klevu-product-grid>
                  <klevu-pagination
                    exportparts={globalExportedParts}
                    queryResult={this.queryResult}
                    onKlevuPaginationChange={this.#searchPageChange.bind(this)}
                  ></klevu-pagination>
                </section>
              </Fragment>
            ) : this.products?.length === 0 && this.trendingProducts.length > 0 ? (
              <Fragment>
                <aside>
                  <klevu-popular-searches></klevu-popular-searches>
                  <klevu-latest-searches exportparts={globalExportedParts}></klevu-latest-searches>
                </aside>
                <section>
                  <klevu-typography variant="h3">Trending products</klevu-typography>
                  <klevu-slides class="trending-slides" exportparts={globalExportedParts}>
                    {this.trendingProducts?.map((p) => (
                      <klevu-product product={p} fixedWidth variant="small">
                        {this.#internalRenderProductSlot(p, "top")}
                        {this.#internalRenderProductSlot(p, "image")}
                        {this.#internalRenderProductSlot(p, "info")}
                        {this.#internalRenderProductSlot(p, "bottom")}
                      </klevu-product>
                    ))}
                  </klevu-slides>
                </section>
              </Fragment>
            ) : null}
          </div>
        </klevu-popup>
      </Host>
    )
  }
}
