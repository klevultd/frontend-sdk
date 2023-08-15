import { KlevuEvents } from "../events/KlevuEvents.js"
import { KlevuQueryResult } from "../models/KlevuApiRawResponse.js"
import { KlevuFetchQueryResult } from "../models/KlevuFetchResponse.js"
import { KlevuResultEventOnResult } from "../models/KlevuResultEvent.js"
import { applyFilterWithManager } from "../modifiers/index.js"
import { KlevuFetchFunctionReturnValue } from "../queries/index.js"
import { FilterManager } from "../store/filterManager.js"
import { extractActiveFilters } from "../utils/extractActiveFilters.js"
import { KlevuFetch, removeListFilters } from "./klevuFetch.js"
import { KlevuResponseObject } from "./responseObject.js"
import { getAnnotationsForProduct } from "./resultHelpers/getAnnotationsForProduct.js"

/**
 * Result object for each query. A storage for results. Can be used to fetch more data, send events etc.
 */
export class KlevuResponseQueryObject {
  /**
   * Original request response that includes all queries
   */
  responseObject: KlevuResponseObject

  /**
   * This query
   */
  query: KlevuQueryResult

  /**
   * Function used to create this query
   */
  func: KlevuFetchFunctionReturnValue

  /**
   * Hooks that can be used to listen for events
   */
  hooks: KlevuResultEventOnResult[] = []

  /**
   * When query is search this is available. It is used to send search click events
   */
  searchClickEvent?: KlevuFetchQueryResult["searchClickEvent"]

  /**
   * When query is categoryMerchandising this is available. It is used to send categoryMerchandising click events
   */
  categoryMerchandisingClickEvent?: KlevuFetchQueryResult["categoryMerchandisingClickEvent"]

  /**
   * When query is recommendation this is available. It is used to send recommendation click events
   */
  recommendationClickEvent?: KlevuFetchQueryResult["recommendationClickEvent"]

  constructor(
    responseObject: KlevuResponseObject,
    query: KlevuQueryResult,
    func: KlevuFetchFunctionReturnValue
  ) {
    this.responseObject = responseObject
    this.query = query
    this.func = func
    this.initEventFunctions()
  }

  /**
   * All filters related to this query
   */
  get filters() {
    return this.query.filters
  }

  /**
   * Id if the query
   */
  get id() {
    return this.query.id
  }

  /**
   * Meta data of the query
   */
  get meta() {
    return this.query.meta
  }

  /**
   * Records of the query
   */
  get records() {
    return this.query.records
  }

  /**
   * Special parameters that are saved to query
   */
  get functionParams() {
    return this.func.params
  }

  /**
   * Fetches page of results. If pageIndex is not defined it will fetch next page.
   *
   * @param params
   * @returns
   */
  async getPage(params?: {
    /**
     * Limit number of results for next query. By default this is automatically calculated from previous result
     */
    limit?: number
    /**
     * Filter manager to apply for next function
     */
    filterManager?: FilterManager

    /**
     * Use page index to load certain page instead of next available. 0 is first page
     */
    pageIndex?: number
  }): Promise<KlevuResponseObject | undefined> {
    const newFunc = { ...this.func }
    const prevQueryResponse = this.query

    if (!newFunc.queries) {
      return undefined
    }

    for (let i = 0; i < newFunc.queries.length; i++) {
      const prevQuery = newFunc.queries[i]

      if (!prevQuery.settings) {
        prevQuery.settings = {}
      }

      if (params?.pageIndex !== undefined) {
        prevQuery.settings.offset =
          prevQueryResponse.meta.noOfResults * params.pageIndex
      } else {
        prevQuery.settings.offset =
          prevQueryResponse.meta.noOfResults + prevQueryResponse.meta.offset
      }
      prevQuery.settings.limit = params?.limit ?? prevQuery.settings?.limit ?? 5

      newFunc.queries[i] = prevQuery
    }

    // add previous filters with manager
    if (params?.filterManager) {
      if (!newFunc.modifiers) {
        newFunc.modifiers = []
      }
      newFunc.modifiers.push(applyFilterWithManager(params.filterManager))
    }

    newFunc.previousResultRecords = [
      ...(this.func.previousResultRecords ?? []),
      ...prevQueryResponse.records,
    ]

    return await KlevuFetch(removeListFilters(newFunc, prevQueryResponse))
  }

