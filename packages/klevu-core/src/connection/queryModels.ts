import {
  KlevuRecord,
  KlevuRecordFields,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
  KlevuTypeOfSearch,
} from "../model"
import { FilterManager } from "../store/filterManager"

export enum FilterOrder {
  Frequency = "FREQ",
  Index = "INDEX",
}

export enum KlevuSorting {
  Relevance = "RELEVANCE",
  PriceAsc = "PRICE_ASC",
  PriceDesc = "PRICE_DESC",
  NameAsc = "NAME_ASC",
  NameDesc = "NAME_DESC",
  RatingAsc = "RATING_ASC",
  RatingDesc = "RATING_DESC",
  NewArrivalAsc = "NEW_ARRIVAL_ASC",
  NewArrivalDesc = "NEW_ARRIVAL_DESC",
}

export enum KlevuSearchPreference {
  showOutOfStockProducts = "showOutOfStockProducts",
  /**
   * 	Whether or not your store should include 'Out of Stock' products in search
   * 	results by default can be configured within the Klevu Merchant Centre.
   * 	However, if you would like to override this for a particular query, please
   * 	include one of these flags.
   */
  hideOutOfStockProducts = "hideOutOfStockProducts",
  /**
   * 	This can be used in conjunction with showOutOfStockProducts. If your store
   * 	is configured to display out of stock products, they will be displayed at
   * 	the very end of the search results after all in stock products have been
   * 	displayed. By using this flag you can disable this logic, and cause all
   * 	products to be ranked in an order that disregards their stock status.
   */
  disableStockSorting = "disableStockSorting",
  /**
   * 	By default, functional words such as prepositions, pronouns, articles,
   * 	etc. are excluded from searches. Add this flag to include these stopwords
   * 	in your search.
   */
  includeStopwords = "includeStopwords",
  /**
   * 	Use this flag to disable the searching of record IDs.
   */
  excludeIds = "excludeIds",
  /**
   * , excludeDescription Whether or not a record's 'description' is considered
   * for search results can be configured by Klevu Support on a store by store
   * basis, however if you would like to override this for a particular query,
   * please include one of these flags.
   */
  includeDescription = "includeDescription",
  /**
   * 	This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to
   * 	disable the FUZZY_AND and FUZZY_OR search types from being attempted.
   */
  disableFuzzyMatch = "disableFuzzyMatch",
  /**
   * 	This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to
   * 	disable the WILDCARD_AND and WILDCARD_OR search types from being
   * 	attempted.
   */
  disableWildcard = "disableWildcard",
  /**
   * 	This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to
   * 	disable the WILDCARD_OR and FUZZY_OR search types from being attempted.
   */
  disableORSearch = "disableORSearch",
  /**
   * Enable partial match for the last word of a query, where the last word
   * searched can be a substring of any other word found in a record. This can
   * be useful for non-English languages.
   *
   * For example let's say a product has the name "rödvinsglas" (red wine
   * glass). If searching for "högt glas" (tall glass) it may not match since
   * the record has no words starting with 'glas'. By providing this flag, the
   * search would become "högt *glas*" meaning it would match the record since
   * it contains a word which ends with 'glas'.
   *
   */
  partialMatch = "partialMatch",

  /**
   * 	Similar to partialMatch, but for all words rather than just the last. In
   * 	the same "rödvinsglas" example, a search for "högt glas" would become
   * 	"*högt* *glas*", so any records containing words containing 'högt' or
   * 	'glas' would result in a match.
   */
  partialMatchForAllWords = "partialMatchForAllWords",
  /**
   * 	For a query longer than one word, all the possible bigrams and trigrams
   * 	(i.e. formed out of query terms) are looked up in records and the ones
   * 	having one or more of them are boosted higher up in the search results.
   * 	You can use this flag to disable such boosting.
   */
  disableWordShingles = "disableWordShingles",
  /**
   * When a compound word is searched for, i.e. two or more individual words
   * joined together as one word, Klevu automatically disjoints them if the
   * de-compounding feature is enabled for your store.
   *
   * For example, a search for "fairylights" would be treated as "fairy lights",
   * but with the added condition that those words must appear within 5 words of
   * each other in a matching record.
   *
   * If you would prefer that the words "fairy" and "light" could be found
   * anywhere within the record, not necessarily near one another, then please
   * include this flag.
   */
  searchCompoundsAsAndQuery = "searchCompoundsAsAndQuery",

