import {
  KlevuConfig,
  KlevuKMCRecommendations,
  KlevuTypeOfSearch,
} from "../index.js"
import { get, post } from "../connection/fetch.js"
import { isBrowser } from "../utils/isBrowser.js"
import { KlevuStorage, StorageType } from "../utils/storage.js"

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
  const url = `${KlevuConfig.getDefault().eventsApiV1Url}n-search/search`
  const id = addPendingRequest(url, event)
  const res = await sendGenericPostEvent(url, event)
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
  const url = `${KlevuConfig.getDefault().eventsApiV1Url}productTracking`
  const id = addPendingRequest(url, event)
  const res = await sendGenericPostEvent(url, event)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

export type V2EventBase = {
  event: "order_purchase" | "view_recs_list" | "select_recs_list"
  event_version: "1.0.0"
  /**
   * Your Klevu JS Api Key, eg. klevu-12345.
   */
  event_apikey: string

  /**
   * The optional json object that holds the user related information such as ip_address, email.
   */
  user_profile?: {
    /**
     * IP address of the shopper who purchased the product. If calling from javascript (i.e. an ajax call), this is an optional parameter.
     */
    ip_address?: string
    /**
     * Email id of the shopper who purchased the product.
     */
    email?: string
  }
}

export type V2CheckedOutProductsEvent = V2EventBase & {
  event: "order_purchase"
  event_data: {
    /**
     * Depending on the number of orders, the item array accepts single or more orders.
     */
    items: Array<{
      /**
       * The unique identifier for your orders.
       */
      order_id?: string
      /**
       * The unique identifier for reference to a line on an order within the database.
       */
      order_line_id?: string
      /**
       * The name of the product.
       */
      item_name: string
      /**
       * The full ID of the product. eg. 12345-54321. This will match the unique value used in your data sync process with Klevu. For compound products consisting of a child/variant and a parent, this is usually parentId-childId.
       */
      item_id: string
      /**
       * The Parent ID of the product. eg. 12345. For compound products consisting of a child/variant and a parent, please specify the ID of the parent. For simple products, please re-use the same value as item_id
       */
      item_group_id: string
      /**
       * The Child ID of the product.eg. 54321. Please specify the ID of the child/variant product. For simple products, please re-use the same value as item_id.
       */
      item_variant_id: string
      /**
       * The final selling price of the product, for example 123.45
       */
      unit_price: number
      /**
       * The currency of the above price, eg. USD.
       */
      currency: string
      /**
       * The number of units sold for a product. In case if the parameter is mising, the default value will be 1
       */
      units?: number
    }>
  }
}

export async function KlevuEventV2CheckedOutProducts(
  event: V2CheckedOutProductsEvent
) {
  const url = `${KlevuConfig.getDefault().eventsApiV2Url}`
  const id = addPendingRequest(url, event)
  const res = await sendGenericPostEvent(url, event)
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
  }categoryProductViewTracking`
  const id = addPendingRequest(url, event)
  const res = await sendGenericPostEvent(url, event)
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
  }categoryProductClickTracking`
  const id = addPendingRequest(url, event)
  const res = await sendGenericPostEvent(url, event)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

export type KlevuV1ImageBannerClick = {
  klevu_apiKey: string
  klevu_term: string
  klevu_bannerId: string
  klevu_bannerName: string
  klevu_image: string
  klevu_target: string
  klevu_request: "click"
  type: "banner"
}

