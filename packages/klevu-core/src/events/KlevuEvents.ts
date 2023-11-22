import {
  KlevuConfig,
  KlevuKMCRecommendations,
  KlevuRecord,
  KlevuTypeOfSearch,
} from "../index.js"
import { KlevuLastClickedProducts } from "../store/lastClickedProducts.js"
import { KlevuLastSearches } from "../store/lastSearches.js"
import {
  KlevuEventV1CategoryProductClick,
  KlevuEventV1CategoryView,
  KlevuEventV1ProductTracking,
  KlevuEventV1Search,
  KlevuEventV2,
  KlevuEventV2CheckedOutProducts,
  KlevuRecommendationsEventV2Data,
  KlevuEventV2DataStaticContent,
  KlevuV1CategoryProductsClick,
  KlevuV1CategoryProductsView,
  V1ProductTrackingEvent,
  V1SearchEvent,
  V2CheckedOutProductsEvent,
  KlevuV1ImageBannerClick,
  KlevuEventV1BannerClick,
} from "./eventRequests.js"

export type RecommendationViewEventMetaData =
  KlevuKMCRecommendations["metadata"]

/**
 * @category KlevuEvents
 */
export class KlevuEvents {
  /**
   * Tell Klevu what products where bought by the user
   *
   * @param items Items user bought
   * @property amount count of bought products
   * @property product KlevuProduct that is being bought
   * @property variantId optional variantId that is being bought
   * @property override optional override any settings of sent data
   *
   */
  static buy({
    user,
    items,
  }: {
    user?: {
      ip_address?: string
      email?: string
    }
    items: Array<{
      amount: number
      product: Pick<KlevuRecord, "id"> &
        Partial<
          Pick<KlevuRecord, "currency" | "itemGroupId" | "salePrice" | "name">
        >
      variantId?: string
      orderId?: string
      orderLineId?: string
      override?: Partial<
        V2CheckedOutProductsEvent["event_data"]["items"][number]
      >
    }>
  }) {
    const data: V2CheckedOutProductsEvent = {
      event: "order_purchase",
      event_version: "1.0.0",
      event_apikey: KlevuConfig.getDefault().apiKey,
      user_profile: user,
      event_data: {
        items: items.map((i) => ({
          currency: i.product.currency ?? "USD",
          item_group_id: i.product.itemGroupId ?? i.product.id,
          item_id: i.product.id,
          item_name: i.product.name ?? "unknown",
          item_variant_id: i.variantId ?? i.product.id,
          unit_price: parseFloat(i.product.salePrice ?? "0"),
          order_id: i.orderId,
          order_line_id: i.orderLineId,
          units: i.amount,
          ...(i.override ?? {}),
        })),
      },
    }

    KlevuEventV2CheckedOutProducts(data)
  }

  /**
   * When recommendation banner is shown in the page
   *
   * @param recommendation Metadata of what recommendation is shown
   * @param products List of all products that are shown
   * @param override Ability to override any analytical keys in low level
   */
  static recommendationView({
    recommendationMetadata,
    products,
    override = {},
  }: {
    recommendationMetadata: Partial<RecommendationViewEventMetaData> &
      Pick<RecommendationViewEventMetaData, "logic" | "recsKey" | "title">
    products?: Array<
      Pick<KlevuRecord, "id"> &
        Partial<
          Pick<
            KlevuRecord,
            | "itemGroupId"
            | "variantId"
            | "name"
            | "price"
            | "currency"
            | "brand"
            | "category"
          >
        >
    >
    override?: Partial<KlevuRecommendationsEventV2Data>
  }) {
    const data: KlevuRecommendationsEventV2Data = {
      event: "view_recs_list",
      event_version: "1.0.0",
      event_apikey: KlevuConfig.getDefault().apiKey,
      event_data: {
        list_id: recommendationMetadata.recsKey,
        list_logic: recommendationMetadata.logic,
        list_name: recommendationMetadata.title,
        action: recommendationMetadata.action,
        spot_id: recommendationMetadata.spotKey,
        spot_name: recommendationMetadata.spotName,
        items:
          products &&
          products.map((p, index) => {
            if (!p.id) {
              throw new Error("Cannot send event without product id")
            }
            return {
              index: index + 1,
              item_id: p.id,
              item_group_id: p.itemGroupId || p.id,
              item_name: p.name ?? "unknown",
              item_variant_id: p.variantId || p.id,
              price: p.price ?? "0",
              currency: p.currency,
              item_brand: p.brand,
              item_category: p.category,
            }
          }),
      },
    }

    KlevuEventV2([
      {
        ...data,
        ...override,
      },
    ])
  }

