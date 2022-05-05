import {
  KlevuTypeOfRequest,
  KlevuBaseQuerySettings,
  KlevuApplyFilter,
  KlevuListFilter,
} from "."

/**
 * Generic
 */
export type KlevuBaseQuery = {
  id: string
  /**
   * This parameter defines the type of request it is
   */
  typeOfRequest: KlevuTypeOfRequest

  /**
   * Specify a value of true for any queries that should not be executed until
   * some particular criteria are met, in another query. It is not possible for
   * a fallback query to have its own fallback query.
   *
   * Use fallback() modifier to simplify usage
   */
  isFallbackQuery?: boolean

  /**
   * Apply certain filters to query. Recommended to use modifier functions for these.
   */
  filters?: KlevuListFilter & KlevuApplyFilter

  /**
   * There are numerous settings, preferences and configurations available with
   * APIv2 to fine-tune your search and category merchandising queries. This
   * section explores them in more detail.
   */
  settings?: KlevuBaseQuerySettings

  /**
   * If you have already built up a profile of your customer and would like to
   * use what you know about them to promote certain results, you can use the
   * boost object within each record query.
   *
   * There are three ways the records can be boosted:
   *
   * filter conditions keywords or phrases IDs of specific records For example
   * let's say you have an online store with an area where customers can log in.
   *
   * From your stores purchase history, you know that one customer is
   * particularly interested in the brand 'KKE'.
   *
   * From your analytics data, you also know the same customer also looked at
   * the product detail page of the product with ID: '31366487375934' many
   * times.
   *
   * Finally, you have an area where customers can specify keywords of their
   * interests, and this customer wrote 'comfortable'.
   *
   * As a merchant with all of this information available, you can build up a
   * profile about this customer. The sample to the right shows how you would
   * convey this information to Klevu during a search.
   *
   * To find out more about how boosting works with your existing merchandising
   * rules, please read this article on How [Personalisation
   * Works](https://help.klevu.com/support/solutions/articles/5000871357-how-does-it-work-).
   */
  boost?: {
    /**
     * Specify filter values to apply a boosting score to. They key is the
     * unique identifier of the attribute, eg. Color. Each of the values
     * represents the value of that filter to boost, eg. red or blue.
     */
    filters?: Array<{
      key: string
      values: string[]
      /**
       * The boosting value to be applied, a decimal between 0 - 999. Please
       * specify values above 1 for boosting the records up the rankings, and a
       * value of 0 to 1 to de-boost records down the rankings.
       */
      weight: number
    }>
    /**
     * Specify keywords or phrases to apply a boosting score to, for example
     * "comfortable".
     */
    keywords?: Array<{
      /**
       * keyword
       */
      phrase: string
      /**
       * The boosting value to be applied, a decimal between 0 - 999. Please
       * specify values above 1 for boosting the records up the rankings, and a
       * value of 0 to 1 to de-boost records down the rankings.
       */
      weight: number
    }>
    /**
     * Specify the Klevu ID of any records to apply a boosting score to.
     */
    records?: Array<{
      /**
       * Record id
       */
      id: string
      /**
       * The boosting value to be applied, a decimal between 0 - 999. Please
       * specify values above 1 for boosting the records up the rankings, and a
       * value of 0 to 1 to de-boost records down the rankings.
       */
      weight: number
    }>
  }
}
