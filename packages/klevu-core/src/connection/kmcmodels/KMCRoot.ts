export interface KMCRootObject {
  /**
   * Is A/B test active
   */
  klevu_abTestActive: boolean
  /**
   * Messages and banners created by user in KMC
   */
  klevu_uc_userOptions: KlevuUcUserOptions
  /**
   * Popular terms in the store
   */
  klevu_webstorePopularTerms: string[]
  /**
   * Most popular products of the store
   */
  klevu_popularProductsOfSite: KlevuPopularProductsOfSite[]
  /**
   * Domain to send cms analytics to
   */
  klevu_cmsAnalyticsDomain: string
  /**
   * Domain to send search analytics to
   */
  klevu_userSearchDomain: string
  /**
   * Domain where JSv2 is hosted on
   */
  klevu_userJavascriptDomain: string

  /**
   * used to switch between grid or list view of the quick basic view
   */
  klevu_layoutView: string

  /**
   * used for displaying product sku in the product cards as part of the name
   */
  klevu_showProductCode: boolean
  /**
   * activates popular products section of quicksearch (documented under the
   * popular-searches theme component)
   */
  klevu_showPopularSearches: boolean

  /**
   * activates the price slider
   */
  klevu_showPriceSlider: boolean
  /**
   * activates the display of add to cart button
   */
  klevu_addToCartEnabled: boolean
  /**
   * the limit for the query of products and category for the slim quick view
   * design(cms is hardcoded to 3)
   */
  klevu_productsToShowInSlimLayout: string
  /**
   * activates the tab cms content
   */
  klevu_cmsEnabled: boolean
  /**
   * activates the filters on the left for quick grid view layout, defaults to
   * true
   */
  klevu_filtersOnLeft: boolean
  /**
   * activates the display of price filter and price block in product card
   */
  klevu_showPrices: boolean

  /**
   * used by ab test to define the domain of the api, in plan to move all apis
   * to the same domain
   */
  klevu_apiDomain: string
  /**
   * activates recent search's section of quick (documented under the
   * recent-searches theme component)
   */
  klevu_showRecentSerches: boolean
  /**
   * used to activate the filters
   */
  klevu_filtersEnabled: boolean
  /**
   * @deprecated not in use , used by jsv1 to load extra files
   */
  klevu_isSearchActive: boolean //
  /**
   * @deprecated not in use , used by jsv1 to enable extra file loading
   */
  klevu_fluidLayoutEnabled: boolean
  /**
   * @deprecated not in use , similar to klevu_userAnalyticsDomain
   */
  klevu_cmsSearchDomain: string
  /**
   * @deprecated unknown
   */
  klevu_lookForDataInSameFeed: boolean
  /**
   * @deprecated not in use , used by jsv1 for loading version of layout , could
   * not be expanded in kmc to support jsv2 theme versions
   */
  klevuLayoutVersion: string //
  /**
   * @deprecated not in use , used by jsv1 to know if the url map file should be
   * loaded
   */
  klevu_loadMapFile: boolean
  /**
   * @deprecated quick search layout type, basic or slim, defaults to basic
   */
  klevu_layoutType: string
  /**
   * @deprecated not in use, originally used for different api key for cms
   * content
   */
  klevu_cmsApiKey: string
  /**
   * @deprecated not in use , enable category search
   */
  klevu_categorySearchEnabled: boolean

  /**
   * @deprecated not in use, used to control if banner are displayed or not,
   * currently control via the return of banner list
   */
  klevu_showBannerAds: boolean

  /**
   * @deprecated not in use, used to control if a item is single or multi
   * select, control is done via BE atm in the returned filters list
   */
  klevu_multiSelectFilters: boolean //
  /**
   * @deprecated not in use, controlled the domain of the analytics calls , not
   * in use as analytics live now under same doamin
   */
  klevu_userAnalyticsDomain: string
  /**
   * @deprecated not in use, as its controlled from search BE
   */
  klevu_showOutOfStock: boolean
  /**
   * @deprecated not in use, during trial used to have klevu watermark, no
   * longer a option so not used
   */
  klevu_logoFreeSearch: boolean
  /**
   * @deprecated not in use , because of no results redesign, it was to show the
   * popular terms in the no results pannel.
   */
  klevu_showPopuralTerms: boolean
}

interface KlevuPopularProductsOfSite {
  imageUrl: string
  name: string
  id: string
  url: string
}

interface KlevuUcUserOptions {
  addToCartButton: string
  enablePersonalisationInCatNav: boolean
  enablePersonalisationInSearch: boolean
  isFullImageUrlProvided: boolean
  noImageUrl: string
  noResultsOptions: NoResultsOptions
  outOfStockCaption: string
  priceFormatter: PriceFormatter
  priceInterval: string
  showFiltersInMobile: boolean
  showProductSwatches: boolean
  showRatingsOnCategoryPage: boolean
  showRatingsOnQuickSearches: boolean
  showRatingsOnSearchResultsLandingPage: boolean
  /**
   * Show recently viewed products. Show search-led clicked products based on shopper's personalized search history.
   */
  showRecentlyViewedItems: boolean
  /**
   * Caption for recently viewed products
   */
  showRecentlyViewedItemsCaption: string
  showRolloverImage: boolean
  showSearchBoxOnLandingPage: boolean
  /**
   * Show trending products. Show the most trending products based on shopper's personalized search history. It may take upto 12 hours to build store-wide trending products.
   */
  showTrendingProducts: boolean
  /**
   * Caption for trending products
   */
  showTrendingProductsCaption: string
  vatCaption: string
}
interface PriceFormatter {
  /**
   * Thousands separator
   */
  thousandSeparator: string
  /**
   * Digits after dedimal
   */
  decimalPlaces: string
  /**
   * Character used for decimal
   */
  decimalSeparator: string
  /**
   * If true, currency will be appended at the end of the price
   */
  appendCurrencyAtLast: boolean
  /**
   * Currency symbol
   */
  currencySymbol: string
}

/**
 * Personalized Error Recommendations (KMC)
 */
interface NoResultsOptions {
  messages: Message[]
  banners: Banner[]
}

interface Banner {
  showForTerms: string[]
  showOnLandingPage: boolean
  bannerAltTag: string
  redirectUrl: string
  showOnQuickSearch: boolean
  bannerImageUrl: string
  bannerRef: number
}

interface Message {
  showForTerms: string[] | null
  message: string
}
