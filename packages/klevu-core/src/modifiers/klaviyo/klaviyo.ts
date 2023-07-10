import { KlevuAnnotations } from "../../models/KlevuFetchResponse.js"
import { KlevuRecord } from "../../models/KlevuRecord.js"
import { KlevuFetchModifer } from "../index.js"

type KlaviyoOptions = {
  productAttributes: string[]
  productLimit: number
  language: string
}

declare global {
  // eslint-disable-next-line no-var
  var _learnq: Array<[string, string, object]>
}

/**
 * Automatically sends search event to Klaviyo on search, recommendations and category navigation.
 *
 * @param params
 * @returns
 */
export function klaviyo(
  params: KlaviyoOptions = {
    productAttributes: [
      "id",
      "name",
      "url",
      "sku",
      "imageUrl",
      "price",
      "salePrice",
    ],
    productLimit: 10,
    language: "en",
  }
): KlevuFetchModifer {
  return {
    klevuModifierId: "kleviyo",
    onResult: (response, query) => {
      // make sure that Klaviyo array is available
      if (!globalThis._learnq) {
        globalThis._learnq = globalThis._learnq || []
      }

      if (
        ![
          "search",
          "categoryMerchandising",
          "recommendation",
          "kmcRecommendation",
        ].includes(query.klevuFunctionId)
      ) {
        console.error(
          "Klevu Klaviyo modifier only works with search, categoryMerchandising, recommendation and kmcRecommendation functions"
        )
        return
      }

      for (const q of query.queries ?? []) {
        // if there is a fallback use that
        const fallbackId = `${q.id}-fallback`

        const res = response.queryExists(fallbackId)
          ? response.queriesById(`${q.id}-fallback`)
          : response.queriesById(q.id)

        if (!res) {
          continue
        }

        const products = res?.records.slice(0, params.productLimit)

        if (!products || products.length == 0) {
          continue
        }

        let annotations: KlevuAnnotations | undefined
        res.hooks.push(async (clickParams) => {
          if (!annotations) {
            annotations = await res.annotationsById?.(
              products[0].id,
              params.language
            )
          }

          const clickedProduct = res.records.find(
            (p) => p.id === clickParams.productId
          )

          globalThis._learnq?.push([
            "track",
            `Klevu ${clickParams.type}`,
            {
              "Search Term": res.meta.searchedTerm,
              "Search Term(full)": annotations?.annotations?.fullTerm,
              Subjects: annotations?.annotations?.subjects,
              "Total Number of Product Results": res.meta.totalResultsFound,
              "Product Clicked":
                clickedProduct &&
                params.productAttributes.reduce((acc, curr) => {
                  acc[curr] = clickedProduct[curr]
                  return acc
                }, {} as KlevuRecord),
              "Search Results": products.map((p) => {
                return params.productAttributes.reduce((acc, curr) => {
                  acc[curr] = p[curr]
                  return acc
                }, {} as KlevuRecord)
              }),
            },
          ])
        })
      }
    },
  }
}
