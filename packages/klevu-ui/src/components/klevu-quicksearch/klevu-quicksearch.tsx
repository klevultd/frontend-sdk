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
import { Component, Fragment, h, Host, Listen, Prop, State, Event, EventEmitter } from "@stencil/core"
import { parts } from "../../utils/parts"
import {
  KlevuPaginationCustomEvent,
  KlevuSearchFieldCustomEvent,
  KlevuTextfieldCustomEvent,
  KlevuUtilViewportCustomEvent,
  ViewportSize,
} from "../../components"

import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import {
  SearchFieldVariant,
  SearchResultsEventData,
  SuggestionsEventData,
} from "../klevu-search-field/klevu-search-field"
import { getTranslation } from "../../utils/getTranslation"
import { stringConcat } from "../../utils/stringConcat"

export type KlevuQuicksearchResultVarint = "simple" | "full"

export type KlevuQuicksearchDataEvent = {
  trendingProducts?: KlevuRecord[]
  lastClickedProducts?: KlevuRecord[]
  searchResult?: KlevuQueryResult
}

/**
 * Full app to create search bar that popups trending products and search results.
 *
 * @slot content - Popup content
 * @slot search-products - Slot to replace search results listings
 * @slot trending-products - Slot to replace trending products listings
 * @slot last-clicked-products - Slot to replace last clicked products
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
   * Title of search results
   */
  @Prop() tSearchResults = getTranslation("quicksearch.tSearchResults")

  /**
   * Title of button to start Moi session
   */
  @Prop() tStartChat = getTranslation("quicksearch.tStartChat")

  /**
   * Title of categories section
   */
  @Prop() tCategoriesCaption = getTranslation("quicksearch.tCategoriesCaption")

  /**
   * Trending tab caption
   */
  @Prop() tTrendingCaption = getTranslation("quicksearch.tTrendingCaption")

  /**
   * Recentely clicked tab caption
   */
  @Prop() tLastClickedProductsCaption = getTranslation("quicksearch.tLastClickedProductsCaption")

  @State() products?: KlevuRecord[] = []
  @State() trendingProducts: KlevuRecord[] = []
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

  /**
   * When the data in the component changes. This event can be used to replace
   * whole rendering of products when used with slots properly.
   */
  @Event({
    composed: true,
  })
  data!: EventEmitter<KlevuQuicksearchDataEvent>

  #emitChangedData() {
    this.data.emit({
      lastClickedProducts: this.lastClickedProducts,
      trendingProducts: this.trendingProducts,
      searchResult: this.queryResult,
    })
  }

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
    this.#emitChangedData()
  }

  async #searchPageChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#searchField) {
      return
    }
    this.#searchField.getPage("search", event.detail - 1)
    this.queryResult = await this.#searchField?.getQueryResult("search")
    this.#emitChangedData()
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
      this.#emitChangedData()
    }
  }

  #onPopupOpen() {
    this.lastClickedProducts = KlevuLastClickedProducts.getProducts(3) as KlevuRecord[]
    this.#emitChangedData()
  }

  #startSearch(term: string) {
    this.products = [undefined, undefined, undefined] as any
    this.#searchField?.makeSearch(term)
  }

  @State() currentViewPortSize?: ViewportSize
  viewportUtil!: HTMLKlevuUtilViewportElement

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  render() {
    return (
      <Host>
        <klevu-util-viewport
          onSizeChanged={this.#sizeChange.bind(this)}
          ref={(el) => (this.viewportUtil = el as HTMLKlevuUtilViewportElement)}
        ></klevu-util-viewport>
        <klevu-popup
          anchor={this.popupAnchor}
          ref={(el) => (this.popup = el)}
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
            tSearchText={this.searchText}
            tPlaceholder={this.placeholder}
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
    const isMobile = this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"

    return (
      <Fragment>
        <aside>
          <klevu-suggestions-list
            suggestions={this.suggestions}
            onKlevuSuggestionClicked={(event) => this.#startSearch(event.detail)}
          ></klevu-suggestions-list>
          {this.cmsPages && this.cmsPages.length > 0 && <klevu-cms-list pages={this.cmsPages} link></klevu-cms-list>}
          {this.categories && this.categories.length > 0 && (
            <klevu-cms-list pages={this.categories} tCaption={this.tCategoriesCaption} link></klevu-cms-list>
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
              <klevu-product-grid itemsPerRow={isMobile ? undefined : 3}>
                <slot name="search-products">
                  {this.products?.map((p) => (
                    <klevu-product
                      product={p}
                      fixedWidth
                      variant={isMobile ? "line" : "small"}
                      exportparts={parts["klevu-product"]}
                    ></klevu-product>
                  ))}
                </slot>
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
                <klevu-typography variant="h3">{this.tSearchResults}</klevu-typography>
              </div>
              <div class="lineproducts">
                <slot name="search-products">
                  {this.products?.map((p) => (
                    <klevu-product product={p} variant="line" exportparts={parts["klevu-product"]}></klevu-product>
                  ))}
                </slot>
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
              {this.tStartChat}
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
              caption={this.tTrendingCaption}
              active={this.activeTab === "trending"}
              onClick={() => (this.activeTab = "trending")}
            ></klevu-tab>
            <klevu-tab
              caption={stringConcat(this.tLastClickedProductsCaption, [`${this.lastClickedProducts?.length ?? 0}`])}
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
              <slot name="trending-products">
                {this.trendingProducts?.map((p) => (
                  <klevu-product product={p} variant="line" exportparts={parts["klevu-product"]}></klevu-product>
                ))}
              </slot>
            </Fragment>
          )}
          {this.activeTab === "last" && (
            <Fragment>
              <slot name="last-clicked-products">
                {this.lastClickedProducts?.map((p) => (
                  <klevu-product product={p} variant="line" exportparts={parts["klevu-product"]}></klevu-product>
                ))}
              </slot>
            </Fragment>
          )}
        </section>
      </Fragment>
    )
  }
}
