import { Placement } from "@floating-ui/dom"
import {
  KlevuFetch,
  KlevuLastClickedProducts,
  KlevuQueryResult,
  KlevuRecord,
  KlevuResponseQueryObject,
  KlevuSearchSorting,
  trendingProducts,
} from "@klevu/core"
import { Component, Fragment, h, Host, Listen, Prop, State } from "@stencil/core"
import { parts } from "../../utils/parts"
import { KlevuPaginationCustomEvent, KlevuSearchFieldCustomEvent, KlevuTextfieldCustomEvent } from "../../components"

import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import {
  SearchFieldVariant,
  SearchResultsEventData,
  SuggestionsEventData,
} from "../klevu-search-field/klevu-search-field"

export type KlevuQuicksearchResultVarint = "simple" | "full"

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
  @Prop() searchFieldVariant: SearchFieldVariant = "pill"

  /**
   * Change variant of the search results
   */
  @Prop() resultVariant: KlevuQuicksearchResultVarint = "simple"

  /**
   * How many products to show in simple variant
   */
  @Prop() simpleResultCount: number = 3

  /**
   * How many products to show in full variant
   */
  @Prop() fullResultCount: number = 9

  /**
   * Enable Klevu MOI chat
   */
  @Prop() enableChat?: boolean

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
  @State() lastClickedProducts?: KlevuRecord[]
  @State() activeTab: "trending" | "last" = "trending"
  @State() chat = false

  #searchField?: HTMLKlevuSearchFieldElement

  #resultObject?: KlevuResponseQueryObject

  popup?: HTMLKlevuPopupElement

  @Listen("klevuTextChanged")
  async onTextChange(event: KlevuTextfieldCustomEvent<string>) {
    if (event.detail.length === 0) {
      this.suggestions = []
      this.products = []
    }
  }

  @Listen("klevuSearchResults")
  async onResults(event: KlevuSearchFieldCustomEvent<SearchResultsEventData>) {
    if (event.detail.search?.records.length === 0) {
      this.#resultObject = event.detail.fallback
      this.products = event.detail.fallback?.records
    } else {
      this.#resultObject = event.detail.search
      this.products = event.detail.search?.records
    }
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
      this.#resultObject?.searchClickEvent?.({
        productId: product.id,
        variantId: product.itemGroupId || product.id,
      })
    }
  }

  @Listen("klevuChatLayoutClose")
  onChatLayoutClose() {
    this.chat = false
  }

  async connectedCallback() {
    await KlevuInit.ready()
    const trendingProductsQuery = await KlevuFetch(
      trendingProducts({
        limit: this.simpleResultCount,
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

  #onPopupOpen() {
    this.lastClickedProducts = KlevuLastClickedProducts.getProducts(3) as KlevuRecord[]
  }

  #startSearch(term: string) {
    this.products = [undefined, undefined, undefined] as any
    this.#searchField?.makeSearch(term)
  }

  render() {
    return (
      <Host>
        <klevu-popup
          anchor={this.popupAnchor}
          ref={(el) => (this.popup = el)}
          fullwidthContent
          openAtFocus
          onKlevuPopupOpen={this.#onPopupOpen.bind(this)}
          elevation={2}
        >
          <klevu-search-field
            ref={(el) => (this.#searchField = el)}
            limit={this.resultVariant === "simple" ? this.simpleResultCount : this.fullResultCount}
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
            variant={this.searchFieldVariant}
          ></klevu-search-field>
          <div class="content" slot="content">
            {(this.products ?? []).length > 0
              ? this.#renderResultPage()
              : this.products?.length === 0 && this.trendingProducts.length > 0
              ? this.#renderTrendingPage()
              : null}
          </div>
        </klevu-popup>
        {this.chat && <klevu-moi></klevu-moi>}
      </Host>
    )
  }

  #renderResultPage() {
    return (
      <Fragment>
        <aside>
          <klevu-suggestions-list
            suggestions={this.suggestions}
            onKlevuSuggestionClicked={(event) => this.#startSearch(event.detail)}
          ></klevu-suggestions-list>
          {this.cmsPages && this.cmsPages.length > 0 && <klevu-cms-list pages={this.cmsPages} link></klevu-cms-list>}
          {this.categories && this.categories.length > 0 && (
            <klevu-cms-list pages={this.categories} caption="Categories" link></klevu-cms-list>
          )}
        </aside>
        <section>
          {this.resultVariant === "full" && (
            <Fragment>
              <div class="resultheader">
                <klevu-typography variant="h3">Search results</klevu-typography>
                <klevu-sort
                  variant="inline"
                  onKlevuSortChanged={(event) => (this.searchSort = event.detail)}
                ></klevu-sort>
              </div>
              <klevu-product-grid class="desktop" itemsPerRow={3}>
                {this.products?.map((p) => (
                  <klevu-product product={p} fixedWidth variant="small" exportparts={parts["klevu-product"]}>
                    {this.#internalRenderProductSlot(p, "top")}
                    {this.#internalRenderProductSlot(p, "image")}
                    {this.#internalRenderProductSlot(p, "info")}
                    {this.#internalRenderProductSlot(p, "bottom")}
                  </klevu-product>
                ))}
              </klevu-product-grid>
              <klevu-product-grid class="mobile">
                {this.products?.map((p) => (
                  <klevu-product product={p} fixedWidth variant="line" exportparts={parts["klevu-product"]}>
                    {this.#internalRenderProductSlot(p, "top")}
                    {this.#internalRenderProductSlot(p, "image")}
                    {this.#internalRenderProductSlot(p, "info")}
                    {this.#internalRenderProductSlot(p, "bottom")}
                  </klevu-product>
                ))}
              </klevu-product-grid>
              <klevu-pagination
                queryResult={this.queryResult}
                onKlevuPaginationChange={this.#searchPageChange.bind(this)}
              ></klevu-pagination>
            </Fragment>
          )}
          {this.resultVariant === "simple" && (
            <Fragment>
              <div class="resultheader">
                <klevu-typography variant="h3">Search results</klevu-typography>
              </div>
              <div class="lineproducts">
                {this.products?.map((p) => (
                  <klevu-product product={p} variant="line" exportparts={parts["klevu-product"]}>
                    {this.#internalRenderProductSlot(p, "top")}
                    {this.#internalRenderProductSlot(p, "image")}
                    {this.#internalRenderProductSlot(p, "info")}
                    {this.#internalRenderProductSlot(p, "bottom")}
                  </klevu-product>
                ))}
              </div>
            </Fragment>
          )}
        </section>
      </Fragment>
    )
  }

  #renderTrendingPage() {
    return (
      <Fragment>
        <aside>
          {this.enableChat && (
            <klevu-button size="small" onClick={() => (this.chat = true)}>
              Start chat
            </klevu-button>
          )}
          <klevu-popular-searches
            onKlevuPopularSearchClicked={(event) => this.#startSearch(event.detail)}
          ></klevu-popular-searches>
          <klevu-latest-searches
            onKlevuLastSearchClicked={(event) => this.#startSearch(event.detail)}
          ></klevu-latest-searches>
        </aside>
        <section>
          <div class="tabrow">
            <klevu-tab
              caption="Trending"
              active={this.activeTab === "trending"}
              onClick={() => (this.activeTab = "trending")}
            ></klevu-tab>
            <klevu-tab
              caption={`Recently viewed (${this.lastClickedProducts?.length ?? 0})`}
              active={this.activeTab === "last"}
              onClick={() => {
                if (this.lastClickedProducts?.length === 0) {
                  return
                }
                this.activeTab = "last"
              }}
              disabled={this.lastClickedProducts?.length === 0}
            ></klevu-tab>
          </div>
          {this.activeTab === "trending" && (
            <Fragment>
              {this.trendingProducts?.map((p) => (
                <klevu-product product={p} variant="line" exportparts={parts["klevu-product"]}>
                  {this.#internalRenderProductSlot(p, "top")}
                  {this.#internalRenderProductSlot(p, "image")}
                  {this.#internalRenderProductSlot(p, "info")}
                  {this.#internalRenderProductSlot(p, "bottom")}
                </klevu-product>
              ))}
            </Fragment>
          )}
          {this.activeTab === "last" && (
            <Fragment>
              {this.lastClickedProducts?.map((p) => (
                <klevu-product product={p} variant="line" exportparts={parts["klevu-product"]}>
                  {this.#internalRenderProductSlot(p, "top")}
                  {this.#internalRenderProductSlot(p, "image")}
                  {this.#internalRenderProductSlot(p, "info")}
                  {this.#internalRenderProductSlot(p, "bottom")}
                </klevu-product>
              ))}
            </Fragment>
          )}
        </section>
      </Fragment>
    )
  }
}
