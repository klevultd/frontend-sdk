/**
 * KMC Map model
 */

interface KlevuKeywordUrlMap {
  keywords: string[]
  url: string
}

export interface KMCMapsRootObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  klevu_autoCorrectMap: any[]
  klevu_keywordUrlMap: KlevuKeywordUrlMap[]
}
