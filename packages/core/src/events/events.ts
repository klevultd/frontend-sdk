import { KlevuConfig, KlevuTypeOfSearch } from ".."
import {
  KlevuEventV1ProductTracking,
  KlevuEventV1Seach,
  V1ProductTrackingEvent,
} from "./eventRequests"

export class KlevuEvents {
  static buy() {}

  static categoryClick() {}

  static categoryView() {}

  static click(
    data: Omit<V1ProductTrackingEvent, "klevu_apiKey" | "klevu_type">
  ) {
    KlevuEventV1ProductTracking({
      klevu_apiKey: KlevuConfig.apiKey,
      klevu_type: "clicked",
      ...data,
    })
  }

  static collect() {}

  static search(
    term: string,
    totalResults: number,
    typeOfSearch: KlevuTypeOfSearch
  ) {
    KlevuEventV1Seach({
      klevu_apiKey: KlevuConfig.apiKey,
      klevu_term: term,
      klevu_totalResults: totalResults,
      klevu_typeOfQuery: typeOfSearch,
    })
  }
}
