import { KlevuDomEvents } from "../events/KlevuDomEvents.js"
import { isBrowser } from "../utils/index.js"

export type KlevuLastSearch = {
  timestamp: number
  term: string
}
const SAVE_KEY = "klevu-last-searches"
let lastSearches: KlevuLastSearch[] = []
if (isBrowser()) {
  const res = window.localStorage.getItem(SAVE_KEY)
  if (res) {
    lastSearches = JSON.parse(res)
  }
}

export const KlevuLastSearches = {
  /**
   * Saves last searched term. If there is previous it's moved to as last item
   *
   * @param term searched term
   */
  save: (term: string) => {
    const lastIndex = lastSearches.findIndex((ls) => ls.term === term)

    if (lastIndex > -1) {
      lastSearches.splice(lastIndex, 1)
    }

    lastSearches.push({
      timestamp: new Date().getTime(),
      term: term,
    })

    if (isBrowser()) {
      document.dispatchEvent(new CustomEvent(KlevuDomEvents.LastSearchUpdate))
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(lastSearches))
    }
  },

  /**
   *
   * @returns five latests searches
   */
  get: () => {
    return lastSearches.slice(-5)
  },
}
