import { KlevuRecordFields, KlevuTypeOfRecord, KlevuTypeOfSearch } from "."
import { KlevuSearchSorting } from "./KlevuSearchSorting"
import { KlevuSearchPreference } from "./KlevuSearchPreference"
import { KlevuBaseQuerySettingsQuery } from "./KlevuBaseQuerySettingsQuery"

export type KlevuBaseQuerySettings = {
  query?: KlevuBaseQuerySettingsQuery
  /**
   * The groupBy parameter takes the name of a field indexed in the Klevu
   * Search backend and ensures that there is only one record for each unique
   * value of this field in the search results.
   *
   * By default, the groupBy operation is performed on the itemGroupId field.
   * When querying for KLEVU_CATEGORY or KLEVU_CMS records, it is recommended
   * to use name as the groupBy parameter value.
   */
  groupBy?: "id" | "name"

  /**
   * In addition to Products, Categories and CMS Pages, Klevu APIv2 allows you
   * to search for custom entities.
   *
   * For example if you want to display results for recipes, articles or
   * physical stores within your search you can do so by utilising the
   * typeOfRecords parameter.
   */
  typeOfRecords?: KlevuTypeOfRecord[]

  /**
   *
   */
  fields?: KlevuRecordFields[]

  /**
   * The default sorting of results is RELEVANCE, which uses Klevu A.I. to
   * determine the order. There are various other options available which you
   * can provide to your customers as required.
   */
  sort?: KlevuSearchSorting

  /**
   * Specify the number of record you would like to display per page.
   */
  limit?: number

  /**
   * Specify the index at which to start counting the number of results from.
   *
   * The index of the first record in a result set is 0. Thus, if you want to
   * start from the 6th result, use an offset of 5.
   */
  offset?: number

  /**
   * The typeOfSearch parameter defines the behaviour when identifying matches
   *  for a searched term. For example, whether all or just one of the entered
   *  words must be matched, whether to allow spelling mistakes, etc.
   */
  typeOfSearch?: KlevuTypeOfSearch

  /**
   * There are a number of preferences available for fine-tuning your queries.
   *  For example you can control whether or not to allow fuzzy search for
   *  spelling mistakes on a query by query basis. The available searchPrefs
   *  are detailed below.
   */
  searchPrefs?: KlevuSearchPreference[]

  /**
   * The ID of another query which should be fired if the current query yields
   * too few results.
   */
  fallbackQueryId?: string

  /**
   * Use this parameter to specify the criteria for when a fallback query will
   * be fired. For example, if you would like a fallback query to fire when
   * you have two results or less, specify a value of '3'.
   */
  fallbackWhenCountLessThan?: number

  /**
   * Specify any records which should always be displayed at the top of the
   * result set. You can specify a record id to control this at variant level,
   * or a itemGroupId to control this at compound item level.
   *
   * Note that this is only applicable when the sort order is by 'RELEVANCE'.
   */
  topIds?: Array<{ key: string; value: string }>

  /**
   * Specify any records which should be included with the results, even if
   * the Klevu search query did not match them. You can specify a record id to
   * control this at variant level, or a itemGroupId to control this at
   * compound item level.
   */
  includeIds?: Array<{ key: string; value: string }>

  /**
   * Use this field to exclude certain records from the search results. You
   * can specify a record id to control this at variant level, or an
   * itemGroupId to control this at compound level.
   */
  excludeIds?: Array<{ key: string; value: string }>

  /**
   * The custom query you would like to fire, which Klevu automatically
   * converts into an appropriate query to be included with the request. Use a
   * - character before the parenthesis to exclude records matching the
   * contained condition.
   *
   * This is advanced usage of our API and you may need some help with
   * building these queries, so when you need support please reach out to us
   * via the Community Forum.
   */
  customeANDQuery?: string

  /**
   * When a customer enters a physical shop, they may express their
   * preferences to an in-store assistant by highlighting the colours they
   * like, the brands they prefer and what they have purchased before.
   *
   * The in-store assistant would then use this information to show the
   * customer products they are most likely interested in first, before
   * showing them any others that still may be suitable.
   *
   * Klevu A.I. is your online assistant.
   *
   * This personalisation can be provided in two ways:
   *
   * including some information about the customer's browsing history with
   * each request defining your own boosting rules based on information you
   * already know about the customer You can read more about how this works in
   * our [Personalisation Guide](https://help.klevu.com/support/solutions/articles/5000871361-do-you-offer-apis-for-personalisation-).
   */
  personalisation?: {
    /**
     * This must be set to 'true' for enabling personalisation on a particular
     * request. If set to 'false', the recent objects within the context
     * object will be ignored
     */
    enablePersonalisation: true
    /**
     * This is an optional field. By default, Klevu will analyse all
     * attributes of the records the customer has interacted with, in order to
     * determine the common patterns. If you prefer to focus on particular
     * aspects, for example brand or price, specify those attributes within
     * this object.
     */
    fields?: KlevuRecordFields[]
  }

  context?: {
    /**
     * @TODO: Rewrite this doc. Describe how personalisation works
     *
     * Use this object to specify the records (e.g. products, categories,
     * etc.) that were recently interacted with by a customer.
     *
     * Please only specify one recentObject object per record type, one for
     * all KLEVU_PRODUCT entries, another for all KLEVU_CMS pages visited,
     * etc.
     *
     * Each recentObject object may contain multiple record objects (e.g. 5
     * recently viewed products). The most recently clicked record should be
     * the first element in the array.
     */
    recentObjects: Array<{
      /**
       * Type of visited record
       */
      typeOfRecord: KlevuTypeOfRecord
      /**
       * Id's of records
       */
      records: Array<{ id: string }>
    }>
  }
}
