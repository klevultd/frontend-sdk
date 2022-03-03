import { LiteralUnion } from "type-fest"

export enum KlevuTypeOfRecord {
  Product = "KLEVU_PRODUCT",
  Cms = "KLEVU_CMS",
  Category = "KLEVU_CATEGORY",
}

export type KlevuRecord = {
  /**
   * The brand of the product, eg. 'Nike'.
   */
  brand: string
  /**
   * A double semicolon ;; separated list of the most specific categories, not including their full path. For example if a record was in 'Mens > Shoes' and 'Mens > Tees', the value would be Shoes;;Tees.
   */
  category: string
  /**
   * The currency code applicable to the price values being displayed.
   */
  currency: string
  deliveryInfo: string
  discount: string
  freeShipping: string
  /**
   * This field is not always populated and is mostly used in older integrations. It includes the prices of your record in format groupId:price so you can use your own frontend logic to display prices in realtime. If you are using the B2B group price search parameters described in this documentation, the price and salePrice are automatically calculated so there is no need to use this field in most cases.
   */
  groupPrices: string
  hideAddToCart: string
  hideGroupPrices: string
  /**
   * The unique identifier of the record within Klevu.
   */
  id: string
  /**
   * The fully qualified URL to the main image of your record.
   */
  image: string
  /**
   * The fully qualified URL to the secondary image of your record.
   */
  imageHover: string
  /**
   * The fully qualified URL to the main image of your record.
   */
  imageUrl: string
  /**
   * Whether or not your record is in stock, 'yes' or 'no'.
   */
  inStock: string
  /**
   * The identifier used to group compound products together, eg. the ID of the parent in the case of a configurable product.
   */
  itemGroupId: string
  /**
   * This is mostly for internal purposes, but includes the categorisation of the record within Klevu. For example KLEVU_PRODUCT;;Shop All;;Bath;;;groupid_1 @ku@kuCategory@ku@.
   */
  klevu_category: string

  /**
   * Any manual score assigned by the merchant. This value must be either explicitly requested in fields or using Search Preference enableScores.
   */
  klevu_manual_boosting: number

  /**
   *  Any manual score assigned by the manual boosting rules. This value must be either explicitly requested in fields or using Search Preference enableScores.
   */
  klevu_bulk_boosting: number

  /**
   *  The machine learning score assigned by the Klevu Search engine. This value must be either explicitly requested in fields or using Search Preference enableScores.
   */
  klevu_selflearning_boosting: number
  /**
   * The name of your record, eg. the product name or category title.
   */
  name: string
  /**
   * The original price of your product, before any discounts. This can be used as 'was price' when used in conjunction with salePrice.
   */
  price: string
  /**
   * The rating of your product, between 0 and 5.
   */
  rating: number
  /**
   * The actual selling price of your product, or 'now' price when used in conjunction with price. Note that when using filters, the sale price is represented by klevu_price.
   */
  salePrice: string
  /**
   * The short description of your record.
   */
  shortDesc: string
  /**
   * The Stock Keeping Unit of the record.
   */
  sku: string
  /**
   * The score the record has achieved, ie. how relevant it is, which is used for sorting by relevance. This value must be either explicitly requested in fields or using Search Preference enableScores.
   */
  score: number
  /**
   * The salePrice of the lowest variant within all those indexed with the same itemGroupId. This can be used if you would like to show 'as low as' price.
   */
  startPrice: string
  storeBaseCurrency: string
  swatchesInfo: string
  /**
   * Any tags or keywords Klevu has saved for the record.
   */
  tags: string
  /**
   * The salePrice of the highest variant within all those indexed with the same itemGroupId. This can be used if you would like to show 'from X to Y' price range.
   */
  toPrice: string
  /**
   *  How many additional variants are available for this product. For example when searching for 'small tshirt', if a product has 3 colours available in small then the value here will be 2. If the search was 'tshirt' then the same record would return a value of 8 if there are 3 colours and 3 sizes of each available.
   */
  totalVariants: number
  type: string
  /**
   * The type of record, e.g. KLEVU_PRODUCT, KLEVU_CMS, KLEVU_CATEGORY, etc.
   */
  typeOfRecord: KlevuTypeOfRecord
  /**
   * The fully qualified URL used to access the record in your store.
   */
  url: string
  weight: string

  /**
   * If your indexed data includes variants with swatch information, this will be provided here as a nested object with the following elements
   */
  swatches?: Array<{
    /**
     * The Klevu record ID of the variant the swatch represents.
     */
    id: string
    /**
     *  The label to be displayed for the swatch, eg. Red
     */
    color: string
    /**
     * The hex colour or image URL to be displayed as the swatch pattern, eg. #FF0000
     */
    swatchImage: string
    /**
     * The image of the product which corresponds to this swatch, eg. a picture of the tshirt in red.
     */
    image: string
    /**
     *  If there are additional variants which have not been included, the number will be included here, so you can display something like "Also available in 4 other colours"
     */
    numberOfAdditionalVariants: string
  }>
}

/*
swatches: 

*/

export type KlevuRecordFields = LiteralUnion<keyof KlevuRecord, string>

export enum KlevuTypeOfRequest {
  Search = "SEARCH",
  Suggestion = "AUTO_SUGGESTIONS",
  CategoryNavigation = "CATNAV",
  NewArrivals = "RECS_NEW_ARRIVALS",
  SimilarProducts = "RECS_SIMILAR",
  Trending = "RECS_TRENDING",
  AlsoViewed = "RECS_ALSO_VIEWED",
  AlsoBought = "RECS_ALSO_BOUGHT",
}

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
