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
  KlevuEventV1CheckedOutProducts,
  KlevuEventV1ProductTracking,
  KlevuEventV1Search,
  KlevuEventV2,
  KlevuV1CategoryProductsClick,
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
   * @param recommendation Metadata of what recommendation is shown
   * @param products List of all products that are shown
   */
  static recommendationView(
    recommendationMetadata: RecommendationViewEventMetaData,
    products: KlevuRecord[]
  ) {
    KlevuEventV2([
      {
        event: "view_recs_list",
        event_apikey: KlevuConfig.default.apiKey,
        event_list_id: recommendationMetadata.recsKey,
        event_list_logic: recommendationMetadata.logic,
        event_list_name: recommendationMetadata.title,
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
      },
    ])
  }

  /**
   * When product has been clicked in the recommendation banner
   *
   * @param recommendationMetadata Metadata of what recommendation is clicked
   * @param product Which product is clicked in the list
   * @param productIndexInList What is the index of the product in the list. Starting from 1
   */
  static recommendationClick(
    recommendationMetadata: RecommendationViewEventMetaData,
    product: KlevuRecord,
    productIndexInList: number
  ) {
    KlevuLastClickedProducts.click(product.id, product)
    KlevuEventV2([
      {
        event: "select_recs_list",
        event_apikey: KlevuConfig.default.apiKey,
        event_list_id: recommendationMetadata.recsKey,
        event_list_logic: recommendationMetadata.logic,
        event_list_name: recommendationMetadata.title,
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
      },
    ])
  }

  /**
   * When product is clicked. Do not use this for recommendations
   *
   * @param searchTerm
   * @param product
   */
  static searchProductClick(
    product: KlevuRecord,
    searchTerm?: string,
    variantId?: string
  ) {
    KlevuLastClickedProducts.click(product.id, product)
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
   * properly. Use `sendSearchEvent()` modifier with search query to send results
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

  /**
   *
   * @param categoryTitle This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories.
   * @param klevuCategory This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category.
   * @param products Products in the view
   * @param pageStartsFrom Offset of the first product being shown on this page. For example, if you are displaying 30 products per page and if a customer is on the 2nd page, the value here should be 30. If on the 3rd page, it will be 60.
   */
  static categoryMerchandisingView(
    categoryTitle: string,
    klevuCategory: string,
    products: Array<Pick<KlevuRecord, "id">>,
    pageStartsFrom?: number
  ) {
    KlevuEventV1CategoryView({
      klevu_apiKey: KlevuConfig.default.apiKey,
      klevu_categoryName: categoryTitle,
      klevu_categoryPath: klevuCategory,
      klevu_productIds: products.map((p) => p.id).join(","),
      klevu_pageStartsFrom: pageStartsFrom,
    })
  }

  /**
   *
   * @param product Product clicked
   * @param categoryTitle This is the name of the category being visited. For example, Stackable Rings. The name should not include parent categories.
   * @param klevuCategory This is the complete hierarchy of the category being visited. For example, Jewellery;Rings;Stackable Rings. Please note the use of a semicolon as the separator between a parent and a child category.
   * @param variantId This is the child/variant ID of the clicked product. eg. 12345. For compound products with a parent and multiple child/variant products, this is the ID of the specific variant.
   * @param productPosition Position of the product on the category page when it was clicked. For example, the value would be 0 if it is the first product on the first page. The value will be 30, if it is the first product on the 2nd page with 30 products being displayed per page.
   */
  static categoryMerchandisingProductClick(
    product: KlevuRecord,
    categoryTitle: string,
    klevuCategory: string,
    variantId?: string,
    productPosition?: number,
    abTestId?: string,
    abTestVariantId?: string
  ) {
    KlevuLastClickedProducts.click(product.id, product)
    let data: KlevuV1CategoryProductsClick = {
      klevu_apiKey: KlevuConfig.default.apiKey,
      klevu_categoryName: categoryTitle,
      klevu_productGroupId: product.itemGroupId,
      klevu_productVariantId: variantId || product.id,
      klevu_categoryPath: klevuCategory,
      klevu_productId: product.id,
      klevu_productName: product.name,
      klevu_productUrl: product.url,
      klevu_salePrice: product.salePrice,
      klevu_productSku: product.sku,
      klevu_productPosition: productPosition,
    }

    if (abTestId && abTestVariantId) {
      data = {
        ...data,
        klevu_abTestId: abTestId,
        klevu_abTestVariantId: abTestVariantId,
      }
    }

    KlevuEventV1CategoryProductClick(data)
  }
}
