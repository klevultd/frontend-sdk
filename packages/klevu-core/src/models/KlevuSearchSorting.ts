export enum KlevuSearchSorting {
  /**
   * This is the default sort order, which uses a combination of Klevu A.I. and
   * your own merchandising configuration to determine the order of the results.
   * Please read this article for more information about how Klevu ranks and
   * orders the results.
   */
  Relevance = "RELEVANCE",
  /**
   * Sort the results by the salePrice value of each record.
   */
  PriceAsc = "PRICE_ASC",
  /**
   * Sort the results by the salePrice value of each record.
   */
  PriceDesc = "PRICE_DESC",
  /**
   * Sort the results by the name of each record, in alphabetical order.
   */
  NameAsc = "NAME_ASC",
  /**
   * Sort the results by the name of each record, in alphabetical order.
   */
  NameDesc = "NAME_DESC",
  /**
   * Sort the results by each record's average rating, if this data has been
   * indexed in your store.
   */
  RatingAsc = "RATING_ASC",
  /**
   * Sort the results by each record's average rating, if this data has been
   * indexed in your store.
   */
  RatingDesc = "RATING_DESC",
  /**
   * Sort your records based on their published date. Please see support article
   * for important information about sorting by newness.
   */
  NewArrivalAsc = "NEW_ARRIVAL_ASC",
  /**
   * Sort your records based on their published date. Please see support article
   * for important information about sorting by newness.
   */
  NewArrivalDesc = "NEW_ARRIVAL_DESC",
}
