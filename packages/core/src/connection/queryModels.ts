import {
  KlevuRecordFields,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
  KlevuTypeOfSearch,
} from "../model"
import { AllQueries } from "./connection"

export enum FilterOrder {
  Frequency = "FREQ",
  Index = "INDEX",
}

export enum Sorting {
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

export enum SearchPreference {
  showOutOfStockProducts = "showOutOfStockProducts",
  /**
   * 	Whether or not your store should include 'Out of Stock' products in search results by default can be configured within the Klevu Merchant Centre. However, if you would like to override this for a particular query, please include one of these flags.
   */
  hideOutOfStockProducts = "hideOutOfStockProducts",
  /**
   * 	This can be used in conjunction with showOutOfStockProducts. If your store is configured to display out of stock products, they will be displayed at the very end of the search results after all in stock products have been displayed. By using this flag you can disable this logic, and cause all products to be ranked in an order that disregards their stock status.
   */
  disableStockSorting = "disableStockSorting",
  /**
   * 	By default, functional words such as prepositions, pronouns, articles, etc. are excluded from searches. Add this flag to include these stopwords in your search.
   */
  includeStopwords = "includeStopwords",
  /**
   * 	Use this flag to disable the searching of record IDs.
   */
  excludeIds = "excludeIds",
  /**
   * , excludeDescription	Whether or not a record's 'description' is considered for search results can be configured by Klevu Support on a store by store basis, however if you would like to override this for a particular query, please include one of these flags.
   */
  includeDescription = "includeDescription",
  /**
   * 	This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to disable the FUZZY_AND and FUZZY_OR search types from being attempted.
   */
  disableFuzzyMatch = "disableFuzzyMatch",
  /**
   * 	This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to disable the WILDCARD_AND and WILDCARD_OR search types from being attempted.
   */
  disableWildcard = "disableWildcard",
  /**
   * 	This flag can be used in conjunction with the typeOfSearch 'DEFAULT' to disable the WILDCARD_OR and FUZZY_OR search types from being attempted.
   */
  disableORSearch = "disableORSearch",
  /**
   * Enable partial match for the last word of a query, where the last word searched can be a substring of any other word found in a record. This can be useful for non-English languages.
   *
   * For example let's say a product has the name "rödvinsglas" (red wine glass). If searching for "högt glas" (tall glass) it may not match since the record has no words starting with 'glas'. By providing this flag, the search would become "högt *glas*" meaning it would match the record since it contains a word which ends with 'glas'.
   *
   */
  partialMatch = "partialMatch",

  /**
   * 	Similar to partialMatch, but for all words rather than just the last. In the same "rödvinsglas" example, a search for "högt glas" would become "*högt* *glas*", so any records containing words containing 'högt' or 'glas' would result in a match.
   */
  partialMatchForAllWords = "partialMatchForAllWords",
  /**
   * 	For a query longer than one word, all the possible bigrams and trigrams (i.e. formed out of query terms) are looked up in records and the ones having one or more of them are boosted higher up in the search results. You can use this flag to disable such boosting.
   */
  disableWordShingles = "disableWordShingles",
  /**
   * When a compound word is searched for, i.e. two or more individual words joined together as one word, Klevu automatically disjoints them if the de-compounding feature is enabled for your store.
   *
   * For example, a search for "fairylights" would be treated as "fairy lights", but with the added condition that those words must appear within 5 words of each other in a matching record.
   *
   * If you would prefer that the words "fairy" and "light" could be found anywhere within the record, not necessarily near one another, then please include this flag.
   */
  searchCompoundsAsAndQuery = "searchCompoundsAsAndQuery",

