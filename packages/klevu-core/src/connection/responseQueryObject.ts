import { KlevuEvents } from "../events/KlevuEvents.js"
import { KlevuQueryResult } from "../models/KlevuApiRawResponse.js"
import {
  KlevuFetchQueryResult,
  KlevuNextFunc,
} from "../models/KlevuFetchResponse.js"
import { KlevuResultEventOnResult } from "../models/KlevuResultEvent.js"
import { KlevuFetchFunctionReturnValue } from "../queries/index.js"
import { extractActiveFilters } from "../utils/extractActiveFilters.js"
import { KlevuResponseObject } from "./responseObject.js"
import { fetchNextPage } from "./resultHelpers/fetchNextPage.js"
import { getAnnotationsForProduct } from "./resultHelpers/getAnnotationsForProduct.js"

export class KlevuResponseQueryObject {
  responseObject: KlevuResponseObject
  query: KlevuQueryResult
  filters: KlevuQueryResult["filters"]
  meta: KlevuQueryResult["meta"]
  records: KlevuQueryResult["records"]
  id: string
  func: KlevuFetchFunctionReturnValue
  functionParams?: KlevuFetchFunctionReturnValue["params"]
  hooks: Array<KlevuResultEventOnResult> = []
  next?: KlevuNextFunc
  getPage?: KlevuNextFunc
  getSearchClickSendEvent?: KlevuFetchQueryResult["getSearchClickSendEvent"]
  getCategoryMerchandisingClickSendEvent?: KlevuFetchQueryResult["getCategoryMerchandisingClickSendEvent"]
  getRecommendationClickSendEvent?: KlevuFetchQueryResult["getRecommendationClickSendEvent"]
  searchViewSent = false

  constructor(
    responseObject: KlevuResponseObject,
    query: KlevuQueryResult,
    func: KlevuFetchFunctionReturnValue
  ) {
    this.responseObject = responseObject
    this.query = query
    this.functionParams = func?.params
    this.func = func
    this.filters = query.filters
    this.meta = query.meta
    this.records = query.records
    this.id = query.id
    this.initResultFunctions()
  }

  initResultFunctions() {
    this.next = fetchNextPage({
      response: this.responseObject.apiResponse,
      func: this.func,
    })
    this.getPage = fetchNextPage({
      response: this.responseObject.apiResponse,
      func: this.func,
      ignoreLastPageUndefined: true,
    })

    switch (this.func?.klevuFunctionId) {
      case "search": {
        this.getSearchClickSendEvent = function (
          productId,
          variantId?,
          override?
        ) {
          if (!this.func) {
            return
          }

          if (!this.searchViewSent) {
            KlevuEvents.search({
              term: this.query.meta.searchedTerm,
              totalResults: this.query.meta.noOfResults,
              typeOfSearch: this.query.meta.typeOfSearch,
              activeFilters: extractActiveFilters(this.query),
              override,
            })
            this.searchViewSent = true
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
        this.getCategoryMerchandisingClickSendEvent = function (
          productId,
          categoryTitle,
          variantId?,
          override?
        ) {
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
        this.getRecommendationClickSendEvent = function (
          productId,
          variantId?,
          override?
        ) {
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
}
