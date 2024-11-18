import {
  applyFilterWithManager,
  FilterManager,
  KlevuFetch,
  KlevuFetchModifer,
  KlevuRecord,
  KlevuResponseQueryObject,
  KlevuSearchSorting,
  listFilters,
  personalisation,
  search,
  sendSearchEvent,
  KMCRootObject,
  trendingProducts,
  KlevuBanner,
  klaviyo,
  KlevuSearchOptions,
} from "@klevu/core"
import { Component, h, Host, Listen, Prop, State, Watch, Event, EventEmitter, Fragment } from "@stencil/core"
import {
  KlevuFacetMode,
  KlevuPaginationCustomEvent,
  KlevuProductCustomEvent,
  KlevuSortCustomEvent,
  KlevuUtilViewportCustomEvent,
  ViewportSize,
} from "../../components"

import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick } from "../klevu-product/klevu-product"
import { getTranslation } from "../../utils/getTranslation"
import { stringConcat } from "../../utils/stringConcat"
import { getKMCSettings } from "../../utils/getKMCSettings"
import { partsExports } from "../../utils/partsExports"

type NoResultsOptions = KMCRootObject["klevu_uc_userOptions"]["noResultsOptions"]
type Banner = NoResultsOptions["banners"][0]
/**
 * Full app component for search landing page
 *
 * @slot header - Header container
 * @slot footer - Footer container
 * @slot content - Product grid items including the grid container
 * @slot facets - Sidebar of facets content
 * @slot noResults - Show message when no results found
 * @slot topbanners - Top banner content
 * @slot bottombanners - Bottom banner content
 *
 * @csspart search-landing-page-header The header container
 * @csspart search-landing-page-content The content container
 * @csspart search-landing-page-sidebar The sidebar container
 * @csspart search-landing-page-footer The footer container
 */
@Component({
  tag: "klevu-search-landing-page",
  styleUrl: "klevu-search-landing-page.css",
  shadow: true,
})
export class KlevuSearchLandingPage {
  /**
   * How many results to display on a page
   */
  @Prop() limit: number = 24
  /**
   * What term was used for search
   */
  @Prop() term!: string
  /**
   * In which order to set the products
   */
  @Prop() sort?: KlevuSearchSorting
  /**
   * How many products to display in filters
   */
  @Prop() filterCount?: number
  /**
   * Order filters in a customer order
   */
  @Prop() filterCustomOrder?: { [key: string]: string[] }

  /**
   * Use pagination instead of loading more
   */
  @Prop() usePagination?: boolean
  /**
   * Should use infinite scroll component to trigger load next
   */
  @Prop() useInfiniteScroll?: boolean
  /**
   * Show ratings
   */
  @Prop() showRatings?: boolean

  /**
   * Show ratings count
   */
  @Prop() showRatingsCount?: boolean

  /**
   * The title of the page
   */
  @Prop() tSearchTitle = getTranslation("searchLandingPage.tSearchTitle")

  /**
   * Text of load more button
   */
  @Prop() tLoadMore = getTranslation("searchLandingPage.tLoadMore")

  /**
   * Enable personalization
   */
  @Prop() usePersonalisation?: boolean
  /**
   * How many products to show in popular products
   */
  @Prop() popularProductsResultCount: number = 3
  /**
   * Show the quick search box at the top of the page
   */
  @Prop() showSearch?: boolean
  /**
   * Hide filters on results page
   */
  @Prop() hideFilters?: boolean

  /**
   * Specify whether to show checkboxes or radio buttons for filters
   */
  @Prop() useMultiSelectFilters?: boolean

  /**
   * Enable Klaviyo integration
   */
  @Prop() useKlaviyo?: boolean

  /**
   * Show price as options
   */
  @Prop() showPriceAsSlider?: boolean
  /**
   * The factor to use to generate the ranges
   */
  @Prop() priceInterval = 500
  /**
   * Hides price from search results
   */
  @Prop() hidePrice?: boolean
  /**
   * Show variants count
   */
  @Prop() showVariantsCount = false

