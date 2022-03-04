export enum KlevuTypeOfSearch {
  /**
   * When this value is specified, Klevu will go through a number of attempts to
   * find matching records. The first type attempted is WILDCARD_AND. If there
   * aren't any results found, Klevu tries to find products with the FUZZY_AND
   * query type.
   *
   * As long as no matches are found, Klevu will continue to fire different query
   * types in the following order:
   *
   * WILDCARD_AND
   * FUZZY_AND
   * WILDCARD_OR
   * FUZZY_OR
   * Note that when a search term only contains a single word, or more than six
   * words, the 'OR' query types will be skipped.
   */
  Default = "DEFAULT",
  /**
   * This is an 'AND' query so all words of the query must be found somewhere in a
   * record for it to be included in the results. The last word of the query will
   * have a wildcard suffix appended.
   *
   * For example, if the searched query is "hooded jacket", this will become
   * "hooded jacket*", ie. Klevu will try to find records containing the word
   * "hooded" AND any words beginning with "jacket".
   */
  WildcardAnd = "WILDCARD_AND",
  /**
   * This is the same as a WILDCARD_AND query, however a certain amount of
   * 'fuzziness' is allowed to account for spelling mistakes.
   *
   * For example, if the searched query contains spelling mistakes like "hooder
   * jakcet", Klevu will still be able to match any records containing the words
   * "hooded" AND "jacket".
   */
  FuzzyAnd = "FUZZY_AND",
  /**
   * This is an 'OR' query so at least one of the words in the query must be found
   * somewhere in a record for it to be included in the results. The last word of
   * the query will have a wildcard suffix appended.
   *
   * For example, if the searched query is "hooded jacket", this will become
   * "hooded jacket*", ie. Klevu will try to find records containing the word
   * "hooded" OR any words beginning with "jacket".
   */
  WildcardOr = "WILDCARD_OR",
  /**
   * This is the same as a WILDCARD_OR query, however a certain amount of
   * 'fuzziness' is allowed to account for spelling mistakes.
   *
   * For example, if the searched query contains spelling mistakes like "hooder
   * jakcet", Klevu will still be able to match any records containing the words
   * "hooded" OR "jacket".
   */
  FuzzyOr = "FUZZY_OR",
  /**
   * All of the exact words of a query must be found in a record for it to be
   * included in the results. No fuzziness or wildcards are included.
   *
   * For example a search for "hooded jacket" will only return records which
   * contain the exact terms "hooded" AND "jacket".
   */
  And = "AND",
  /**
   * At least one exact word of a query must be found in a record for it to be
   * included in a results. No fuzziness or wildcards are included.
   *
   * For example a search for "hooded jacket" will only return records which
   * contain one of the exact terms "hooded" OR "jacket".
   */
  Or = "OR",
}
