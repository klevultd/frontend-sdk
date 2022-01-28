import { KlevuConfig } from "./index"

export enum KlevuTypeOfRequest {
  Search = "SEARCH",
}

export enum KlevuTypeOfRecord {
  Product = "KLEVU_PRODUCT",
}

type KlevuRecordQuery = {
  id: string
}

export type KlevuSearchRecordQuery = KlevuRecordQuery & {
  typeOfRequest: KlevuTypeOfRequest.Search
  settings: {
    query: {
      term: string
    }
    limit: number
    typeOfRecords: KlevuTypeOfRecord[]
    fields?: string[]
  }
}

type AllRecordQueries = KlevuSearchRecordQuery

type KlevuPayload = {
  context: {
    apiKeys: string[]
  }
  recordQueries: AllRecordQueries[]
}

export async function KlevuRequest(recordQueries: AllRecordQueries[]) {
  const payload: KlevuPayload = {
    context: {
      apiKeys: [KlevuConfig.apiKey],
    },
    recordQueries,
  }

  const response = window.fetch(KlevuConfig.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  return (await response).json()
}
