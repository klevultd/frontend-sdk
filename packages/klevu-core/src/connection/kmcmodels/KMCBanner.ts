/**
 * KMC banner model
 */

interface KlevuBanner {
  showForTerms: string[]
  showOnLandingPage: boolean
  bannerAltTag: string
  redirectUrl: string
  showOnQuickSearch: boolean
  endDate: string
  bannerName: string
  position: string
  bannerImg: string
  bannerRef: number
  showOnCategoryPage: boolean
  startDate: string
}

export interface KMCBannerRootObject {
  klevu_banner: KlevuBanner[]
}
