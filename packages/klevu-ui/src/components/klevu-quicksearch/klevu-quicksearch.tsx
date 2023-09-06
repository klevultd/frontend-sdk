import { Placement } from "@floating-ui/dom"
import {
  KlevuFetch,
  KlevuLastClickedProducts,
  KlevuQueryResult,
  KlevuRecord,
  KlevuResponseQueryObject,
  KlevuSearchSorting,
  trendingProducts,
  KMCRootObject,
  KMCMapsRootObject,
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
import { getKMCSettings } from "../../utils/getKMCSettings"

export type KlevuQuicksearchResultVarint = "simple" | "full"

export type KlevuQuicksearchDataEvent = {
  trendingProducts?: KlevuRecord[]
  lastClickedProducts?: KlevuRecord[]
  searchResult?: KlevuQueryResult
}
type NoResultsOptions = KMCRootObject["klevu_uc_userOptions"]["noResultsOptions"]
type Banner = NoResultsOptions["banners"][0]
/**
 * Full app to create search bar that popups trending products and search results.
 *
 * @slot content - Popup content
 * @slot search-products - Slot to replace search results listings
 * @slot trending-products - Slot to replace trending products listings
 * @slot last-clicked-products - Slot to replace last clicked products
 * @slot noResults - Show message when no results found
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
   * How many products to show in Popular products section
   */
  @Prop() popularProductsCount: number = 10

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
   * Supports showing the count in place of %s in the value
   * eg: `Trending (%s)` with count of 2 will lead to `Trending (2)`.
   */
  @Prop() tTrendingCaption?: string

  /**
   * Popular products section heading
   */
  @Prop() tPopularProductsTitle?: string

  /**
   * Recently clicked tab caption
   * Supports showing the count in place of %s in the value
   * eg: `Recently Searched (%s)` with count of 2 will lead to `Recently Searched (2)`.
   */
  @Prop() tLastClickedProductsCaption?: string
  /**
   * Show ratings
   */
  @Prop() showRatings?: boolean

  /**
   * Show ratings count
   */
  @Prop() showRatingsCount?: boolean

  /**
   * Show trending products
   */
  @Prop() showTrendingProducts?: boolean

  /**
   * Show recently viewed products
   */
  @Prop() showRecentlyViewedProducts?: boolean
  /**
   * Show popular keywords
   */
  @Prop() showPopularSearches?: boolean
  /**
   * Show recent searches
   */
  @Prop() showRecentSearches?: boolean

  /**
   * Enable personalisation
   */
  @Prop() usePersonalisation?: boolean

  // No results page props
  /**
   * Show popular keywords on no results page
   */
  @Prop() showPopularKeywordsOnNoResultsPage?: boolean
  /**
   * Popular products section heading shown on no results page
   */
  @Prop() tPopularProductsTitleOnNoResultsPage?: string

  /**
   * Show trending products on no results page
   */
  @Prop() showTrendingProductsOnNoResultsPage?: boolean
  /**
   * Pass your own redirect urls for a keyword
   */
  @Prop() urlRedirects?: KMCMapsRootObject["klevu_keywordUrlMap"]

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
  @State() noResultsMessage: string = ""
  @State() noResultsBannerDetails: Banner[] = []

  #searchField?: HTMLKlevuSearchFieldElement

  #resultObject?: KlevuResponseQueryObject

  popup?: HTMLKlevuPopupElement

  #searchTerm: string = ""
  #noResultsOptions?: NoResultsOptions
  /**
   * When the data in the component changes. This event can be used to replace
   * whole rendering of products when used with slots properly.
   */
  @Event({
    composed: true,
  })
  klevuData!: EventEmitter<KlevuQuicksearchDataEvent>
  /**
   * When user clicks search button. Returns the search term.
   * This event is emitted when there is no url matched for redirects
   */
  @Event({
    composed: true,
  })
  klevuSearch!: EventEmitter<string>

  /**
   * Will be emitted when there is a url match for redirects.
   * You can override the default behaviour of redirects by
   * preventing default of this event
   */
  @Event({
    composed: true,
  })
  klevuRedirect!: EventEmitter<KMCMapsRootObject["klevu_keywordUrlMap"][0]>

  #emitChangedData() {
    this.klevuData.emit({
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
      this.#searchTerm = ""
    }
  }

  #setNoResults() {
    this.noResultsMessage = this.#noResultsOptions?.messages.find((m) => m.showForTerms === null)?.message || ""

    this.noResultsBannerDetails =
      this.#noResultsOptions?.banners.filter((m) => m.showOnQuickSearch && m.showForTerms === null) || []
    if (this.#searchTerm) {
      const searchTermSpecificMessage = this.#noResultsOptions?.messages.find(
        (m) => m.showForTerms && m.showForTerms.includes(this.#searchTerm)
      )
      if (searchTermSpecificMessage) this.noResultsMessage = searchTermSpecificMessage?.message || ""
      const searchTermSpecificBanner =
        this.#noResultsOptions?.banners.filter(
          (m) => m.showOnQuickSearch && m.showForTerms && m.showForTerms.includes(this.#searchTerm)
        ) || []
      if (searchTermSpecificBanner.length > 0) this.noResultsBannerDetails.unshift(...searchTermSpecificBanner)
    }
  }

  @Listen("klevuSearchResults")
  async onResults(event: KlevuSearchFieldCustomEvent<SearchResultsEventData>) {
    this.#searchTerm = event.detail.search?.query.meta.searchedTerm || ""
    // Reset the values before assigning new based on logic
    this.noResultsMessage = ""
    this.noResultsBannerDetails = []
    this.products = []
    if (event.detail.search?.records.length === 0) {
      if (event.detail.fallback?.records && event.detail.fallback?.records.length > 0) {
        this.#resultObject = event.detail.fallback
        this.products = event.detail.fallback?.records
      } else {
        this.#setNoResults()
      }
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

  @Listen("klevuSearchClick")
  onKlevuSearchclick(event: CustomEvent<string>) {
    setTimeout(() => this.#handleUrlRedirects(event.detail), 200)
  }

  async #handleUrlRedirects(term: string) {
    let redirect: KMCMapsRootObject["klevu_keywordUrlMap"][0] | undefined
    if (this.urlRedirects === undefined && this.#resultObject?.getRedirects) {
      const redirects = await this.#resultObject.getRedirects()
      if (redirects && redirects.length > 0) {
        redirect = redirects[0]
      }
    } else {
      redirect = this.urlRedirects?.find((redirects) => redirects.keywords.includes(term))
    }
    if (redirect) {
      const emittedEvent = this.klevuRedirect.emit(redirect)
      if (!emittedEvent.defaultPrevented) {
        window.location.href = redirect.url
      }
    } else {
      this.klevuSearch.emit(term)
    }
  }

  async connectedCallback() {
    await KlevuInit.ready()
    const settings = getKMCSettings()

    if (settings) {
      this.#noResultsOptions = settings.klevu_uc_userOptions?.noResultsOptions
      if (this.showRatings === undefined) {
        this.showRatings = settings.klevu_uc_userOptions?.showRatingsOnQuickSearches || false
      }
      if (this.showRatingsCount === undefined) {
        this.showRatingsCount = settings.klevu_uc_userOptions?.showRatingsCountOnQuickSearches || false
      }
      if (this.usePersonalisation === undefined && settings?.klevu_uc_userOptions.enablePersonalisationInSearch) {
        this.usePersonalisation = true
      }
      if (this.showRecentlyViewedProducts === undefined)
        this.showRecentlyViewedProducts = settings?.klevu_uc_userOptions.showRecentlyViewedItems
      if (this.tLastClickedProductsCaption === undefined)
        this.tLastClickedProductsCaption =
          settings?.klevu_uc_userOptions.showRecentlyViewedItemsCaption ??
          getTranslation("quicksearch.tLastClickedProductsCaption")
      if (this.tTrendingCaption === undefined)
        this.tTrendingCaption =
          settings?.klevu_uc_userOptions.showTrendingProductsCaption ?? getTranslation("quicksearch.tTrendingCaption")
      if (this.showRecentSearches === undefined) this.showRecentSearches = settings?.klevu_showRecentSerches
      if (this.showPopularSearches === undefined) this.showPopularSearches = settings?.klevu_showPopularSearches
      if (this.showTrendingProducts === undefined)
        this.showTrendingProducts = settings?.klevu_uc_userOptions.showTrendingProducts

      // No results page settings
      if (this.tPopularProductsTitleOnNoResultsPage === undefined)
        this.tPopularProductsTitleOnNoResultsPage =
          settings?.klevu_uc_userOptions.noResultsOptions.productsHeading ??
          getTranslation("quicksearch.tPopularProductsTitle")
      if (this.showTrendingProductsOnNoResultsPage === undefined)
        this.showTrendingProductsOnNoResultsPage = settings?.klevu_uc_userOptions.noResultsOptions.showPopularProducts
      if (this.showPopularKeywordsOnNoResultsPage === undefined)
        this.showPopularKeywordsOnNoResultsPage = settings?.klevu_uc_userOptions.noResultsOptions.showPopularKeywords

      if (this.showTrendingProducts || this.showTrendingProductsOnNoResultsPage) {
        const trendingProductsQuery = await KlevuFetch(
          trendingProducts({
            limit: this.popularProductsCount,
          })
        )
        const resultObject = trendingProductsQuery.queriesById("trendingProducts")
        if (resultObject) {
          this.trendingProducts = resultObject.records
          this.#emitChangedData()
        }
      }
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

  #isNoResultsPage() {
    return !!this.#searchTerm
  }

  render() {
    return (
      <Host>
        <klevu-util-viewport
          onKlevuSizeChanged={this.#sizeChange.bind(this)}
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
            usePersonalisation={this.usePersonalisation}
          ></klevu-search-field>
          <div class="content" slot="content">
            {(this.products ?? []).length > 0 ? this.#renderResultPage() : this.#renderNoResultsPage()}
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
                      showRatings={this.showRatings}
                      showRatingsCount={this.showRatingsCount}
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
                    <klevu-product
                      product={p}
                      variant="line"
                      exportparts={parts["klevu-product"]}
                      showRatings={this.showRatings}
                      showRatingsCount={this.showRatingsCount}
                    ></klevu-product>
                  ))}
                </slot>
              </div>
            </Fragment>
          )}
        </section>
      </Fragment>
    )
  }

  #renderNoResultsPage() {
    return (
      <Fragment>
        <aside>
          {this.enableChat && (
            <klevu-button size="small" onClick={() => (this.chat = true)}>
              {this.tStartChat}
            </klevu-button>
          )}
          {((this.showPopularSearches && !this.#isNoResultsPage()) ||
            (this.showPopularKeywordsOnNoResultsPage && this.#isNoResultsPage())) && (
            <klevu-popular-searches
              onKlevuPopularSearchClicked={(event) => this.#startSearch(event.detail)}
            ></klevu-popular-searches>
          )}

          {this.showRecentSearches && !this.#isNoResultsPage() && (
            <klevu-latest-searches
              onKlevuLastSearchClicked={(event) => this.#startSearch(event.detail)}
            ></klevu-latest-searches>
          )}
        </aside>
        <section>
          <slot name="noResults">
            {this.#isNoResultsPage() && this.noResultsMessage ? (
              <p class="noResultsMessage">
                <klevu-typography variant="body-s">{this.noResultsMessage}</klevu-typography>
              </p>
            ) : null}
            <div class="tabrow">
              {((this.showTrendingProducts && !this.#isNoResultsPage()) ||
                (this.showTrendingProductsOnNoResultsPage && this.#isNoResultsPage())) && (
                <klevu-tab
                  caption={stringConcat(this.tTrendingCaption ?? getTranslation("quicksearch.tTrendingCaption"), [
                    `${this.trendingProducts?.length ?? 0}`,
                  ])}
                  active={this.activeTab === "trending"}
                  onClick={() => (this.activeTab = "trending")}
                ></klevu-tab>
              )}
              {this.showRecentlyViewedProducts && !this.#isNoResultsPage() && (
                <klevu-tab
                  caption={stringConcat(
                    this.tLastClickedProductsCaption ?? getTranslation("quicksearch.tLastClickedProductsCaption"),
                    [`${this.lastClickedProducts?.length ?? 0}`]
                  )}
                  active={this.activeTab === "last"}
                  onClick={() => {
                    if (this.lastClickedProducts?.length === 0) {
                      return
                    }
                    this.activeTab = "last"
                  }}
                  disabled={this.lastClickedProducts?.length === 0}
                ></klevu-tab>
              )}
            </div>
            {this.activeTab === "trending" && (
              <Fragment>
                {this.#isNoResultsPage() && (
                  <klevu-typography variant="body-s">{this.tPopularProductsTitleOnNoResultsPage}</klevu-typography>
                )}
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
            {this.#renderBanners()}
          </slot>
        </section>
      </Fragment>
    )
  }
  #renderBanners() {
    return this.noResultsBannerDetails.map((banner) => (
      <a href={banner.redirectUrl}>
        <img
          class="noResultsBannerImage"
          src={banner.bannerImageUrl}
          alt={banner.bannerAltTag}
          title={banner.bannerAltTag}
        />
      </a>
    ))
  }
}
