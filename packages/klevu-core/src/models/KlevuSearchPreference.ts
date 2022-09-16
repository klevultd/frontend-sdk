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

  /**
   * @TODO: Most probably ignores manual boostin. Needs proper documentation
   */
  ignoreManualBoosting = "ignoreManualBoosting",
}