  /**
   * 	By default, synonyms are treated equally to their query term. Should you wish to give higher priority to the actual terms your customer entered in the query over their synonyms, please include this flag in your search preferences.
   */
  enableBoostingOriginalTermsInSynonyms = "enableBoostingOriginalTermsInSynonyms",
  /**
   * 	It is possible to configure which facets or filters should be enabled or disabled within the Klevu Merchant Centre. By including this flag, all facets will be returned regardless of whether they have been disabled in the KMC.
   */
  showDisabledFacets = "showDisabledFacets",
  /**
   * 	By default some filters are excluded from the results if they only have a small number of results. Please use this flag to override this logic and include all filters in the response.
   */
  showFiltersWithSmallCount = "showFiltersWithSmallCount",
  /**
   * 	When the typeOfRequest is 'CATNAV', the filter for 'Category' is automatically excluded since you are already within the context of a category. Use this flag to override this logic and return the category filters even for CatNav requests.
   */
  includeCategoryFilterInCatNav = "includeCategoryFilterInCatNav",
  /**
   * 	Include the score information with the response fields: score, klevu_manual_boosting, klevu_bulk_boosting and klevu_selflearning_boosting.
   */
  enableScores = "enableScores",
  /**
   * 	Use this flag to include additional information about the query execution. This information is populated in the meta object of the response.
   *
   * Please note that it is not recommended to enable this flag in your Production environment, as performance will be impacted.
   */
  debugQuery = "debugQuery",
}

export type KlevuBaseQueryDefaultIds = "applyFilters" | "search" | string

type KlevuBaseQuery = {
  id: KlevuBaseQueryDefaultIds
  typeOfRequest?: KlevuTypeOfRequest
}

export type KlevuDefaultOptions = {
  id: string
}

export type KlevuSearchQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.Search | KlevuTypeOfRequest.Merchandising
  doNotSendEvent?: boolean
  settings: {
    query?: {
      term?: string
      categoryPath?: string
    }
    /**
     * The groupBy parameter takes the name of a field indexed in the Klevu Search
     * backend and ensures that there is only one record for each unique value of
     * this field in the search results.
     *
     * By default, the groupBy operation is performed on the itemGroupId field.
     * When querying for KLEVU_CATEGORY or KLEVU_CMS records, it is recommended to
     * use name as the groupBy parameter value.
     */
    groupBy?: "id" | "name"
    typeOfRecords?: KlevuTypeOfRecord[]
    fields?: KlevuRecordFields[]
    sort?: Sorting
    limit?: number
    offset?: number
    typeOfSearch?: KlevuTypeOfSearch
    searchPrefs?: SearchPreference[]
  }
}

export function isKlevuSearchQuery(
  query: AllQueries
): query is KlevuSearchQuery {
  return (
    query.typeOfRequest === KlevuTypeOfRequest.Search ||
    query.typeOfRequest === KlevuTypeOfRequest.Merchandising
  )
}

export type RangeFilterSettings = {
  /**
   * This is the identifier of your numerical attribute, eg. 'klevu_price'.
   */
  key: string
  /**
   * If set to true, the Klevu Search engine calculates the minimum and
   *  maximum values for this filter for use with a slider.
   */
  minMax: boolean
  /**
   * If a positive value is provided, the Klevu Search engine will calculate
   * ranges for this value. For example a value of 100 would give
   * ranges from 0 to 99, 100 to 299, etc.
   */
  rangeInterval?: number
}

export type KlevuListFilterQuery = KlevuBaseQuery & {
  filters: {
    filtersToReturn?: {
      /**
       * Whether or not to return any filters with this query. This defaults to
       *  false so no filters are returned unless requested.
       */
      enabled: boolean
      /**
       * This is the list of filter keys that you would like to retrieve as
       * filters. A filter may also not be returned if there aren't enough applicable records in the result set.
       */
      include: string[]
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
         *  are included.
         */
        mincount?: number
      }
      /**
       * When minMax is false, this setting allows you to retrieve range
       * filters for use with numeric values such as price, so you can display
       *  bands of 0-99, 100-199, etc. or a price slider.
       *
       * By default all attributes submitted to Klevu are indexed as STRING
       * attributes, which means they cannot be used as range filters. The
       * product sale price field is the only exception to this rule, which
       * is filtered using the key klevu_price. If you have explicitly
       * requested and Klevu has approved that certain attributes be indexed
       * as numerical attributes, you can also retrieve those as range filters.
       */
      rangeFilterSettings?: RangeFilterSettings[]
    }
  }
}

export type KlevuApplyFilterQuery = KlevuBaseQuery & {
  filters: {
    applyFilters: {
      filters: Array<{
        key: string
        values: string[] | [number, number]
        settings: {
          singleSelect: boolean
        }
      }>
    }
  }
}

export type KlevuNewArrivalsQuery = KlevuBaseQuery & {
  typeOfRequest: KlevuTypeOfRequest.NewArrivals
  settings?: {
    query?: {
      categoryPath: string
    }
  }
}

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
  | KlevuSearchQuery
  | KlevuNewArrivalsQuery
  | KlevuSimilarProcutsQuery
  | KlevuTrendingProductsQuery
  | KlevuAlsoViewedQuery
  | KlevuListFilterQuery
  | KlevuApplyFilterQuery
