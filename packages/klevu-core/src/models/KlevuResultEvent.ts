import type {
  KlevuEventV2Data,
  KlevuV1CategoryProductsView,
  V1SearchEvent,
} from "../events/eventRequests.js"

export type KlevuResultEvent = {
  /**
   * Returns function to be called when search result is clicked
   */
  getSearchClickSendEvent?: (
    productId: string,
    variantId?: string,
    override?: Partial<V1SearchEvent>
  ) => void
  /**
   * Returns function to be called when category item is clicked
   */
  getCategoryMerchandisingClickSendEvent?: (
    productId: string,
    categoryTitle: string,
    variantId?: string,
    override?: Partial<KlevuV1CategoryProductsView>
  ) => void
  /**
   * Returns function to be called when recommendation item is clicked.
   */
  getRecommendationClickSendEvent?: (
    productId: string,
    variantId?: string,
    override?: Partial<KlevuEventV2Data>
  ) => void

  hooks: KlevuResultEventOnResult[]
}

export type KlevuResultEventOnResult = (params: {
  type: "search" | "categoryMerchandising" | "recommendation"
  productId: string
  variantId?: string
}) => Promise<void>
