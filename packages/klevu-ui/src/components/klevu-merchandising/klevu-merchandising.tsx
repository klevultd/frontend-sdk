import {
  applyFilterWithManager,
  categoryMerchandising,
  FilterManager,
  KlevuBanner,
  KlevuFetch,
  KlevuFetchModifer,
  KlevuMerchandisingOptions,
  KlevuRecord,
  KlevuResponseQueryObject,
  KlevuSearchSorting,
  listFilters,
  personalisation,
  sendMerchandisingViewEvent,
} from "@klevu/core"
import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from "@stencil/core"
import { parts } from "../../utils/parts"
import {
  KlevuPaginationCustomEvent,
  KlevuProductCustomEvent,
  KlevuSortCustomEvent,
  KlevuUtilViewportCustomEvent,
} from "../../components"

import { KlevuInit } from "../klevu-init/klevu-init"
import { KlevuProductOnProductClick, KlevuProductSlots } from "../klevu-product/klevu-product"
import { ViewportSize } from "../klevu-util-viewport/klevu-util-viewport"
import { getTranslation } from "../../utils/getTranslation"
import { getKMCSettings } from "../../utils/getKMCSettings"

/**
 * Full merchandising app to power up your product grid pages
 *
 * @slot header - Header container
 * @slot footer - Footer container
 * @slot content - Product grid items including the grid container
 * @slot facets - Sidebar of facets content
 * @slot topbanners - Top banner content
 * @slot bottombanners - Bottom banner content
 */
@Component({
  tag: "klevu-merchandising",
  styleUrl: "klevu-merchandising.css",
  shadow: true,
})
export class KlevuMerchandising {
  /**
   * Should display pagination instead of load next
   */
  @Prop() usePagination?: boolean
  /**
   * Should use infinite scroll component to trigger load next
   */
  @Prop() useInfiniteScroll?: boolean

  /**
   * Count of products for page
   */
  @Prop() limit: number = 24

  /**
   * Which category products
   */
  @Prop() category!: string

  /**
   * Category title
   */
  @Prop() categoryTitle!: string

  /**
   * Text for load more button
   */
  @Prop() tLoadMore = getTranslation("merchandising.tLoadMore")

  /**
   * Order of results
   */
  @Prop() sort?: KlevuSearchSorting

  /**
   * How many filters per facet to show
   */
  @Prop() filterCount?: number

  /**
   * Object to override and settings on search options
   */
  @Prop() options?: KlevuMerchandisingOptions

  /**
   * Order filters in given order
   */
  @Prop() filterCustomOrder?: { [key: string]: string[] }

  /**
   * Pass custom options for the sort dropdown
   */
  @Prop()
  sortOptions?: Array<{ value: KlevuSearchSorting; text: string }>
  /**
   * Show ratings
   */
  @Prop() showRatings?: boolean

  /**
   * Show ratings count
   */
  @Prop() showRatingsCount?: boolean

  /**
   * Enable personalisation
   */
  @Prop()
  usePersonalisation?: boolean

  @State() currentViewPortSize?: ViewportSize

  #viewportUtil!: HTMLKlevuUtilViewportElement
  #layoutElement!: HTMLKlevuLayoutResultsElement
  #facetListElement!: HTMLKlevuFacetListElement

  @State() results: Array<KlevuRecord> = []
  @State() manager = new FilterManager()
  @State() loading: boolean = false
  @State() infiniteScrollingPaused?: boolean = false
  @State() searchResultTopBanners: KlevuBanner[] = []
  @State() searchResultBottomBanners: KlevuBanner[] = []

  @Element() el!: HTMLElement

  #resultObject?: KlevuResponseQueryObject

  @Event({
    composed: true,
  })
  klevuData!: EventEmitter<{ resultObject: KlevuResponseQueryObject; records: KlevuRecord[]; manager: FilterManager }>

  async connectedCallback() {
    await KlevuInit.ready()
    const settings = getKMCSettings()
    if (settings) {
      if (this.showRatings === undefined) {
        this.showRatings = settings.klevu_uc_userOptions?.showRatingsOnCategoryPage || false
      }
      if (this.showRatingsCount === undefined) {
        this.showRatingsCount = settings.klevu_uc_userOptions?.showRatingsCountOnCategoryPage || false
      }
      if (this.usePersonalisation === undefined && settings?.klevu_uc_userOptions.enablePersonalisationInCatNav) {
        this.usePersonalisation = true
      }
    }
    await this.#fetchData()
  }

