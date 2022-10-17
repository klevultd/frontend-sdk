import { KlevuAnnotations, KlevuConfig } from "../../index.js"
import { KlevuQueryResult } from "../../models/index.js"
import { get } from "../fetch.js"
import { objectToQueryParameters } from "../../utils/index.js"

/**
 *
 * @param id Id of query response to find
 * @param response Raw API response from server
 * @param product Id of product to find
 * @param languageCode Language code to process in
 * @returns
 */
export async function getAnnotationsForProduct(
  response: KlevuQueryResult,
  productId: string,
  languageCode: string
) {
  const prod = response.records?.find((s) => s.id === productId)
  if (!prod) {
    return undefined
  }

  const paramaters = {
    query: response.meta.searchedTerm,
    title: prod.name,
    category: prod.category,
    languageCode: languageCode,
  }
  const url =
    "https://nlp-services.ksearchnet.com/" +
    KlevuConfig.getDefault().apiKey +
    "/annotations" +
    objectToQueryParameters(paramaters)

  return await get<KlevuAnnotations>(url)
}
