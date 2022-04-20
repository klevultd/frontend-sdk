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
}

interface KlevuPopularProductsOfSite {
  imageUrl: string
  name: string
  id: string
  url: string
}

interface KlevuUcUserOptions {
  enablePersonalisationInCatNav: boolean
  enablePersonalisationInSearch: boolean
  noImageUrl: string
  noResultsOptions: NoResultsOptions
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
