import { get, post } from "../connection/fetch.js"
import { isBrowser } from "../utils/isBrowser.js"
import { objectToQueryParameters } from "../utils/index.js"
import { KlevuTypeOfSearch } from "../models/KlevuTypeOfSearch.js"
import { KlevuConfig } from "../config.js"

const KEY_PENDING_REQUESTS = "klevu-pending-analytics"

export type V1SearchEvent = {
  /**
   * This is your Klevu JS API Key.
   */
  klevu_apiKey: string
  /**
   * This is the term being searched. For example iphone 5s.
   */
  klevu_term: string
  /**
   * This is the total number of results returned for the searched term. It must
   * be an integer (e.g. 5)
   */
  klevu_totalResults: number
  /**
   * IP address of the shopper who searched a term. If calling from javascript
   * (i.e. an ajax call), this is an optional parameter.
   */
  klevu_shopperIP?: string
  /**
   * When you receive a response for a search query, look at the value of the
   * typeOfQuery element under the metaData section (e.g. WILDCARD_AND,
   * FUZZY_AND). You need to pass this value to this parameter.
   */
  klevu_typeOfQuery: KlevuTypeOfSearch

  /** Currently active filters in the last request */
  klevu_activeFilters?: string
}

export async function KlevuEventV1Search(event: V1SearchEvent) {
  const url = `${
    KlevuConfig.getDefault().eventsApiV1Url
  }n-search/search${objectToQueryParameters(event)}`
  const id = addPendingRequest(url)
  const res = await get(url, true)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

export type V1ProductTrackingEvent = {
  /**
   * 	This is your Klevu JS API Key.
   */
  klevu_apiKey: string
  /**
   * 	This is the term being searched. For example iphone 5s.
   */
  klevu_keywords?: string
  /**
   * 	Here, the value must be clicked.
   */
  klevu_type: "clicked"
  /**
   * 	This is the Klevu ID of the clicked product. eg. 54321-12345.
   */
  klevu_productId: string
  /**
   * 	This is the parent ID of the clicked product. eg. 54321. For compound
   * 	products with a parent and multiple child/variant products, this is the
   * 	common ID which ties the products together. For simple products, please
   * 	specify the same as klevu_productId.
   */
  klevu_productGroupId: string
  /**
   * 	This is the child/variant ID of the clicked product. eg. 12345. For
   * 	compound products with a parent and multiple child/variant products, this
   * 	is the ID of the specific variant. For simple products, please specify the
   * 	same as klevu_productId.
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
   * 	IP address of the shopper who clicked on a product. If calling from
   * 	javascript (i.e. an ajax call), this is an optional parameter.
   */
  klevu_shopperIP?: string

  /**
   * The unique identifier of the A/B Test.
   */
  klevu_abTestId?: string

  /**
   * The unique identifier of the A/B Test Variant.
   */
  klevu_abTestVariantId?: string

  /** Currently active filters in the last request */
  klevu_activeFilters?: string
}

export async function KlevuEventV1ProductTracking(
  event: V1ProductTrackingEvent
) {
  const url = `${
    KlevuConfig.getDefault().eventsApiV1Url
  }productTracking${objectToQueryParameters(event)}`
  const id = addPendingRequest(url)
  const res = await get(url, true)
  if (id) {
    removePendingRequest(id)
  }
  return res
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
   * This is the Klevu ID of the purchased product. eg. 54321-12345. Please note
   * that the value of the klevu_productId must be the same in both the click
   * and checkout calls.
   */
  klevu_productId: string
  /**
   * This is the parent ID of the purchased product. eg. 54321. For compound
   * products with a parent and multiple child/variant products, this is the
   * common ID which ties the products together. For simple products, please
   * specify the same as klevu_productId.
   */
  klevu_productGroupId: string
  /**
   * This is the child/variant ID of the purchased product. eg. 12345. For
   * compound products with a parent and multiple child/variant products, this
   * is the ID of the specific variant. For simple products, please specify the
   * same as klevu_productId.
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
  const url = `${
    KlevuConfig.getDefault().eventsApiV1Url
  }productTracking${objectToQueryParameters(event)}`
  const id = addPendingRequest(url)
  const res = await get(url, true)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

export type KlevuV1CategoryProductsView = {
  /**
   * This is your Klevu JS API Key.
   */
  klevu_apiKey: string
  /**
   * This is the name of the category being visited. For example, Stackable
   * Rings. The name should not include parent categories.
   */
  klevu_categoryName: string
  /**  This is the complete hierarchy of the category being visited. For
   * example, Jewellery;Rings;Stackable Rings. Please note the use of a
   * semicolon as the separator between a parent and a child category. */
  klevu_categoryPath: string
  /**  Comma separated list of product IDs being shown on the current page of
   *the category page. For example, P1,P2,P3,P4,P5…
   *
   *All the product IDs listed here are treated as impressions for these
   *products.
   */
  klevu_productIds: string
  /**
   * Offset of the first product being shown on this page. For example, if you
   * are displaying 30 products per page and if a customer is on the 2nd page,
   * the value here should be 30. If on the 3rd page, it will be 60.
   */
  klevu_pageStartsFrom?: number
  /**
   * IP address of the shopper who bought the product(s).
   */
  klevu_shopperIP?: string
  /** The unique identifier of the A/B Test. */
  klevu_abTestId?: string
  /** The unique identifier of the A/B Test Variant. */
  klevu_abTestVariantId?: string
  /** The active filters */
  klevu_activeFilters?: string
}

export async function KlevuEventV1CategoryView(
  event: KlevuV1CategoryProductsView
) {
  const url = `${
    KlevuConfig.getDefault().eventsApiV1Url
  }categoryProductViewTracking${objectToQueryParameters(event)}`
  const id = addPendingRequest(url)
  const res = await get(url, true)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

export type KlevuV1CategoryProductsClick = {
  /**This is your Klevu JS API Key. */
  klevu_apiKey: string
  /**
   * This is the name of the category being visited. For example, Stackable
   * Rings. The name should not include parent categories.
   */
  klevu_categoryName: string
  /**
   * This is the complete hierarchy of the category being visited. For example,
   * Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the
   * separator between a parent and a child category.
   */
  klevu_categoryPath: string
  /**
   * This is the Klevu ID of the clicked product. eg. 54321-12345.
   */
  klevu_productId: string
  /**
   * This is the parent ID of the clicked product. eg. 54321. For compound
   * products with a parent and multiple child/variant products, this is the
   * common ID which ties the products together. For simple products, please
   * specify the same as klevu_productId.
   */
  klevu_productGroupId: string
  /**
   * This is the child/variant ID of the clicked product. eg. 12345. For
   * compound products with a parent and multiple child/variant products, this
   * is the ID of the specific variant. For simple products, please specify the
   * same as klevu_productId. */
  klevu_productVariantId: string
  /** Name of the product that was clicked. */
  klevu_productName?: string
  /** URL of the product that was clicked. */
  klevu_productUrl?: string
  /** SKU code of the product that was clicked. */
  klevu_productSku?: string
  /** Decimal sale price of the product that was clicked. */
  klevu_salePrice?: string
  /** A decimal rating value between 0 and 5 of the product that was clicked. */
  klevu_productRatings?: number
  /**
   * Position of the product on the category page when it was clicked. For
   * example, the value would be 0 if it is the first product on the first page.
   * The value will be 30, if it is the first product on the 2nd page with 30
   * products being displayed per page.
   */
  klevu_productPosition?: number
  /** IP address of the shopper who clicked the product(s). */
  klevu_shopperIP?: string
  /** The unique identifier of the A/B Test. */
  klevu_abTestId?: string
  /** The unique identifier of the A/B Test Variant. */
  klevu_abTestVariantId?: string
  /** The active filters */
  klevu_activeFilters?: string
}

export async function KlevuEventV1CategoryProductClick(
  event: KlevuV1CategoryProductsClick
) {
  const url = `${
    KlevuConfig.getDefault().eventsApiV1Url
  }categoryProductClickTracking${objectToQueryParameters(event)}`
  const id = addPendingRequest(url)
  const res = await get(url, true)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

export type KlevuEventV2Data = {
  /**
   * Please use the appropriate value for each event type, detailed within each
   * section below. eg. view_recs_list.
   */
  event: "view_recs_list" | "select_recs_list"
  /**
   * Your Klevu JS Api Key, eg. klevu-12345.
   */
  event_apikey: string
  /**
   * The unique identifier for your KMC Recommendations Banner, eg. 12345-abcde.
   * This is available in the banner configuration metadata as recsKey. If you
   * are not using banners configured within the KMC, please specify a unique
   * identifier for the banner which will be used to distinguish one banner from
   * another.
   */
  event_list_id: string
  /**
   * The name of the banner, eg. New Arrivals. This is available in the banner
   * configuration metadata as title.
   */
  event_list_name: string
  /**
   * The logic type of the banner, eg. NEWEST_ARRIVALS. This is available in the
   * banner configuration metadata as logic.
   */
  event_list_logic: string
  /**
   * This can be used to specify additional information about the event, which
   * will eventually be made available within the KMC. We recommend you specify
   * the type of page, eg. HOME. This is available in the banner configuration
   * metadata as pageType.
   */
  event_tags?: string[]
  /**
   * Depending on the event type, you will either detail a single item or
   * multiple items here.
   */
  items: Array<{
    /**
     * The full ID of the product. eg. 12345-54321. This will match the unique
     * value used in your data sync process with Klevu. For compound products
     * consisting of a child/variant and a parent, this is usually
     * parentId-childId.
     */
    item_id: string
    /**
     * The Parent ID of the product. eg. 12345. For compound products consisting
     * of a child/variant and a parent, please specify the ID of the parent. For
     * simple products, please re-use the same value as item_id.
     */
    item_group_id: string
    /**
     * The Child ID of the product.eg. 54321. Please specify the ID of the
     * child/variant product. For simple products, please re-use the same value
     * as item_id.
     */
    item_variant_id: string
    /**
     * The name of the product.
     */
    item_name: string
    /**
     * The final selling price of the product, for example 123.45.
     */
    price: string
    /**
     * The currency of the above price, eg. USD.
     */
    currency?: string
    /**
     * The brand of the product, for example "Nike" or "Acme".
     */
    item_brand?: string
    /**
     * The category the item belongs to. For nested categories, use the ;
     * character to separate the hierarchy, and for multiple categories use a
     * double ;;. For example, for 'Mens > Shoes > Trainers' and 'Sale' you
     * would specify: Mens;Shoes;Trainers;;Sale.
     */
    item_category?: string
    /**
     * he order of the product in the listing, starting from 1.
     */
    index: number
  }>
}

export async function KlevuEventV2(data: KlevuEventV2Data[]) {
  const url = KlevuConfig.getDefault().eventsApiV2Url
  const id = addPendingRequest(url, data)
  const res = await post(url, data, true)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

type PendingRequest = {
  id: string
  url: string
  data?: object
}

function addPendingRequest(url: string, data?: object): string | void {
  if (!isBrowser()) {
    return
  }

  let requests: PendingRequest[] = []
  const old = window.localStorage.getItem(KEY_PENDING_REQUESTS)
  if (old) {
    try {
      requests = JSON.parse(old)
    } catch {
      window.localStorage.removeItem(KEY_PENDING_REQUESTS)
    }
  }
  const id = generateUID()
  requests.push({ id, url, data })
  window.localStorage.setItem(KEY_PENDING_REQUESTS, JSON.stringify(requests))
  return id
}

function removePendingRequest(id: string) {
  if (!isBrowser()) {
    return
  }

  const data = window.localStorage.getItem(KEY_PENDING_REQUESTS)
  if (!data) {
    console.error("No pending requests!")
    return
  }
  try {
    const requests = JSON.parse(data) as PendingRequest[]
    requests.splice(
      requests.findIndex((r) => r.id === id),
      1
    )
    window.localStorage.setItem(KEY_PENDING_REQUESTS, JSON.stringify(requests))
  } catch (e) {
    console.error("Failed to save pending request")
  }
}

export async function runPendingAnalyticalRequests() {
  if (!isBrowser()) {
    return
  }

  const data = window.localStorage.getItem(KEY_PENDING_REQUESTS)
  if (!data) {
    return
  }

  const requests = JSON.parse(data) as PendingRequest[]

  for await (const request of requests) {
    if (request.data) {
      await post(request.url, request.data, true)
    } else {
      await get(request.url, true)
    }
    removePendingRequest(request.id)
  }
}

function generateUID(): string {
  let firstPart: string | number = (Math.random() * 46656) | 0
  let secondPart: string | number = (Math.random() * 46656) | 0
  firstPart = ("000" + firstPart.toString(36)).slice(-3)
  secondPart = ("000" + secondPart.toString(36)).slice(-3)
  return firstPart + secondPart
}