  /**
   * 	By default, synonyms are treated equally to their query term. Should you
   * 	wish to give higher priority to the actual terms your customer entered in
   * 	the query over their synonyms, please include this flag in your search
   * 	preferences.
   */
  enableBoostingOriginalTermsInSynonyms = "enableBoostingOriginalTermsInSynonyms",
  /**
   * It is possible to configure which facets or filters should be enabled or
   * disabled within the Klevu Merchant Centre. By including this flag, all
   * facets will be returned regardless of whether they have been disabled in
   * the KMC.
   */
  showDisabledFacets = "showDisabledFacets",
  /**
   * By default some filters are excluded from the results if they only have a
   * small number of results. Please use this flag to override this logic and
   * include all filters in the response.
   */
  showFiltersWithSmallCount = "showFiltersWithSmallCount",
  /**
   * When the typeOfRequest is 'CATNAV', the filter for 'Category' is
   * automatically excluded since you are already within the context of a
   * category. Use this flag to override this logic and return the category
   * filters even for CatNav requests.
   */
  includeCategoryFilterInCatNav = "includeCategoryFilterInCatNav",
  /**
   * Include the score information with the response fields: score,
   * klevu_manual_boosting, klevu_bulk_boosting and klevu_selflearning_boosting.
   */
  enableScores = "enableScores",
  /**
   * Use this flag to include additional information about the query execution.
   * This information is populated in the meta object of the response.
   *
   * Please note that it is not recommended to enable this flag in your
   * Production environment, as performance will be impacted.
   */
  debugQuery = "debugQuery",
}

/**
 * @ignore
 */
export type KlevuDefaultOptions = {
  id: string
}

export type KlevuBaseQuerySettings = {
  query?: {
    /**
     * This is the phrase to be searched. It can be any free text up-to 128
     * characters long. If a longer string is provided it is automatically
     * truncated after the first 128 characters.
     */
    term?: string
    categoryPath?: string
  }
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
  sort?: KlevuSorting

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

export type KlevuBaseQuery = {
  id: string
  typeOfRequest: KlevuTypeOfRequest
  doNotSendEvent?: boolean
  isFallbackQuery?: boolean
  filters?: KlevuListFilter & KlevuApplyFilter
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

export type RangeFilterSettings = {
  /**
   * This is the identifier of your numerical attribute, eg. 'klevu_price'.
   */
  key: string
  /**
   * If set to true, the Klevu Search engine calculates the minimum and maximum
   * values for this filter for use with a slider.
   */
  minMax: boolean
  /**
   * If a positive value is provided, the Klevu Search engine will calculate
   * ranges for this value. For example a value of 100 would give ranges from 0
   * to 99, 100 to 299, etc.
   */
  rangeInterval?: number
}

export type KlevuListFilter = {
  filtersToReturn?: {
    /**
     * Whether or not to return any filters with this query. This defaults to
     *  false so no filters are returned unless requested.
     */
    enabled: boolean
    /**
     * This is the list of filter keys that you would like to retrieve as
     * filters. A filter may also not be returned if there aren't enough
     * applicable records in the result set.
     */
    include?: string[]
    /**
     * This is the list of filter keys that you do not want Klevu Search to
     * include in the response. If a filter is specified in both include and
     * exclude lists, include will take precedence.
     */
    exclude?: string[]
    options: {
      /**
       * A value of 'FREQ' will sort options based on the number of records
       * each option has in the result set. 'INDEX' will sort the options
       * alphabetically.
       */
      order: FilterOrder
      /**
       * Specify the maximum number of options to be included per filter.
       */
      limit?: number
      /**
       *  If the parameter minCount is present with a positive number, only
       * the options with an option count equal to or higher than the minCount
       * are included.
       */
      mincount?: number
    }
    /**
     * When minMax is false, this setting allows you to retrieve range filters
     * for use with numeric values such as price, so you can display bands of
     * 0-99, 100-199, etc. or a price slider.
     *
     * By default all attributes submitted to Klevu are indexed as STRING
     * attributes, which means they cannot be used as range filters. The
     * product sale price field is the only exception to this rule, which is
     * filtered using the key klevu_price. If you have explicitly requested
     * and Klevu has approved that certain attributes be indexed as numerical
     * attributes, you can also retrieve those as range filters.
     */
    rangeFilterSettings?: RangeFilterSettings[]
  }
}

export type KlevuApplyFilter = {
  applyFilters?: {
    filters: Array<{
      key: string
      values: string[] | [number, number]
      settings: {
        singleSelect: boolean
      }
    }>
  }
}

/*
export type KlevuNewArrivalsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.NewArrivals
  settings?: {
    query?: {
      categoryPath: string
    }
  }
}
*/

export type KlevuSimilarProcutsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.SimilarProducts
  settings: {
    context: {
      recentObjects: Array<{
        typeOfRecord: KlevuTypeOfRecord
        records: Array<{ id: string }>
      }>
    }
  }
}

export type KlevuTrendingProductsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.Trending
  settings?: {
    personalisation?: {
      enablePersonalisation: boolean
    }
    context?: {
      recentObjects: Array<{
        typeOfRecord: KlevuTypeOfRecord
        records: Array<{ id: string }>
      }>
    }
    query?: {
      categoryPath: string
    }
  }
}