export async function KlevuEventV1BannerClick(event: KlevuV1ImageBannerClick) {
  const url = `${KlevuConfig.getDefault().eventsApiV1Url}dataTracking`
  const id = addPendingRequest(url, event)
  const res = await sendGenericPostEvent(url, event)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

export type KlevuEventV2DataStaticContent = {
  /**
   * The type of content. Currently only image is supported
   */
  content_type: "image"
  /**
   * Which resolution of the banner is used
   */
  resolution: "desktop" | "mobile"
  /**
   * URL of the banner
   */
  banner_image_url: string
  /**
   * Alt text of the banner
   */
  banner_alt_tag: string
  /**
   * The order of the product in the listing, starting from 1.
   */
  index: number
}

export type KlevuRecommendationsEventV2Data = V2EventBase & {
  /**
   * Please use the appropriate value for each event type, detailed within each
   * section below. eg. view_recs_list.
   */
  event: "view_recs_list" | "select_recs_list"

  event_data?: {
    /**
     * The unique identifier for your KMC Recommendations Banner, eg. 12345-abcde.
     * This is available in the banner configuration metadata as recsKey. If you
     * are not using banners configured within the KMC, please specify a unique
     * identifier for the banner which will be used to distinguish one banner from
     * another.
     */
    list_id: string
    /**
     * The name of the banner, eg. New Arrivals. This is available in the banner
     * configuration metadata as title.
     */
    list_name: string
    /**
     * The logic type of the banner, eg. NEWEST_ARRIVALS. This is available in the
     * banner configuration metadata as logic.
     */
    list_logic: string
    /**
     * This can be used to specify additional information about the event, which
     * will eventually be made available within the KMC. We recommend you specify
     * the type of page, eg. HOME. This is available in the banner configuration
     * metadata as pageType.
     */
    tags?: string[]

    /**
     * In case of banners metadata includes spot id.
     */
    spot_id?: string

    /**
     * In case of banners metadata includes spot name.
     */
    spot_name?: string

    /**
     * When segmentation is used
     */
    segment_id?: string
    segment_name?: string

    /**
     * When static banner is used this needs to be fined
     */
    action?: KlevuKMCRecommendations["metadata"]["action"]
    static_content?: Array<KlevuEventV2DataStaticContent>

    /**
     * Depending on the event type, you will either detail a single item or
     * multiple items here.
     */
    items?: Array<{
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
}

export async function KlevuEventV2(data: KlevuRecommendationsEventV2Data[]) {
  const url = KlevuConfig.getDefault().eventsApiV2Url
  const id = addPendingRequest(url, data)
  const res = await post(url, data, true)
  if (id) {
    removePendingRequest(id)
  }
  return res
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendGenericPostEvent(url: string, data: { [key: string]: any }) {
  const formData = new FormData()
  for (const key in data) {
    if (data[key] !== undefined) {
      formData.append(key, data[key])
    }
  }
  if (isBrowser() && navigator.sendBeacon) {
    if (navigator.sendBeacon(url, formData)) {
      return
    }
  }
  return await post(url, formData, true)
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
  const old = KlevuStorage.getItem(KEY_PENDING_REQUESTS, StorageType.SESSION)
  if (old) {
    try {
      requests = JSON.parse(old)
    } catch {
      KlevuStorage.removeItem(KEY_PENDING_REQUESTS, StorageType.SESSION)
    }
  }
  const id = generateUID()
  requests.push({ id, url, data })
  KlevuStorage.setItem(
    KEY_PENDING_REQUESTS,
    JSON.stringify(requests),
    StorageType.SESSION
  )
  return id
}

function removePendingRequest(id: string) {
  if (!isBrowser()) {
    return
  }

  const data = KlevuStorage.getItem(KEY_PENDING_REQUESTS, StorageType.SESSION)
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
    KlevuStorage.setItem(
      KEY_PENDING_REQUESTS,
      JSON.stringify(requests),
      StorageType.SESSION
    )
  } catch (e) {
    console.error("Failed to save pending request")
  }
}

export async function runPendingAnalyticalRequests() {
  if (!isBrowser()) {
    return
  }

  const data = KlevuStorage.getItem(KEY_PENDING_REQUESTS, StorageType.SESSION)
  if (!data) {
    return
  }

  const requests = JSON.parse(data) as PendingRequest[]

  for await (const request of requests) {
    try {
      if (request.data) {
        await sendGenericPostEvent(request.url, request.data)
      } else {
        await get(request.url, true)
      }
      removePendingRequest(request.id)
    } catch (e) {
      // we ignore errors here
    }
  }
}

function generateUID(): string {
  let firstPart: string | number = (Math.random() * 46656) | 0
  let secondPart: string | number = (Math.random() * 46656) | 0
  firstPart = ("000" + firstPart.toString(36)).slice(-3)
  secondPart = ("000" + secondPart.toString(36)).slice(-3)
  return firstPart + secondPart
}
