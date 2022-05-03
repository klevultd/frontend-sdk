import Axios from "axios"
import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuConfig } from "../../config.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { KlevuAllRecordQueries } from "../../models/KlevuAllRecordQueries.js"
import { KlevuLastClickedProducts } from "../../store/lastClickedProducts.js"
import { personalisation } from "../../modifiers/personalisation/personalisation.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"

type Options = {
  id: string

  /**
   * If KMC recommendation is category based then category path is required.
   * Requires categories to be separated with semicolon. For example
   * "Mens;Shoes"
   */
  categoryPath?: string

  /**
   * If KMC recommendation is Product based then it is required to pass current pages
   * product id
   */
  currentProductId?: string

  /**
   * If KMC recommendation is Checkout page based then its required to provide
   * productIds that are currently in the cart
   */
  cartProductIds?: string[]
}

enum KMCRecommendationPagetype {
  Home = "HOME",
  Category = "CATEGORY",
  Product = "PRODUCT",
  Checkout = "CHECKOUT",
}

export enum KMCRecommendationLogic {
  Trending = "TRENDING",
  TrendingPersonalized = "TRENDING_PERSONALIZED",
  NewestArrivals = "NEWEST_ARRIVALS",
  RecentlyViewed = "RECENTLY_VIEWED",
  HandPicked = "HAND_PICKED",
  OtherAlsoViewed = "OTHER_ALSO_VIEWED",
  Similar = "SIMILAR",
  BoughtTogether = "BOUGHT_TOGETHER",
}

type KlevuKMCRecommendationBase = {
  metadata: {
    title: string
    recsKey: string
    pageType: KMCRecommendationPagetype
    logic: KMCRecommendationLogic
    maxProducts: number
    productThreshold: number
    enabled: boolean
  }
  search: {
    basePath: string
    payload: string
  }
  templates: {
    base: string
  }
  styles: {
    base: string
  }
  scripts: {
    recsObject?: unknown
  }
}

type KlevuKMCHomeRecommendation = KlevuKMCRecommendationBase & {
  metadata: {
    pageType: KMCRecommendationPagetype.Home
    logic:
      | KMCRecommendationLogic.Trending
      | KMCRecommendationLogic.TrendingPersonalized
      | KMCRecommendationLogic.NewestArrivals
      | KMCRecommendationLogic.RecentlyViewed
      | KMCRecommendationLogic.HandPicked
  }
}

type KlevuKMCCategoryRecommendation = KlevuKMCRecommendationBase & {
  metadata: {
    pageType: KMCRecommendationPagetype.Category
    logic:
      | KMCRecommendationLogic.Trending
      | KMCRecommendationLogic.TrendingPersonalized
      | KMCRecommendationLogic.NewestArrivals
      | KMCRecommendationLogic.HandPicked
  }
}

type KlevuKMCProductPageRecommendation = KlevuKMCRecommendationBase & {
  metadata: {
    pageType: KMCRecommendationPagetype.Product
    logic:
      | KMCRecommendationLogic.OtherAlsoViewed
      | KMCRecommendationLogic.Similar
      | KMCRecommendationLogic.HandPicked
  }
}

type KlevuKMCCheckoutRecommendation = KlevuKMCRecommendationBase & {
  metadata: {
    pageType: KMCRecommendationPagetype.Checkout
    logic:
      | KMCRecommendationLogic.BoughtTogether
      | KMCRecommendationLogic.HandPicked
  }
}

export type KlevuKMCRecommendations =
  | KlevuKMCHomeRecommendation
  | KlevuKMCCategoryRecommendation
  | KlevuKMCProductPageRecommendation
  | KlevuKMCCheckoutRecommendation

/**
 * Fetches products based on
 *
 * @category RecommendationQuery
 * @param recommendationId Id of recommendation in the backend
 * @returns
 */
export async function kmcRecommendation(
  recommendationId: string,
  options?: Partial<Options>,
  ...modifiers: KlevuFetchModifer[]
): Promise<KlevuFetchFunctionReturnValue> {
  const recsResult = await Axios.get<KlevuKMCRecommendations>(
    `https://config-cdn.ksearchnet.com/recommendations/${KlevuConfig.default.apiKey}/settings/${recommendationId}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  )

  const kmcConfig = recsResult.data

  const configOverride = new KlevuConfig({
    apiKey: KlevuConfig.default.apiKey,
    url: `https://${kmcConfig.search.basePath}`,
  })

  const payload = JSON.parse(recsResult.data.search.payload)

  const queries: KlevuAllRecordQueries[] = payload.recordQueries.map(
    (query: KlevuBaseQuery) => ({
      ...query,
      id: options?.id ?? "kmcrecommendation",
    })
  )

  if (
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Home &&
    kmcConfig.metadata.logic === KMCRecommendationLogic.RecentlyViewed
  ) {
    const last10 = KlevuLastClickedProducts.getLastClickedLatestsFirst(10)
    for (const q of queries) {
      if (!q.settings) {
        q.settings = {}
      }
      q.settings.customeANDQuery = `id:(${last10.join(" OR ")})`
      q.settings.topIds = last10.map((id) => ({ key: "id", value: id }))
    }
  }
  if (
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Category &&
    [
      KMCRecommendationLogic.Trending,
      KMCRecommendationLogic.TrendingPersonalized,
      KMCRecommendationLogic.NewestArrivals,
    ].includes(kmcConfig.metadata.logic)
  ) {
    if (!options || !options.categoryPath) {
      throw new Error("'categoryPath' is required for Category recommendation")
    }

    for (const q of queries) {
      if (!q.settings) {
        q.settings = {}
      }
      if (!q.settings.query) {
        q.settings.query = {}
      }
      q.settings.query.categoryPath = options?.categoryPath
    }
  }

  if (
    kmcConfig.metadata.logic === KMCRecommendationLogic.TrendingPersonalized
  ) {
    modifiers.push(personalisation())
  }

  if (
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Product &&
    [
      KMCRecommendationLogic.OtherAlsoViewed,
      KMCRecommendationLogic.Similar,
    ].includes(kmcConfig.metadata.logic)
  ) {
    if (!options || !options.currentProductId) {
      throw new Error(
        "'currentProductId' is required for Product recommendation"
      )
    }

    for (const q of queries) {
      if (!q.settings) {
        q.settings = {}
      }
      if (!q.settings.context) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        q.settings.context = {} as any
      }
      q.settings.excludeIds = [
        {
          key: "itemGroupId",
          value: options.currentProductId,
        },
      ]
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      q.settings.context!.recentObjects = [
        {
          typeOfRecord: KlevuTypeOfRecord.Product,
          records: [
            {
              id: options.currentProductId,
            },
          ],
        },
      ]
    }
  }

  if (
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Checkout &&
    kmcConfig.metadata.logic === KMCRecommendationLogic.BoughtTogether
  ) {
    if (!options || !options.cartProductIds) {
      throw new Error(
        "'cartProductIds' is required for Checkout recommendation"
      )
    }

    for (const q of queries) {
      if (!q.settings) {
        q.settings = {}
      }
      if (!q.settings.context) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        q.settings.context = {} as any
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      q.settings.context!.recentObjects = [
        {
          typeOfRecord: KlevuTypeOfRecord.Product,
          records: options.cartProductIds.map((id) => ({ id })),
        },
      ]
    }
  }

  return {
    klevuFunctionId: "kmcRecommendation",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queries,
    params: {
      kmcConfig,
    },
    modifiers,
    configOverride,
  }
}