  /**
   * When product has been clicked in the recommendation banner
   *
   * @param recommendationMetadata Metadata of what recommendation is clicked
   * @param bannerInfo Information about the static banner that is shown
   * @param product Which product is clicked in the list
   * @param productIndexInList What is the index of the product in the list. Starting from 1
   * @param override Ability to override any analytical keys in low level
   */
  static recommendationClick({
    recommendationMetadata,
    product,
    bannerInfo,
    productIndexInList,
    variantId,
    override = {},
  }: {
    recommendationMetadata: RecommendationViewEventMetaData
    bannerInfo?: KlevuEventV2DataStaticContent
    product?: Pick<KlevuRecord, "id"> &
      Partial<
        Pick<
          KlevuRecord,
          | "itemGroupId"
          | "name"
          | "salePrice"
          | "currency"
          | "brand"
          | "category"
        >
      >
    productIndexInList?: number
    variantId?: string
    override?: Partial<KlevuRecommendationsEventV2Data>
  }) {
    if (product) {
      KlevuLastClickedProducts.click(product.id, product)
    }
    const data: KlevuRecommendationsEventV2Data = {
      event: "select_recs_list",
      event_version: "1.0.0",
      event_apikey: KlevuConfig.getDefault().apiKey,
      event_data: {
        list_id: recommendationMetadata.recsKey,
        list_logic: recommendationMetadata.logic,
        list_name: recommendationMetadata.title,
        action: recommendationMetadata.action,
        spot_id: recommendationMetadata.spotKey,
        spot_name: recommendationMetadata.spotName,
        static_content: bannerInfo && [bannerInfo],
        items: product && [
          {
            index: productIndexInList ?? 1,
            item_id: product.id,
            item_group_id: product.itemGroupId || product.id,
            item_name: product.name ?? "unknown",
            item_variant_id: variantId || product.id,
            price: product.salePrice ?? "0",
            currency: product.currency,
            item_brand: product.brand,
            item_category: product.category,
          },
        ],
      },
    }
    KlevuEventV2([
      {
        ...data,
        ...override,
      },
    ])
  }

  /**
   * When product is clicked. Do not use this for recommendations
   *
   * @param searchTerm
   * @param product
   */
  static searchProductClick({
    product,
    searchTerm,
    variantId,
    activeFilters,
    override = {},
  }: {
    product: Pick<KlevuRecord, "id"> &
      Partial<Pick<KlevuRecord, "itemGroupId" | "name" | "url">>
    searchTerm?: string
    variantId?: string
    activeFilters?: string
    override?: Partial<V1ProductTrackingEvent>
  }) {
    if (!product.id) {
      throw new Error("Cannot send event without product id")
    }
    KlevuLastClickedProducts.click(product.id, product)
    const data: V1ProductTrackingEvent = {
      klevu_apiKey: KlevuConfig.getDefault().apiKey,
      klevu_type: "clicked",
      klevu_keywords: searchTerm,
      klevu_productGroupId: product.itemGroupId || product.id,
      klevu_productId: product.id,
      klevu_productName: product.name ?? "unknown",
      klevu_productUrl: product.url ?? "",
      klevu_productVariantId: variantId || product.id,
      klevu_activeFilters: activeFilters,
    }
    KlevuEventV1ProductTracking({
      ...data,
      ...override,
    })
  }

  /**
   * What user has last searched. This is important for Klevu to function
   * properly. Use `sendSearchEvent()` modifier with search query to send results
   *
   * @param term What was searched
   * @param totalResults Total number of results (can be found in result meta)
   * @param typeOfSearch Type of search used (can be found in result meta)
   * @param override Ability to override any analytical keys in low level
   */
  static search({
    term,
    totalResults,
    typeOfSearch,
    activeFilters,
    override = {},
  }: {
    term: string
    totalResults: number
    typeOfSearch: KlevuTypeOfSearch
    activeFilters?: string
    override?: Partial<V1SearchEvent>
  }) {
    KlevuLastSearches.save(term)
    const data: V1SearchEvent = {
      klevu_apiKey: KlevuConfig.getDefault().apiKey,
      klevu_term: term,
      klevu_totalResults: totalResults,
      klevu_typeOfQuery: typeOfSearch,
      klevu_activeFilters: activeFilters,
    }

    KlevuEventV1Search({
      ...data,
      ...override,
    })
  }