  @Watch("category")
  async watchPropHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.manager.clear()
      await this.#fetchData()
    }
  }

  async #fetchData() {
    this.loading = true

    const modifiers: KlevuFetchModifer[] = [
      sendMerchandisingViewEvent(this.categoryTitle),
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

    const result = await KlevuFetch(
      categoryMerchandising(this.category, { limit: this.limit, sort: this.sort, ...this.options }, ...modifiers)
    )
    this.#resultObject = result.queriesById("categoryMerchandising")
    this.results = this.#resultObject?.records ?? []

    const allBanners = await this.#resultObject.getBanners()
    this.searchResultTopBanners = allBanners.filter((b) => b.position === "top")
    this.searchResultBottomBanners = allBanners.filter((b) => b.position === "bottom")

    this.#emitChanges()
    this.loading = false
  }

  async #loadMore() {
    if (!this.#resultObject?.getPage) {
      return
    }
    this.loading = true
    const nextResultObject = await this.#resultObject.getPage()
    this.#resultObject = nextResultObject?.queriesById("categoryMerchandising")
    this.results = [...this.results, ...(this.#resultObject?.records ?? [])]
    this.#emitChanges()
    this.loading = false
  }

  @Listen("klevuLoadMore")
  infiniteScrollLoadMoreHandler() {
    this.#loadMore()
  }

  @Listen("klevuInfiniteScrollingPaused")
  infiniteLoadPausedHandler() {
    this.infiniteScrollingPaused = true
  }

  async #paginationChange(event: KlevuPaginationCustomEvent<number>) {
    if (!this.#resultObject?.getPage) {
      return
    }
    this.loading = true
    const nextResultObject = await this.#resultObject.getPage({ pageIndex: event.detail - 1 })
    this.#resultObject = nextResultObject?.queriesById("categoryMerchandising")
    this.results = this.#resultObject?.records ?? []

    this.#emitChanges()
    this.loading = false
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

  async #sortChanged(event: KlevuSortCustomEvent<KlevuSearchSorting>) {
    this.sort = event.detail
    await this.#fetchData()
  }

  @Listen("klevuProductClick")
  productClickHandler(event: KlevuProductCustomEvent<KlevuProductOnProductClick>) {
    if (!event.detail.product.id || !event.detail.product.itemGroupId) {
      return
    }
    if (this.#resultObject?.categoryMerchandisingClickEvent) {
      this.#resultObject?.categoryMerchandisingClickEvent({
        productId: event.detail.product.id,
        variantId: event.detail.product.itemGroupId,
        categoryTitle: this.categoryTitle,
      })
    }
  }

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.#viewportUtil.getCurrentSize()
  }

  #applyFilters() {
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

  #isMobile() {
    return this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"
  }

  #mobileDrawerOpened() {
    this.#facetListElement.updateApplyFilterState()
  }

  render() {
    const showInfiniteScroll =
      this.useInfiniteScroll &&
      !this.infiniteScrollingPaused &&
      this.results.length > 0 &&
      this.#resultObject?.hasNextPage()
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
              accordion
              customOrder={this.filterCustomOrder}
              manager={this.manager}
              useApplyButton={this.#isMobile()}
              onKlevuApplyFilters={this.#applyFilters.bind(this)}
            ></klevu-facet-list>
          </slot>
          <div slot="header" class="header">
            <klevu-typography variant="h1">{this.categoryTitle}</klevu-typography>
            <klevu-sort
              variant="inline"
              onKlevuSortChanged={this.#sortChanged.bind(this)}
              options={this.sortOptions}
            ></klevu-sort>
          </div>
          <slot name="content" slot="content">
            <slot name="topbanners">
              {this.searchResultTopBanners.map((b) => (
                <klevu-banner imageUrl={b.bannerImg} linkUrl={b.redirectUrl} altText={b.bannerAltTag}></klevu-banner>
              ))}
            </slot>
            <klevu-product-grid>
              {this.results.map((p) => (
                <klevu-product
                  product={p}
                  fixedWidth
                  exportparts={parts["klevu-product"]}
                  showRatings={this.showRatings}
                  showRatingsCount={this.showRatingsCount}
                ></klevu-product>
              ))}
            </klevu-product-grid>
            {this.loading && !this.infiniteScrollingPaused && <klevu-loading-indicator />}
            <slot name="bottombanners">
              {this.searchResultBottomBanners.map((b) => (
                <klevu-banner imageUrl={b.bannerImg} linkUrl={b.redirectUrl} altText={b.bannerAltTag}></klevu-banner>
              ))}
            </slot>
          </slot>
          <div slot="footer" class="footer">
            {showInfiniteScroll ? (
              <klevu-util-infinite-scroll
                infiniteScrollPauseThreshold={3}
                enabled={!!this.#resultObject?.hasNextPage() && !this.loading}
              ></klevu-util-infinite-scroll>
            ) : this.usePagination && this.#resultObject ? (
              <klevu-pagination
                queryResult={this.#resultObject}
                onKlevuPaginationChange={this.#paginationChange.bind(this)}
              ></klevu-pagination>
            ) : this.#resultObject?.hasNextPage() ? (
              <klevu-button onClick={this.#loadMore.bind(this)}>{this.tLoadMore}</klevu-button>
            ) : null}
          </div>
        </klevu-layout-results>
      </Host>
    )
  }
}
