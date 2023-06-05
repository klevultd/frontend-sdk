import { KlevuKMCRecommendations } from "../queries/kmcRecommendation/kmcRecommendation.js"

export type KlevuFetchFunctionParams = {
  /**
   * Current id of function
   */
  id?: string

  /**
   * term used in the search
   */
  term?: string

  /**
   * KMC recommendation information
   */
  kmcConfig?: KlevuKMCRecommendations

  /**
   * A/B test information of request
   */
  abtest?: {
    abTestId: string
    abTestVariantId: string
  }

  /**
   * Which category merchandising was called
   */
  category?: string
}