  /**
   * To update the pagination and filters to the url automatically
   */
  @Prop()
  autoUpdateUrl?: boolean
  /**
   * Object to override and settings on search options
   */
  @Prop() options?: KlevuSearchOptions
  /**
   * Pass custom options for the sort dropdown
   */
  @Prop()
  sortOptions?: Array<{ value: KlevuSearchSorting; text: string }>
  /**
   * Used to enable loading indicator
   */
  @Prop() useLoadingIndicator = false
  /**
   * Hides brand from search results
   */
  @Prop() hideBrand?: boolean
  /**
   * Hides description from search results
   */
  @Prop() hideDescription?: boolean
  /**
   * Hides hover image from search results
   */
  @Prop() hideHoverImage?: boolean
  /**
   * Hides image from search results
   */
  @Prop() hideImage?: boolean
  /**
   * Hides name from search results
   */
  @Prop() hideName?: boolean
  /**
   * Do not show swatches in products in search results
   */
  @Prop() hideSwatches?: boolean
  /**
   * Caption to show if product is out of stock in products in search results
   */
  @Prop() outOfStockCaption?: string
  /**
   * Show add to cart button in products in search results
   */
  @Prop() showAddToCart?: boolean
  /**
   * To show the product code next to product name in search results
   */
  @Prop() showProductCode?: boolean
  /**
   * Text for add to cart button in search results
   */
  @Prop() tAddToCart?: string
  /**
   * Text to be added after the price. Usually used to indicate that does the price include VAT or not in search results.
   */
  @Prop() vatCaption?: string

  @State() results: Array<KlevuRecord> = []
  @State() manager = new FilterManager()
  @State() currentViewPortSize?: ViewportSize
  @State() infiniteScrollingPaused?: boolean = false
  @State() loading?: boolean = false
  @State() noResultsMessage: string = ""
  @State() trendingProducts: KlevuRecord[] = []
  @State() noResultsBannerDetails: Banner[] = []
  @State() searchResultTopBanners: KlevuBanner[] = []
  @State() searchResultBottomBanners: KlevuBanner[] = []
  #noResultsOptions?: NoResultsOptions

  #resultObject?: KlevuResponseQueryObject
  #viewportUtil!: HTMLKlevuUtilViewportElement
  #layoutElement!: HTMLKlevuLayoutResultsElement
  #facetListElement!: HTMLKlevuFacetListElement
  #currency: string = ""

  async connectedCallback() {
    console.log("before Ready")
    await KlevuInit.ready()
    console.log("after Ready")
    await this.init()
  }

  async init() {
    const settings = getKMCSettings()
    console.log("search", { settings })
    if (settings) {
      this.#noResultsOptions = settings.klevu_uc_userOptions?.noResultsOptions
      if (this.showRatings === undefined) {
        this.showRatings = settings.klevu_uc_userOptions?.showRatingsOnSearchResultsLandingPage || false
      }
      if (this.showRatingsCount === undefined) {
        this.showRatingsCount = settings.klevu_uc_userOptions?.showRatingsCountOnSearchResultsLandingPage || false
      }
      if (this.usePersonalisation === undefined && settings?.klevu_uc_userOptions.enablePersonalisationInSearch) {
        this.usePersonalisation = true
      }
      if (this.showSearch === undefined) {
        this.showSearch = settings.klevu_uc_userOptions.showSearchBoxOnLandingPage
      }
      if (this.hideFilters === undefined) {
        this.hideFilters = !settings.klevu_filtersEnabled
      }
      if (this.useMultiSelectFilters === undefined) {
        this.useMultiSelectFilters = settings.klevu_multiSelectFilters
        this.showSearch = settings?.klevu_uc_userOptions.showSearchBoxOnLandingPage
      }
      if (this.showPriceAsSlider === undefined) {
        this.showPriceAsSlider = settings.klevu_showPriceSlider
      }
      if (this.priceInterval === undefined && typeof settings.klevu_uc_userOptions.priceInterval !== "undefined") {
        this.priceInterval = parseInt(settings.klevu_uc_userOptions.priceInterval, 10)
      }
      if (this.hidePrice === undefined) {
        this.hidePrice = !settings.klevu_showPrices
      }
      if (this.useKlaviyo === undefined && settings?.klevu_connectors?.klaviyo?.enabled) {
        this.useKlaviyo = true
      }
      this.#currency = settings.klevu_uc_userOptions.priceFormatter?.currencySymbol || ""
    }
    const showPopularProducts = settings?.klevu_uc_userOptions?.noResultsOptions?.showPopularProducts
    if (showPopularProducts) {
      const trendingProductsQuery = await KlevuFetch(
        trendingProducts({
          limit: this.popularProductsResultCount,
        })
      )
      const resultObject = trendingProductsQuery.queriesById("trendingProducts")
      if (resultObject) {
        this.trendingProducts = resultObject.records
      }
    }
    if (!this.autoUpdateUrl) await this.#fetchData()
  }

