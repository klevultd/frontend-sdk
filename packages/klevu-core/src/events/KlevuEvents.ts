import { KlevuConfig } from "../config.js"
import { KlevuRecord } from "../models/KlevuRecord.js"
import { KlevuTypeOfSearch } from "../models/KlevuTypeOfSearch.js"
import { KlevuKMCRecommendations } from "../queries/kmcRecommendation/kmcRecommendation.js"
import { KlevuLastClickedProducts } from "../store/lastClickedProducts.js"
import { KlevuLastSearches } from "../store/lastSearches.js"
import {
  KlevuEventV1CategoryProductClick,
  KlevuEventV1CategoryView,
  KlevuEventV1CheckedOutProducts,
  KlevuEventV1ProductTracking,
  KlevuEventV1Search,
  KlevuEventV2,
  KlevuEventV2Data,
  KlevuV1CategoryProductsClick,
  KlevuV1CategoryProductsView,
  V1CheckedOutProductsEvent,
  V1ProductTrackingEvent,
  V1SearchEvent,
} from "./eventRequests.js"

export type RecommendationViewEventMetaData = Pick<
  KlevuKMCRecommendations["metadata"],
  "recsKey" | "logic" | "title"
>

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
    items,
  }: {
    items: Array<{
      amount: number
      product: Partial<KlevuRecord>
      variantId?: string
      override: Partial<V1CheckedOutProductsEvent>
    }>
  }) {
    for (const item of items) {
      const p = item.product

      if (!p.id) {
        throw new Error("Cannot send event without product id")
      }

      const data: V1CheckedOutProductsEvent = {
        klevu_apiKey: KlevuConfig.getDefault().apiKey,
        klevu_currency: p.currency ?? "usd",
        klevu_productGroupId: p.itemGroupId || p.id,
        klevu_productId: p.id,
        klevu_salePrice: parseFloat(p.salePrice ?? "0"),
        klevu_productVariantId: item.variantId || p.id,
        klevu_type: "checkout",
        klevu_unit: item.amount,
      }

      KlevuEventV1CheckedOutProducts({
        ...data,
        ...item.override,
      })
    }
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
    recommendationMetadata: RecommendationViewEventMetaData
    products: Array<Partial<KlevuRecord>>
    override?: Partial<KlevuEventV2Data>
  }) {
    const data: KlevuEventV2Data = {
      event: "view_recs_list",
      event_apikey: KlevuConfig.getDefault().apiKey,
      event_list_id: recommendationMetadata.recsKey,
      event_list_logic: recommendationMetadata.logic,
      event_list_name: recommendationMetadata.title,
      items: products.map((p, index) => {
        if (!p.id) {
          throw new Error("Cannot send event without product id")
        }
        return {
          index: index + 1,
          item_id: p.id,
          item_group_id: p.itemGroupId || p.id,
          item_name: p.name ?? "unknown",
          item_variant_id: p.itemGroupId || p.id,
          price: p.price ?? "0",
          currency: p.currency,
          item_brand: p.brand,
          item_category: p.category,
        }
      }),
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
   * @param product Which product is clicked in the list
   * @param productIndexInList What is the index of the product in the list. Starting from 1
   * @param override Ability to override any analytical keys in low level
   */
  static recommendationClick({
    recommendationMetadata,
    product,
    productIndexInList,
    variantId,
    override = {},
  }: {
    recommendationMetadata: RecommendationViewEventMetaData
    product: Partial<KlevuRecord>
    productIndexInList: number
    variantId?: string
    override?: Partial<KlevuEventV2Data>
  }) {
    if (!product.id) {
      throw new Error("Cannot send event without product id")
    }

    KlevuLastClickedProducts.click(product.id, product)
    const data: KlevuEventV2Data = {
      event: "select_recs_list",
      event_apikey: KlevuConfig.getDefault().apiKey,
      event_list_id: recommendationMetadata.recsKey,
      event_list_logic: recommendationMetadata.logic,
      event_list_name: recommendationMetadata.title,
      items: [
        {
          index: productIndexInList,
          item_id: product.id,
          item_group_id: product.itemGroupId || product.id,
          item_name: product.name ?? "unknown",
          item_variant_id: variantId || product.id,
          price: product.price ?? "0",
          currency: product.currency,
          item_brand: product.brand,
          item_category: product.category,
        },
      ],
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
    product: Partial<KlevuRecord>
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
  static categoryMerchandisingProductClick(
    product: Partial<KlevuRecord>,
    categoryTitle: string,
    klevuCategory: string,
    variantId?: string,
    productPosition?: number,
    abTestId?: string,
    abTestVariantId?: string,
    activeFilters?: string,
    override: Partial<KlevuV1CategoryProductsClick> = {}
  ) {
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
}
