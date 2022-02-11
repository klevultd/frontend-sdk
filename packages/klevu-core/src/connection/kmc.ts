import Axios from "axios"
import { KlevuConfig } from ".."

const url = "https://js.klevu.com/klevu-js-v1/klevu-js-api/"

export async function KlevuKMCSettings() {
  const start = `${url}${KlevuConfig.apiKey}`
  const res = await Promise.all([
    Axios.get<RootObject>(`${start}.json`).then((r) => r.data),
    Axios.get<BannerRootObject>(`${start}-banner.json`).then((r) => r.data),
    Axios.get<MapsRootObject>(`${start}-maps.json`).then((r) => r.data),
  ])

  return {
    root: res[0],
    banner: res[1],
    maps: res[2],
  }
}

export interface NoResultsOptions {
  messages: any[]
  banners: any[]
}

export interface KlevuUcUserOptions {
  addToCartButton: string
  showRolloverImage: boolean
  showProductSwatches: boolean
  enablePersonalisationInCatNav: boolean
  noResultsOptions: NoResultsOptions
  noImageUrl: string
  showRatingsOnCategoryPage: boolean
  enablePersonalisationInSearch: boolean
  isFullImageUrlProvided: boolean
  priceInterval: string
  showRecentlyViewedItems: boolean
  showTrendingProducts: boolean
  showRatingsOnQuickSearches: boolean
  showRatingsOnSearchResultsLandingPage: boolean
  showFiltersInMobile: boolean
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
  klevu_webstorePopularTerms: string[]
  klevu_cmsSearchDomain: string
  klevu_lookForDataInSameFeed: boolean
  klevuLayoutVersion: string
  klevu_loadMapFile: boolean
  klevu_layoutType: string
  klevu_apiDomain: string
  klevu_userSearchDomain: string
  klevu_showRecentSerches: boolean
  klevu_userJavascriptDomain: string
}

export interface KlevuBanner {
  showForTerms?: any
  showOnLandingPage: boolean
  bannerAltTag: string
  redirectUrl: string
  showOnQuickSearch: boolean
  endDate: string
  bannerName: string
  position: string
  bannerRef: number
  bannerImg: string
  showOnCategoryPage: boolean
  startDate: string
}

export interface BannerRootObject {
  klevu_banner: KlevuBanner[]
}

export interface MapsRootObject {
  klevu_autoCorrectMap: any[]
  klevu_keywordUrlMap: any[]
}
