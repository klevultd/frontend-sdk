import {
  KlevuConfig,
  KlevuRecord,
  KlevuTypeOfRequest,
  KlevuTypeOfSearch,
} from ".."
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
        klevu_apiKey: KlevuConfig.apiKey,
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

  static recommendationClick() {}

  static recommendationView() {}

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
      klevu_apiKey: KlevuConfig.apiKey,
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
      klevu_apiKey: KlevuConfig.apiKey,
      klevu_term: term,
      klevu_totalResults: totalResults,
      klevu_typeOfQuery: typeOfSearch,
    })
  }
}
