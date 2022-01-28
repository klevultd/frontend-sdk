type KlevuConfiguration = {
  url: string
  apiKey: string
}

export class KlevuConfig {
  static apiKey: string
  static url: string

  static init(config: KlevuConfiguration) {
    this.apiKey = config.apiKey
    this.url = config.url
  }
}

export { KlevuTypeOfRecord, KlevuTypeOfRequest } from "./connection"
export * from "./search/index"
