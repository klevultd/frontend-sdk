import { KlevuConfig, KlevuTypeOfSearch } from ".."
import Axios from "axios"

type V1SearchEvent = {
  /**
   * This is your Klevu JS API Key.
   */
  klevu_apiKey: string
  /**
   * This is the term being searched. For example iphone 5s.
   */
  klevu_term: string
  /**
   * This is the total number of results returned for the searched term. It must be an integer (e.g. 5)
   */
  klevu_totalResults: number
  /**
   * IP address of the shopper who searched a term. If calling from javascript (i.e. an ajax call), this is an optional parameter.
   */
  klevu_shopperIP?: string
  /**
   * When you receive a response for a search query, look at the value of the typeOfQuery element under the metaData section (e.g. WILDCARD_AND, FUZZY_AND). You need to pass this value to this parameter.
   */
  klevu_typeOfQuery: KlevuTypeOfSearch
}

export async function KlevuEventV1Search(event: V1SearchEvent) {
  const url = `${KlevuConfig.eventsApiV1Url}n-search/search${objectToUrlParams(
    event
  )}`
  return Axios.get(url)
}

export type V1ProductTrackingEvent = {
  /**
   * 	This is your Klevu JS API Key.
   */
  klevu_apiKey: string
  /**
   * 	This is the term being searched. For example iphone 5s.
   */
  klevu_keywords: string
  /**
   * 	Here, the value must be clicked.
   */
  klevu_type: "clicked"
  /**
   * 	This is the Klevu ID of the clicked product. eg. 54321-12345.
   */
  klevu_productId: string
  /**
   * 	This is the parent ID of the clicked product. eg. 54321. For compound products with a parent and multiple child/variant products, this is the common ID which ties the products together. For simple products, please specify the same as klevu_productId.
   */
  klevu_productGroupId: string
  /**
   * 	This is the child/variant ID of the clicked product. eg. 12345. For compound products with a parent and multiple child/variant products, this is the ID of the specific variant. For simple products, please specify the same as klevu_productId.
   */
  klevu_productVariantId: string
  /**
   * 	This is the product name of the clicked product.
   */
  klevu_productName: string
  /**
   * 	This is the product URL of the clicked product.
   */
  klevu_productUrl: string
  /**
   * 	IP address of the shopper who clicked on a product. If calling from javascript (i.e. an ajax call), this is an optional parameter.
   */
  klevu_shopperIP?: string
}

export async function KlevuEventV1ProductTracking(
  event: V1ProductTrackingEvent
) {
  const url = `${KlevuConfig.eventsApiV1Url}productTracking${objectToUrlParams(
    event
  )}`
  return Axios.get(url)
}

export type V1CheckedOutProductsEvent = {
  /**
   * This is your Klevu JS API Key.
   */
  klevu_apiKey: string
  /**
   * Here, the value must be checkout.
   */
  klevu_type: "checkout"
  /**
   * This is the Klevu ID of the purchased product. eg. 54321-12345. Please note that the value of the klevu_productId must be the same in both the click and checkout calls.
   */
  klevu_productId: string
  /**
   * This is the parent ID of the purchased product. eg. 54321. For compound products with a parent and multiple child/variant products, this is the common ID which ties the products together. For simple products, please specify the same as klevu_productId.
   */
  klevu_productGroupId: string
  /**
   * This is the child/variant ID of the purchased product. eg. 12345. For compound products with a parent and multiple child/variant products, this is the ID of the specific variant. For simple products, please specify the same as klevu_productId.
   */
  klevu_productVariantId: string
  /**
   * This is the total quantity purchased. It must be an integer (e.g. 5).
   */
  klevu_unit: number
  /**
   * Product's sale price for one unit. This must be a double Value.
   */
  klevu_salePrice: number
  /**
   * e.g GBP, USD, EUR.
   */
  klevu_currency: string
  /**
   * IP address of the shopper who bought the product(s).
   */
  klevu_shopperIP?: string
}

export async function KlevuEventV1CheckedOutProducts(
  event: V1CheckedOutProductsEvent
) {
  const url = `${KlevuConfig.eventsApiV1Url}productTracking${objectToUrlParams(
    event
  )}`
  return Axios.get(url)
}

function objectToUrlParams(event: object) {
  let urlData = "?"
  for (const [key, value] of Object.entries(event)) {
    urlData += `${key}=${encodeURIComponent(value)}&`
  }
  return urlData
}

type KlevuEventV2 = {
  event: "view_recs_list" | "select_recs_list"
  event_apikey: string
  event_list_id: string
  event_list_name: string
  event_list_logic: string
  event_tags: string[]
  items: Array<{
    item_id: string
    item_group_id: string
    item_variant_id: string
    item_name: string
    price: string
    currency: string
    item_brand: string
    item_category: string
    index: number
  }>
}

export async function KlevuEventV2(data: KlevuEventV2) {
  return (await Axios.post(KlevuConfig.eventsApiV2Url, data)).data
}