  /**
   *
   * @param categoryTitle This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories.
   * @param klevuCategory This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category.
   * @param products Products in the view
   * @param pageStartsFrom Offset of the first product being shown on this page. For example, if you are displaying 30 products per page and if a customer is on the 2nd page, the value here should be 30. If on the 3rd page, it will be 60.
   * @param abTestId The AB test id currently running
   * @param abTestVariantId Id of AB test variant
   * @param activeFilters The string version of active filters applied to the query that got the products.
   * @param override Ability to override any analytical keys in low level
   */
  static categoryMerchandisingView({
    categoryTitle,
    klevuCategory,
    products,
    pageStartsFrom,
    abTestId,
    abTestVariantId,
    activeFilters,
    override = {},
  }: {
    categoryTitle: string
    klevuCategory: string
    products: Array<Pick<KlevuRecord, "id">>
    pageStartsFrom?: number
    abTestId?: string
    abTestVariantId?: string
    activeFilters?: string
    override?: Partial<KlevuV1CategoryProductsView>
  }) {
    const data: KlevuV1CategoryProductsView = {
      klevu_apiKey: KlevuConfig.getDefault().apiKey,
      klevu_categoryName: categoryTitle,
      klevu_categoryPath: klevuCategory,
      klevu_productIds: products.map((p) => p.id).join(","),
      klevu_pageStartsFrom: pageStartsFrom,
      klevu_activeFilters: activeFilters,
      klevu_abTestId: abTestId,
      klevu_abTestVariantId: abTestVariantId,
    }
    KlevuEventV1CategoryView({
      ...data,
      ...override,
    })
  }

  /**
   *
   * @param product Product clicked
   * @param categoryTitle This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories.
   * @param klevuCategory This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category.
   * @param variantId This is the child/variant ID of the clicked product. eg. 12345. For compound products with a parent and multiple child/variant products, this is the ID of the specific variant.
   * @param productPosition Position of the product on the category page when it was clicked. For example, the value would be 0 if it is the first product on the first page. The value will be 30, if it is the first product on the 2nd page with 30 products being displayed per page.
   * @param activeFilters The string version of active filters applied to the query that got the products.
   * @param override Ability to override any analytical keys in low level
   */
  static categoryMerchandisingProductClick({
    product,
    categoryTitle,
    klevuCategory,
    variantId,
    productPosition,
    abTestId,
    abTestVariantId,
    activeFilters,
    override = {},
  }: {
    product: Pick<KlevuRecord, "id"> &
      Partial<
        Pick<KlevuRecord, "itemGroupId" | "name" | "url" | "salePrice" | "sku">
      >
    categoryTitle: string
    klevuCategory: string
    variantId?: string
    productPosition?: number
    abTestId?: string
    abTestVariantId?: string
    activeFilters?: string
    override?: Partial<KlevuV1CategoryProductsClick>
  }) {
    if (!product.id) {
      throw new Error("Cannot send event without product id")
    }

    KlevuLastClickedProducts.click(product.id, product)
    const data: KlevuV1CategoryProductsClick = {
      klevu_apiKey: KlevuConfig.getDefault().apiKey,
      klevu_categoryName: categoryTitle,
      klevu_productGroupId: product.itemGroupId || product.id,
      klevu_productVariantId: variantId || product.id,
      klevu_categoryPath: klevuCategory,
      klevu_productId: product.id,
      klevu_productName: product.name,
      klevu_productUrl: product.url,
      klevu_salePrice: product.salePrice,
      klevu_productSku: product.sku,
      klevu_productPosition: productPosition,
      klevu_abTestId: abTestId,
      klevu_abTestVariantId: abTestVariantId,
      klevu_activeFilters: activeFilters,
    }

    KlevuEventV1CategoryProductClick({
      ...data,
      ...override,
    })
  }

  /**
   * When user clicks on the banner that is in quicksearch or on search landing page
   */
  static imageBannerClick({
    term,
    bannerId,
    bannerName,
    imageUrl,
    targetUrl,
    override = {},
  }: {
    /**
     * Search term used to get the results
     */
    term: string
    /**
     * Id of the banner
     */
    bannerId: string
    /**
     * Name of the banner
     */
    bannerName: string
    /**
     * Url of the image
     */
    imageUrl: string
    /**
     * Url where the user is redirected
     */
    targetUrl: string
    override: Partial<KlevuV1ImageBannerClick>
  }) {
    const data: KlevuV1ImageBannerClick = {
      klevu_apiKey: KlevuConfig.getDefault().apiKey,
      type: "banner",
      klevu_request: "click",
      klevu_term: term,
      klevu_bannerId: bannerId,
      klevu_bannerName: bannerName,
      klevu_image: imageUrl,
      klevu_target: targetUrl,
    }

    KlevuEventV1BannerClick({
      ...data,
      ...override,
    })
  }
}
