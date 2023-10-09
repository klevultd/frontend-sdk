import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuConfig } from "../../config.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { KlevuAllRecordQueries } from "../../models/KlevuAllRecordQueries.js"
import { KlevuLastClickedProducts } from "../../store/lastClickedProducts.js"
import { personalisation } from "../../modifiers/personalisation/personalisation.js"
import { KlevuTypeOfRecord } from "../../models/KlevuTypeOfRecord.js"
import { KlevuBaseQuery } from "../../models/KlevuBaseQuery.js"
import { get } from "../../connection/fetch.js"

export type KlevuKMCRecommendationOptions = {
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
   * If KMC recommendation is Product based then Item group id (the parent id) is required information.
   */
  itemGroupId?: string

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
  BoughtTogetherPDP = "BOUGHT_TOGETHER_PDP",
  VisuallySimilar = "VISUALLY_SIMILAR",
  Custom = "CUSTOM_LOGIC",
}

export type KlevuKMCRecommendations = {
  metadata: {
    /**
     * Title of the recommendation
     */
    title: string
    /**
     * ID of the recommendation
     */
    recsKey: string
    /**
     * Target page type of recommendation
     */
    pageType: KMCRecommendationPagetype
    /**
     * Logic used in recommendation
     */
    logic: KMCRecommendationLogic
    /**
     * Amount of products to fetch
     */
    maxProducts: number
    productThreshold: number
    enabled: boolean
    /**
     * ID of the spot
     */
    spotKey: string
    /**
     * Spot name
     */
    spotName: string
    /**
     * User segment key
     */
    segmentKey: string | null
    /**
     * User segment name
     */
    segmentName: string | null

    /**
     * Special cases of recommendation
     */
    action: "STATIC_CONTENT" | "HIDE_RECOMMENDATION" | "FILTER" | null
  }
  search: {
    basePath: string
    payload: string
    recsAction?: "STATIC_CONTENT" | "HIDE_RECOMMENDATION" | "FILTER"
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
  staticContent?: {
    targetUrl: string
    contentType: "image"
    image: Array<{
      resolution: string
      url: string
      altTag: string
      maxWidth: number
    }>
  }
}

/**
 * Fetches products based on KMC recommendation. Provide id created in KMC
 *
 * @category RecommendationQuery
 * @param recommendationId Id of recommendation in the backend
 * @returns
 */
export async function kmcRecommendation(
  recommendationId: string,
  options?: Partial<KlevuKMCRecommendationOptions>,
  ...modifiers: KlevuFetchModifer[]
): Promise<KlevuFetchFunctionReturnValue> {
  let kmcConfig: KlevuKMCRecommendations | undefined
  try {
    let advFilterParams = ""
    if (
      options?.categoryPath ||
      options?.currentProductId ||
      options?.itemGroupId
    ) {
      advFilterParams = "?"
      advFilterParams += options.categoryPath
        ? `&cp=${options.categoryPath}`
        : ""
      advFilterParams += options.currentProductId
        ? `&pid=${options.currentProductId}`
        : ""
      advFilterParams += options.itemGroupId
        ? `&gpid=${options.itemGroupId}`
        : ""
    }

    kmcConfig = await get<KlevuKMCRecommendations>(
      `https://config-cdn.ksearchnet.com/recommendations/${
        KlevuConfig.getDefault().apiKey
      }/settings/${recommendationId}${advFilterParams}`
    )
  } catch (e) {
    console.warn("Failed to fetch given KMC recommendation")
    return {
      klevuFunctionId: "kmcRecommendation",
    }
  }

  if (!kmcConfig) {
    throw new Error("Couldn't fetch KMC config")
  }

  const configOverride = new KlevuConfig({
    apiKey: KlevuConfig.getDefault().apiKey,
    url: `https://${kmcConfig.search.basePath}`,
  })

  if (
    kmcConfig.metadata.action === "HIDE_RECOMMENDATION" ||
    kmcConfig.metadata.action === "STATIC_CONTENT"
  ) {
    return {
      klevuFunctionId: "kmcRecommendation",
      params: {
        kmcConfig,
      },
    }
  }

  const payload = JSON.parse(kmcConfig.search.payload)

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
      q.settings.customANDQuery = `id:(${last10.join(" OR ")})`
      q.settings.topIds = last10.map((id) => ({ key: "id", value: id }))
    }
  }
  if (
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Category &&
    [
      KMCRecommendationLogic.Trending,
      KMCRecommendationLogic.TrendingPersonalized,
      KMCRecommendationLogic.NewestArrivals,
      KMCRecommendationLogic.Custom,
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
      if (options.itemGroupId) {
        q.settings.excludeIds = [
          {
            key: "itemGroupId",
            value: options.itemGroupId,
          },
        ]
      }
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
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Product &&
    [
      KMCRecommendationLogic.BoughtTogetherPDP,
      KMCRecommendationLogic.Custom,
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
      if (options.itemGroupId) {
        q.settings.excludeIds = [
          {
            key: "itemGroupId",
            value: options.itemGroupId,
          },
        ]
      }

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

  // only VisuallySimilar uses sourceObjects
  if (
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Product &&
    kmcConfig.metadata.logic === KMCRecommendationLogic.VisuallySimilar
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
      if (options.itemGroupId) {
        q.settings.excludeIds = [
          {
            key: "itemGroupId",
            value: options.itemGroupId,
          },
        ]
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      q.settings.context!.sourceObjects = [
        {
          typeOfRecord: KlevuTypeOfRecord.Product,
          records: [
            {
              id: options.currentProductId,
            },
          ],
        },
      ]

      if (options.itemGroupId) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        q.settings.context!.sourceObjects[0].records.push({
          itemGroupId: options.itemGroupId,
        })
      }
    }
  }

  if (
    kmcConfig.metadata.pageType === KMCRecommendationPagetype.Checkout &&
    [
      KMCRecommendationLogic.BoughtTogether,
      KMCRecommendationLogic.Custom,
    ].includes(kmcConfig.metadata.logic)
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

  if (kmcConfig.metadata.productThreshold) {
    modifiers.push({
      klevuModifierId: "kmcThreshold",
      onResult: (response) => {
        const copy = { ...response }
        for (const qr of copy.apiResponse?.queryResults ?? []) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (qr.records.length < kmcConfig!.metadata.productThreshold) {
            qr.records = []
          }
        }
        return response
      },
    })
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
