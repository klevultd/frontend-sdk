import type {
  KlevuRecommendationsEventV2Data,
  KlevuV1CategoryProductsView,
  V1SearchEvent,
} from "../events/eventRequests.js"

export type KlevuResultEvent = {
  /**
   * Returns function to be called when search result is clicked
   */
  searchClickEvent?: (params: {
    productId: string
    variantId?: string
    autoSendViewEvent?: boolean
    override?: Partial<V1SearchEvent>
  }) => void
  /**
   * Returns function to be called when category item is clicked
   */
  categoryMerchandisingClickEvent?: (params: {
    productId: string
    categoryTitle: string
    variantId?: string
    override?: Partial<KlevuV1CategoryProductsView>
  }) => void
  /**
   * Returns function to be called when recommendation item is clicked.
   */
  recommendationClickEvent?: (params: {
    productId: string
    variantId?: string
    override?: Partial<KlevuRecommendationsEventV2Data>
  }) => void

  /**
   * Returns function to be called when recommendation banner is clicked.
   */
  recommendationBannerClickEvent?: (params: {
    resolution: "desktop" | "mobile"
  }) => void

  hooks: KlevuResultEventOnResult[]
}

export type KlevuResultEventOnResult = (params: {
  type: "search" | "categoryMerchandising" | "recommendation"
  productId: string
  variantId?: string
}) => Promise<void>
