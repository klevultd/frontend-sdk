import { KlevuTypeOfRecord } from "./KlevuTypeOfRecord"

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
