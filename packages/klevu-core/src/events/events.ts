import { KlevuConfig, KlevuTypeOfSearch } from ".."
import { KlevuLastSearches } from "../store/lastSearches"
import {
  KlevuEventV1CheckedOutProducts,
  KlevuEventV1ProductTracking,
  KlevuEventV1Search,
  V1ProductTrackingEvent,
  V1CheckedOutProductsEvent,
} from "./eventRequests"

export class KlevuEvents {
  static buy(
    products: Array<
      Pick<
        V1CheckedOutProductsEvent,
        | "klevu_currency"
        | "klevu_productGroupId"
        | "klevu_productId"
        | "klevu_productVariantId"
        | "klevu_salePrice"
        | "klevu_type"
        | "klevu_unit"
      >
    >
  ) {
    for (const p of products) {
      KlevuEventV1CheckedOutProducts({
        klevu_apiKey: KlevuConfig.apiKey,
        ...p,
      })
    }
  }

  static categoryClick() {}

  static categoryView() {}

  static onProductClick(
    data: Omit<V1ProductTrackingEvent, "klevu_apiKey" | "klevu_type">
  ) {
    KlevuEventV1ProductTracking({
      klevu_apiKey: KlevuConfig.apiKey,
      klevu_type: "clicked",
      ...data,
    })
  }

  static collect() {}

  static onSearch(
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