export type KlevuAlsoViewedQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.AlsoViewed
  settings?: {
    context?: {
      recentObjects: Array<{
        typeOfRecord: KlevuTypeOfRecord
        records: Array<{ id: string }>
      }>
    }
  }
}

export type KlevuAlsoBoughtQuery = KlevuBaseQuery &
  KlevuAlsoViewedQuery & {
    typeOfRequest: KlevuTypeOfRequest.AlsoBought
  }

export type KlevuSuggestionQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.Suggestion
  query: string
  limit?: number
  hlStartElem?: string
  hlEndElem?: string
}

export type AllRecordQueries =
  | KlevuBaseQuery
  | KlevuSimilarProcutsQuery
  | KlevuTrendingProductsQuery
  | KlevuAlsoViewedQuery

export type KlevuPayload = {
  context: {
    apiKeys: string[]
  }
  recordQueries?: Array<AllRecordQueries>
  suggestions?: Array<KlevuSuggestionQuery>
}

export type SuggestionResult = {
  id: string
  suggestions: Array<{
    suggest: string
  }>
}

enum FilterType {
  Options = "OPTIONS",
  Slider = "SLIDER",
}

type FilterResult = {
  key: string
  label: string
  type: FilterType
}

export type FilterResultOptions = FilterResult & {
  type: FilterType.Options
  options: Array<{
    name: string
    value: string
    count: number
    selected: boolean
  }>
}

export function isFilterResultOptions(
  filter: FilterResultOptions | FilterResultSlider
): filter is FilterResultOptions {
  return filter.type === FilterType.Options
}

export type FilterResultSlider = FilterResult & {
  type: FilterType.Slider
  min: string
  max: string
  start: string
  end: string
}

export function isFilterResultSlider(
  filter: FilterResultOptions | FilterResultSlider
): filter is FilterResultSlider {
  return filter.type === FilterType.Slider
}

type QueryResult = {
  id: string
  filters?: Array<FilterResultOptions | FilterResultSlider>
  meta: {
    apiKey: string
    isPersonalised: boolean
    /**
     * The time taken by the Klevu Search engine to fetch the response.
     */
    qTime: number

    /**
     * The number of results requested to be returned for this query.
     */
    noOfResults: number

    /**
     * The total number of results found for this query.
     */
    totalResultsFound: number

    /**
     * The index of the first result returned in this response.
     */
    offset: number

    /**
     * The query type that was executed by Klevu to retrieve the results.
     */
    typeOfSearch: KlevuTypeOfSearch

    /**
     * Information that can be useful for debugging the query. For example, the
     * actual query that was fired by the Klevu Search engine, inclusive of any
     * synonyms or de-compounded words taken into consideration.
     */
    debuggingInformation: unknown

    /**
     * This may be populated with a code if any actions were taken on the
     * record. Possible values are: 1: Nothing to report. 2: The price of the
     * record is using the base currency.
     */
    notificationCode: number

    /**
     * The search term submitted for this query.
     */
    searchedTerm: string
  }
  records: Array<{ id: string } & KlevuRecord>
}

export type KlevuApiResponse = {
  meta: {
    qTime: number
    responseCode: number
  }
  suggestionResults?: SuggestionResult[]
  queryResults?: QueryResult[]
}

export type KlevuResponse = {
  apiResponse: null | KlevuApiResponse
  suggestionsById: (id: string) => SuggestionResult | undefined
  queriesById: (id: string) => QueryResult | undefined
  next?: (override?: {
    limit?: number
    filterManager?: FilterManager
  }) => Promise<KlevuResponse>
}
