/**
 * KMC Map model
 */
declare module KMCMaps {
  export interface KlevuKeywordUrlMap {
    keywords: string[]
    url: string
  }

  export interface RootObject {
    klevu_autoCorrectMap: any[]
    klevu_keywordUrlMap: KlevuKeywordUrlMap[]
  }
}
