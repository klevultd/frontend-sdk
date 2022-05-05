export type KlevuResultEvent = {
  /**
   * Returns function to be called when search result is clicked
   */
  getSearchClickSendEvent?: () => (
    productId: string,
    variantId?: string
  ) => void
  /**
   * Returns function to be called when category item is clicked
   */
  getCategoryMerchandisingClickSendEvent?: () => (
    productId: string,
    categoryTitle: string,
    variantId?: string
  ) => void
  /**
   * Returns function to be called when recommendation item is clicked.
   */
  getRecommendationClickSendEvent?: () => (
    productId: string,
    variantId?: string
  ) => void
}