  @Watch("term")
  termChanged(oldValue: string, newValue: string) {
    this.#fetchData()
  }

  async #fetchData() {
    this.loading = true
    const rangeFilterSetting = this.showPriceAsSlider
      ? {
          key: "klevu_price",
          minMax: true,
        }
      : {
          key: "klevu_price",
          rangeInterval: this.priceInterval,
          minMax: false,
        }
    const modifiers: KlevuFetchModifer[] = [
      sendSearchEvent(),
      listFilters({
        filterManager: this.manager,
        limit: this.filterCount,
        rangeFilterSettings: [rangeFilterSetting],
      }),
      applyFilterWithManager(this.manager),
    ]

    if (this.usePersonalisation) {
      modifiers.push(personalisation())
    }

    if (this.useKlaviyo) {
      modifiers.push(klaviyo())
    }
    console.log("will search")
    const result = await KlevuFetch(
      search(this.term, { limit: this.limit, sort: this.sort, ...this.options }, ...modifiers)
    )
    this.#resultObject = result.queriesById("search")
    this.results = this.#resultObject?.records ?? []
    if (this.results.length > 0 && !this.#currency) {
      this.#currency = this.results[0].currency
    }
    this.#emitChanges()
    this.loading = false

    const allBanners = (await this.#resultObject.getBanners({ searchType: "quicksearch" })) ?? []
    this.searchResultTopBanners = allBanners.filter((b) => b.position === "top")
    this.searchResultBottomBanners = allBanners.filter((b) => b.position === "bottom")

    this.noResultsMessage = ""
    this.noResultsBannerDetails = []
    if (this.results.length === 0) {
      this.#handleNoResults()
    }
  }

