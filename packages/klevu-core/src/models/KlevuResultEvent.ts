export type KlevuResultEvent = {
  getSearchClickSendEvent?: () => (
    productId: string,
    variantId?: string
  ) => void
  getCategoryMerchandisingClickSendEvent?: () => (
    productId: string,
    categoryTitle: string,
    variantId?: string
  ) => void
  getRecommendationClickSendEvent?: () => (
    productId: string,
    variantId?: string
  ) => void
}
