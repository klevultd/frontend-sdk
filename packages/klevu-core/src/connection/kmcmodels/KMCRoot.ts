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

  klevu_showBannerAds: boolean
  klevu_multiSelectFilters: boolean
  klevu_userAnalyticsDomain: string
  klevu_showOutOfStock: boolean
  klevu_logoFreeSearch: boolean
  klevu_layoutView: string
  klevu_showPopuralTerms: boolean
  klevu_showProductCode: boolean
  klevu_showPopularSearches: boolean
  klevu_cmsApiKey: string
  klevu_categorySearchEnabled: boolean
  klevu_showPriceSlider: boolean
  klevu_addToCartEnabled: boolean
  klevu_productsToShowInSlimLayout: string
  klevu_cmsEnabled: boolean
  klevu_filtersOnLeft: boolean
  klevu_showPrices: boolean
  klevu_isSearchActive: boolean
  klevu_filtersEnabled: boolean
  klevu_fluidLayoutEnabled: boolean
  klevu_cmsSearchDomain: string
  klevu_lookForDataInSameFeed: boolean
  klevuLayoutVersion: string
  klevu_loadMapFile: boolean
  klevu_layoutType: string
  klevu_apiDomain: string
  klevu_showRecentSerches: boolean
}

interface KlevuPopularProductsOfSite {
  imageUrl: string
  name: string
  id: string
  url: string
}

interface KlevuUcUserOptions {
  addToCartButton: string
  showRolloverImage: boolean
  showProductSwatches: boolean
  vatCaption: string
  enablePersonalisationInCatNav: boolean
  outOfStockCaption: string
  noResultsOptions: NoResultsOptions
  noImageUrl: string
  showRatingsOnCategoryPage: boolean
  showTrendingProductsCaption: string
  enablePersonalisationInSearch: boolean
  isFullImageUrlProvided: boolean
  showSearchBoxOnLandingPage: boolean
  showRecentlyViewedItemsCaption: string
  priceInterval: string
  priceFormatter: PriceFormatter
  showRecentlyViewedItems: boolean
  showTrendingProducts: boolean
  showRatingsOnQuickSearches: boolean
  showRatingsOnSearchResultsLandingPage: boolean
  showFiltersInMobile: boolean
}
interface PriceFormatter {
  thousandSeparator: string
  decimalPlaces: string
  decimalSeparator: string
  appendCurrencyAtLast: boolean
  currencySymbol: string
}

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