  #handleNoResults() {
    this.noResultsMessage =
      this.#noResultsOptions?.messages.find((m) => m.showForTerms === null)?.message ||
      getTranslation("searchLandingPage.tNoResultsFound")
    this.noResultsBannerDetails =
      this.#noResultsOptions?.banners.filter((m) => m.showOnLandingPage && m.showForTerms === null) || []
    if (this.term) {
      const searchTermSpecificMessage = this.#noResultsOptions?.messages.find(
        (m) => m.showForTerms && m.showForTerms.includes(this.term)
      )
      if (searchTermSpecificMessage) this.noResultsMessage = searchTermSpecificMessage?.message
      const searchTermSpecificBanner =
        this.#noResultsOptions?.banners.filter(
          (m) => m.showOnLandingPage && m.showForTerms && m.showForTerms.includes(this.term)
        ) || []
      if (searchTermSpecificBanner.length > 0) this.noResultsBannerDetails.unshift(...searchTermSpecificBanner)
    }
  }

  async loadMore() {
    this.loading = true
    if (!this.#resultObject?.getPage) {
      return
    }
    const nextResultObject = await this.#resultObject.getPage()
    this.#resultObject = nextResultObject?.queriesById("search")
    this.results = [...this.results, ...(this.#resultObject?.records ?? [])]
    this.#emitChanges()
    this.loading = false
  }

  async paginationChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#resultObject?.getPage) {
      return
    }
    this.loading = true
    const nextResultObject = await this.#resultObject.getPage({ pageIndex: event.detail - 1 })
    this.#resultObject = nextResultObject?.queriesById("search")
    this.results = this.#resultObject?.records ?? []
    this.#emitChanges()
    this.loading = false
  }

  @Listen("klevuProductClick")
  productClickHandler(event: KlevuProductCustomEvent<KlevuProductOnProductClick>) {
    if (this.#resultObject?.searchClickEvent && event.detail.product.id) {
      this.#resultObject.searchClickEvent({
        productId: event.detail.product.id,
        variantId: event.detail.product.variantId || event.detail.product.id,
      })
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterManagerFiltersUpdated() {
    if (this.#isMobile()) {
      return
    }
    this.#fetchData()
  }

  @Event({
    composed: true,
  })
  klevuData!: EventEmitter<{ resultObject: KlevuResponseQueryObject; records: KlevuRecord[]; manager: FilterManager }>

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  #emitChanges() {
    if (!this.#resultObject) {
      return
    }
    this.klevuData.emit({
      resultObject: this.#resultObject,
      records: this.results,
      manager: this.manager,
    })
    this.infiniteScrollingPaused = false
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.#viewportUtil.getCurrentSize()
  }

  async #sortChanged(event: KlevuSortCustomEvent<KlevuSearchSorting>) {
    this.sort = event.detail
    await this.#fetchData()
  }

  #applyFilters() {
    this.#fetchData()
    this.#layoutElement.closeDrawer()
  }

  #isMobile() {
    return this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"
  }

  #mobileDrawerOpened() {
    this.#facetListElement.updateApplyFilterState()
  }

  #updateTerm(term: string) {
    this.term = term
  }

  render() {
    const isMobile = this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"
    const showInfiniteScroll = this.useInfiniteScroll && !this.infiniteScrollingPaused && this.results.length > 0

    let facetMode: KlevuFacetMode = "checkbox"
    if (this.useMultiSelectFilters === false) {
      facetMode = "radio"
    }
    return (
      <Host>
        <klevu-util-viewport
          onKlevuSizeChanged={this.#sizeChange.bind(this)}
          ref={(el) => (this.#viewportUtil = el as HTMLKlevuUtilViewportElement)}
        ></klevu-util-viewport>
        <klevu-layout-results
          onKlevuDrawerOpened={this.#mobileDrawerOpened.bind(this)}
          ref={(el) => (this.#layoutElement = el as HTMLKlevuLayoutResultsElement)}
          exportparts={partsExports("klevu-layout-results")}
        >
          <slot name="facets" slot="sidebar">
            <div part="search-landing-page-sidebar">
              {!this.hideFilters && (
                <klevu-facet-list
                  priceSliderCurrency={this.#currency}
                  ref={(el) => (this.#facetListElement = el as HTMLKlevuFacetListElement)}
                  customOrder={this.filterCustomOrder}
                  manager={this.manager}
                  useApplyButton={isMobile}
                  onKlevuApplyFilters={this.#applyFilters.bind(this)}
                  mode={facetMode}
                  exportparts={partsExports("klevu-facet-list")}
                  shouldUpdateUrlForFacets={this.autoUpdateUrl}
                ></klevu-facet-list>
              )}
            </div>
          </slot>
          <div slot="header" class="header" part="search-landing-page-header">
            {this.showSearch && (
              <klevu-quicksearch
                exportparts={partsExports("klevu-quicksearch")}
                term={this.term}
                onKlevuSearch={(event) => this.#updateTerm(event.detail)}
              />
            )}
            <div class="info">
              <klevu-typography slot="header" variant="h1">
                {stringConcat(this.tSearchTitle, [this.term])}
              </klevu-typography>
              {this.results?.length > 0 && (
                <klevu-sort
                  variant="inline"
                  onKlevuSortChanged={this.#sortChanged.bind(this)}
                  exportparts={partsExports("klevu-sort")}
                  options={this.sortOptions}
                ></klevu-sort>
              )}
            </div>
          </div>
          <slot name="content" slot="content">
            <div part="search-landing-page-content">
              <slot name="topbanners">
                {this.searchResultTopBanners.map((b) => (
                  <klevu-banner
                    exportparts={partsExports("klevu-banner")}
                    imageUrl={b.bannerImg}
                    linkUrl={b.redirectUrl}
                    altText={b.bannerAltTag}
                  ></klevu-banner>
                ))}
              </slot>
              {this.results?.length > 0 ? (
                <klevu-product-grid slot="content">
                  {this.results?.map((p) => (
                    <klevu-product
                      hidePrice={this.hidePrice}
                      product={p}
                      fixedWidth
                      exportparts={partsExports("klevu-product")}
                      showRatings={this.showRatings}
                      showRatingsCount={this.showRatingsCount}
                      showVariantsCount={this.showVariantsCount}
                      hideBrand={this.hideBrand}
                      hideDescription={this.hideDescription}
                      hideHoverImage={this.hideHoverImage}
                      hideImage={this.hideImage}
                      hideName={this.hideName}
                      hideSwatches={this.hideSwatches}
                      outOfStockCaption={this.outOfStockCaption}
                      showAddToCart={this.showAddToCart}
                      showProductCode={this.showProductCode}
                      tAddToCart={this.tAddToCart}
                      vatCaption={this.vatCaption}
                    ></klevu-product>
                  ))}
                </klevu-product-grid>
              ) : (
                <slot name="noResults">
                  {!this.loading && this.noResultsMessage ? (
                    <p class="noResultsMessage">
                      <klevu-typography variant="body-s">{this.noResultsMessage}</klevu-typography>
                    </p>
                  ) : (
                    !this.loading && getTranslation("searchLandingPage.tNoResultsFound")
                  )}
                  <Fragment>
                    <slot name="trending-products">
                      {this.trendingProducts.length > 0 && (
                        <Fragment>
                          <klevu-typography variant="body-s">
                            {this.#noResultsOptions?.productsHeading || ""}
                          </klevu-typography>
                          {this.trendingProducts?.map((p) => (
                            <klevu-product
                              hidePrice={this.hidePrice}
                              product={p}
                              variant="line"
                              exportparts={partsExports("klevu-product")}
                            ></klevu-product>
                          ))}
                        </Fragment>
                      )}
                    </slot>
                  </Fragment>
                  {!this.loading && this.#renderNoResultBanners()}
                  {this.#noResultsOptions?.showPopularKeywords && (
                    <klevu-popular-searches
                      exportparts={partsExports("klevu-popular-searches")}
                      onKlevuPopularSearchClicked={(event) => this.#updateTerm(event.detail)}
                    ></klevu-popular-searches>
                  )}
                </slot>
              )}

              {this.useLoadingIndicator && this.loading && !this.infiniteScrollingPaused && (
                <klevu-loading-indicator exportparts={partsExports("klevu-loading-indicator")} />
              )}
              <slot name="bottombanners">
                {this.searchResultBottomBanners.map((b) => (
                  <klevu-banner
                    exportparts={partsExports("klevu-banner")}
                    imageUrl={b.bannerImg}
                    linkUrl={b.redirectUrl}
                    altText={b.bannerAltTag}
                  ></klevu-banner>
                ))}
              </slot>
            </div>
          </slot>
          <div slot="footer" class="footer" part="search-landing-page-footer">
            {showInfiniteScroll ? (
              <klevu-util-infinite-scroll
                onKlevuLoadMore={() => {
                  this.loadMore()
                }}
                onKlevuInfiniteScrollingPaused={() => {
                  this.infiniteScrollingPaused = true
                }}
                infiniteScrollPauseThreshold={3}
                enabled={!!this.#resultObject?.hasNextPage() && !this.loading}
              ></klevu-util-infinite-scroll>
            ) : this.usePagination && this.#resultObject && this.results.length > 0 ? (
              <klevu-pagination
                shouldUpdateUrlForPage={this.autoUpdateUrl}
                exportparts={partsExports("klevu-pagination")}
                queryResult={this.#resultObject}
                onKlevuPaginationChange={this.paginationChange.bind(this)}
              ></klevu-pagination>
            ) : this.#resultObject?.hasNextPage() ? (
              <klevu-button exportparts={partsExports("klevu-button")} onClick={this.loadMore.bind(this)}>
                {this.tLoadMore}
              </klevu-button>
            ) : null}
          </div>
        </klevu-layout-results>
      </Host>
    )
  }
  #renderNoResultBanners() {
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
