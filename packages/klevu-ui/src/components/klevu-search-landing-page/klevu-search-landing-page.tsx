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
} from "@klevu/core"
import { Component, h, Host, Listen, Prop, State, Watch, Event, EventEmitter, Fragment } from "@stencil/core"
import { parts } from "../../utils/parts"
import {
  KlevuPaginationCustomEvent,
  KlevuProductCustomEvent,
  KlevuSortCustomEvent,
  KlevuUtilViewportCustomEvent,
  ViewportSize,
} from "../../components"

import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import { getTranslation } from "../../utils/getTranslation"
import { stringConcat } from "../../utils/stringConcat"
import { getKMCSettings } from "../../utils/getKMCSettings"

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

  @State() results: Array<KlevuRecord> = []
  @State() manager = new FilterManager()
  @State() currentViewPortSize?: ViewportSize
  @State() infiniteScrollingPaused?: boolean = false
  @State() loading?: boolean = false
  @State() noResultsMessage: string = ""
  @State() trendingProducts: KlevuRecord[] = []
  @State() noResultsBannerDetails: Banner[] = []
  #noResultsOptions?: NoResultsOptions

  #resultObject?: KlevuResponseQueryObject

  #viewportUtil!: HTMLKlevuUtilViewportElement
  #layoutElement!: HTMLKlevuLayoutResultsElement
  #facetListElement!: HTMLKlevuFacetListElement

  async connectedCallback() {
    await KlevuInit.ready()
    const settings = getKMCSettings()
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
    }
    const showPopularProducts = settings?.klevu_uc_userOptions?.noResultsOptions.showPopularProducts
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
    await this.#fetchData()
  }

  @Watch("term")
  termChanged(oldValue: string, newValue: string) {
    this.#fetchData()
  }

  async #fetchData() {
    this.loading = true

    const modifiers: KlevuFetchModifer[] = [
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
      applyFilterWithManager(this.manager),
    ]

    if (this.usePersonalisation) {
      modifiers.push(personalisation())
    }

    const result = await KlevuFetch(search(this.term, { limit: this.limit, sort: this.sort }, ...modifiers))
    this.#resultObject = result.queriesById("search")
    this.results = this.#resultObject?.records ?? []
    this.#emitChanges()
    this.loading = false

    this.noResultsMessage = ""
    this.noResultsBannerDetails = []
    if (this.results.length === 0) {
      this.#handleNoResults()
    }
  }

  #handleNoResults() {
    this.noResultsMessage = this.#noResultsOptions?.messages.find((m) => m.showForTerms === null)?.message || ""
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
        variantId: event.detail.product.itemGroupId || event.detail.product.id,
      })
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
    this.#fetchData()
    this.#layoutElement.closeDrawer()
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

  #handlePopularKeywordClick(keyword: string) {
    this.term = keyword
  }

  render() {
    const isMobile = this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"
    const showInfiniteScroll = this.useInfiniteScroll && !this.infiniteScrollingPaused && this.results.length > 0
    return (
      <Host>
        <klevu-util-viewport
          onKlevuSizeChanged={this.#sizeChange.bind(this)}
          ref={(el) => (this.#viewportUtil = el as HTMLKlevuUtilViewportElement)}
        ></klevu-util-viewport>
        <klevu-layout-results
          onKlevuDrawerOpened={this.#mobileDrawerOpened.bind(this)}
          ref={(el) => (this.#layoutElement = el as HTMLKlevuLayoutResultsElement)}
        >
          <slot name="facets" slot="sidebar">
            <klevu-facet-list
              ref={(el) => (this.#facetListElement = el as HTMLKlevuFacetListElement)}
              customOrder={this.filterCustomOrder}
              manager={this.manager}
              useApplyButton={isMobile}
              onKlevuApplyFilters={this.#applyFilters.bind(this)}
            ></klevu-facet-list>
          </slot>
          <div slot="header" class="header">
            <klevu-typography slot="header" variant="h1">
              {stringConcat(this.tSearchTitle, [this.term])}
            </klevu-typography>
            {this.results?.length > 0 && (
              <klevu-sort variant="inline" onKlevuSortChanged={this.#sortChanged.bind(this)}></klevu-sort>
            )}
          </div>
          <slot name="content" slot="content">
            {this.results?.length > 0 ? (
              <klevu-product-grid slot="content">
                {this.results?.map((p) => (
                  <klevu-product
                    product={p}
                    fixedWidth
                    exportparts={parts["klevu-product"]}
                    showRatings={this.showRatings}
                    showRatingsCount={this.showRatingsCount}
                  ></klevu-product>
                ))}
              </klevu-product-grid>
            ) : (
              <slot name="noResults">
                {this.noResultsMessage ? (
                  <p class="noResultsMessage">
                    <klevu-typography variant="body-s">{this.noResultsMessage}</klevu-typography>
                  </p>
                ) : null}
                <Fragment>
                  <slot name="trending-products">
                    {this.trendingProducts.length > 0 && (
                      <Fragment>
                        <klevu-typography variant="body-s">
                          {this.#noResultsOptions?.productsHeading || ""}
                        </klevu-typography>
                        {this.trendingProducts?.map((p) => (
                          <klevu-product
                            product={p}
                            variant="line"
                            exportparts={parts["klevu-product"]}
                          ></klevu-product>
                        ))}
                      </Fragment>
                    )}
                  </slot>
                </Fragment>
                {this.#renderBanners()}
                {this.#noResultsOptions?.showPopularKeywords && (
                  <klevu-popular-searches
                    onKlevuPopularSearchClicked={(event) => this.#handlePopularKeywordClick(event.detail)}
                  ></klevu-popular-searches>
                )}
              </slot>
            )}

            {this.loading && !this.infiniteScrollingPaused && <klevu-loading-indicator />}
          </slot>
          <div slot="footer" class="footer">
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
            ) : this.usePagination && this.#resultObject ? (
              <klevu-pagination
                queryResult={this.#resultObject}
                onKlevuPaginationChange={this.paginationChange.bind(this)}
              ></klevu-pagination>
            ) : this.#resultObject?.hasNextPage() ? (
              <klevu-button onClick={this.loadMore.bind(this)}>{this.tLoadMore}</klevu-button>
            ) : null}
          </div>
        </klevu-layout-results>
      </Host>
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