  /**
   *
   * @returns true if there are more pages to fetch
   */
  hasNextPage() {
    return (
      this.query.meta.totalResultsFound >
      this.query.meta.offset + this.query.meta.noOfResults
    )
  }

  /**
   *
   * @returns total number of pages
   */
  getTotalPages() {
    return Math.ceil(this.query.meta.totalResultsFound / this.query.meta.offset)
  }

  private initEventFunctions() {
    switch (this.func?.klevuFunctionId) {
      case "search": {
        this.searchClickEvent = function ({
          productId,
          variantId,
          autoSendViewEvent = true,
          override,
        }) {
          if (!this.func) {
            return
          }

          if (autoSendViewEvent && !this.func.params?.searchSendEventSent) {
            KlevuEvents.search({
              term: this.query.meta.searchedTerm,
              totalResults: this.query.meta.noOfResults,
              typeOfSearch: this.query.meta.typeOfSearch,
              activeFilters: extractActiveFilters(this.query),
              override,
            })
            if (!this.func.params) {
              this.func.params = {}
            }
            this.func.params.searchSendEventSent = true
          }

          const record = [
            ...this.query.records,
            ...(this.func.previousResultRecords ?? []),
          ].find((r) => r.id === productId)
          if (!record) {
            throw new Error(
              `KlevuEvents: Given "${productId}" doesn't exists in this.querys`
            )
          }

          KlevuEvents.searchProductClick({
            product: record,
            searchTerm: this.query.meta.searchedTerm,
            variantId,
          })

          for (const hook of this.hooks ?? []) {
            hook({ type: "search", productId, variantId })
          }
        }
        break
      }

      case "categoryMerchandising": {
        this.categoryMerchandisingClickEvent = function ({
          productId,
          categoryTitle,
          variantId,
          override,
        }) {
          if (!this.func) {
            return
          }

          const record = [
            ...this.query.records,
            ...(this.func.previousResultRecords ?? []),
          ].find((r) => r.id === productId)

          if (!record) {
            throw new Error(
              `KlevuEvents: Given "${productId}" doesn't exists in this.querys`
            )
          }

          const index = this.query.records.findIndex((r) => r.id === productId)

          const q = this.func.queries?.find((q) =>
            Boolean(q.settings?.query?.categoryPath)
          )

          let abTestId, abTestVariantId

          if (!this.func.params) {
            this.func.params = {}
          }

          if (this.func.params.abtest) {
            abTestId = this.func.params.abtest.abTestId
            abTestVariantId = this.func.params.abtest.abTestVariantId
          }

          KlevuEvents.categoryMerchandisingProductClick(
            record,
            categoryTitle,
            q?.settings?.query?.categoryPath ?? "unknown",
            variantId,
            index + 1,
            abTestId,
            abTestVariantId,
            extractActiveFilters(this.query),
            override
          )

          for (const hook of this.hooks ?? []) {
            hook({ type: "categoryMerchandising", productId, variantId })
          }
        }

        break
      }

      case "kmcRecommendation": {
        this.recommendationClickEvent = function ({
          productId,
          variantId,
          override,
        }) {
          if (!this.func) {
            return
          }

          const config = this.func.params?.kmcConfig
          const record = [
            ...this.query.records,
            ...(this.func.previousResultRecords ?? []),
          ].find((r) => r.id === productId)
          if (!record) {
            throw new Error(
              `KlevuEvents: Given "${productId}" doesn't exists in this.querys`
            )
          }

          if (!config) {
            throw new Error(
              "KlevuEvents: Recommendation kmcConfig not available"
            )
          }

          const index = this.query.records.findIndex((r) => r.id === productId)
          KlevuEvents.recommendationClick({
            recommendationMetadata: config.metadata,
            product: record,
            productIndexInList: index + 1,
            variantId,
            override,
          })

          for (const hook of this.hooks ?? []) {
            hook({ type: "recommendation", productId, variantId })
          }
        }
      }
    }
  }

  annotationsById(productId: string, languageCode: string) {
    return getAnnotationsForProduct(this.query, productId, languageCode)
  }

  /**
   * @returns List of params used in the query and the metadata that was generated during
   * the query. This is useful for example to fetching KMC metadata that was received
   * for recommendations query.
   */
  getQueryParameters() {
    return this.func.params
  }
}
