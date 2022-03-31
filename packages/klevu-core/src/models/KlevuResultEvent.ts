export type KlevuResultEvent = {
  getSearchClickManager?: () => (productId: string, variantId?: string) => void
  getCategoryMerchandisingClickManager?: () => (
    productId: string,
    categoryTitle: string,
    variantId?: string
  ) => void
  getRecommendationClickManager?: () => (
    productId: string,
    variantId?: string
  ) => void
}
