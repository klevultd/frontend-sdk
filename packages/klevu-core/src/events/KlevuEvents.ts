import { KlevuConfig, KlevuRecord, KlevuTypeOfSearch } from ".."
import { KlevuRecommendationBanner } from "../models/KlevuRecommendationBanner"
import { lastClickedProducts } from "../store/lastClickedProducts"
import { KlevuLastSearches } from "../store/lastSearches"
import {
  KlevuEventV1CheckedOutProducts,
  KlevuEventV1ProductTracking,
  KlevuEventV1Search,
  KlevuEventV2,
} from "./eventRequests"

export class KlevuEvents {
  /**
   * Tell Klevu what products where bought by the user
   *
   * @param items Items user bought
   */
  static buy(
    items: Array<{
      amount: number
      product: KlevuRecord
      variantId?: string
    }>
  ) {
    for (const i of items) {
      const p = i.product
      KlevuEventV1CheckedOutProducts({
        klevu_apiKey: KlevuConfig.default.apiKey,
        klevu_currency: p.currency,
        klevu_productGroupId: p.itemGroupId,
        klevu_productId: p.id,
        klevu_salePrice: parseFloat(p.salePrice),
        klevu_productVariantId: i.variantId || p.id,
        klevu_type: "checkout",
        klevu_unit: i.amount,
      })
    }
  }

  /**
   * When recommendation banner is shown in the page
   *
   * @param recommendation What recommendation is shown
   * @param products List of all products that are shown
   */
  static recommendationView(
    recommendation: KlevuRecommendationBanner,
    products: KlevuRecord[]
  ) {
    KlevuEventV2({
      event: "select_recs_list",
      event_apikey: KlevuConfig.default.apiKey,
      event_list_id: recommendation.metadata.recsKey,
      event_list_logic: recommendation.metadata.logic,
      event_list_name: recommendation.metadata.title,
      items: products.map((p, index) => ({
        index: index + 1,
        item_id: p.id,
        item_group_id: p.itemGroupId || p.id,
        item_name: p.name,
        item_variant_id: p.itemGroupId || p.id,
        price: p.price,
        currency: p.currency,
        item_brand: p.brand,
        item_category: p.category,
      })),
    })
  }

  /**
   * When product has been clicked in the recommendation banner
   *
   * @param recommendation What recommendation is clicked
   * @param product Which product is clicked in the list
   * @param productIndexInList What is the index of the product in the list. Starting from 1
   */
  static recommendationClick(
    recommendation: KlevuRecommendationBanner,
    product: KlevuRecord,
    productIndexInList: number
  ) {
    KlevuEventV2({
      event: "view_recs_list",
      event_apikey: KlevuConfig.default.apiKey,
      event_list_id: recommendation.metadata.recsKey,
      event_list_logic: recommendation.metadata.logic,
      event_list_name: recommendation.metadata.title,
      items: [
        {
          index: productIndexInList,
          item_id: product.id,
          item_group_id: product.itemGroupId || product.id,
          item_name: product.name,
          item_variant_id: product.itemGroupId || product.id,
          price: product.price,
          currency: product.currency,
          item_brand: product.brand,
          item_category: product.category,
        },
      ],
    })
  }

  /**
   * When product is clicked. Do not use this for recommendations
   *
   * @param searchTerm
   * @param product
   */
  static productClick(
    product: KlevuRecord,
    searchTerm?: string,
    variantId?: string
  ) {
    lastClickedProducts.click(product.id)
    KlevuEventV1ProductTracking({
      klevu_apiKey: KlevuConfig.default.apiKey,
      klevu_type: "clicked",
      klevu_keywords: searchTerm,
      klevu_productGroupId: product.itemGroupId,
      klevu_productId: product.id,
      klevu_productName: product.name,
      klevu_productUrl: product.url,
      klevu_productVariantId: variantId || product.id,
    })
  }

  /**
   * What user has last searched. This is important for Klevu to function
   * properly. `search()` query automatically sends this event. Use
   * `doNotSendEvent` option in search to disable it.
   *
   * @param term What was searched
   * @param totalResults Total number of results (can be found in result meta)
   * @param typeOfSearch Type of search used (can be found in result meta)
   */
  static search(
    term: string,
    totalResults: number,
    typeOfSearch: KlevuTypeOfSearch
  ) {
    KlevuLastSearches.save(term)
    KlevuEventV1Search({
      klevu_apiKey: KlevuConfig.default.apiKey,
      klevu_term: term,
      klevu_totalResults: totalResults,
      klevu_typeOfQuery: typeOfSearch,
    })
  }
}
