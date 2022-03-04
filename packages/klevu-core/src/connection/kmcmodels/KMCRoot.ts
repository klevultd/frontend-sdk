/**
 * KMC base settings
 */
declare module KMCRoot {
  export interface Message {
    showForTerms: string[]
    message: string
  }

  export interface Banner {
    showForTerms?: any
    showOnLandingPage: boolean
    bannerAltTag: string
    redirectUrl: string
    showOnQuickSearch: boolean
    bannerImageUrl: string
    bannerRef: number
  }

  export interface NoResultsOptions {
    showPopularProducts: boolean
    productsHeading: string
    showPopularKeywords: boolean
    messages: Message[]
    banners: Banner[]
  }

  export interface PriceFormatter {
    thousandSeparator: string
    decimalPlaces: string
    decimalSeparator: string
    appendCurrencyAtLast: boolean
    currencySymbol: string
  }

  export interface KlevuUcUserOptions {
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

  export interface KlevuPopularProductsOfSite {
    imageUrl: string
    name: string
    id: string
    url: string
  }

  export interface RootObject {
    klevu_showBannerAds: boolean
    klevu_multiSelectFilters: boolean
    klevu_abTestActive: boolean
    klevu_userAnalyticsDomain: string
    klevu_uc_userOptions: KlevuUcUserOptions
    klevu_cmsAnalyticsDomain: string
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
    klevu_popularProductsOfSite: KlevuPopularProductsOfSite[]
    klevuLayoutVersion: string
    klevu_loadMapFile: boolean
    klevu_layoutType: string
    klevu_apiDomain: string
    klevu_userSearchDomain: string
    klevu_showRecentSerches: boolean
    klevu_userJavascriptDomain: string
  }
}
