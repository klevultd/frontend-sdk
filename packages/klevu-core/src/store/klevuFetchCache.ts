import { KlevuConfig } from "../config.js"
import { isBrowser } from "../utils/isBrowser.js"

/**
 * @ignore
 */
export class KlevuFetchCache<T extends object, K extends object> {
  _cache = new Map<number, string>()
  _timestamp = new Map<number, number>()

  /**
   * checks if cache has value and returns it
   *
   * @param key
   * @param force For testing purposes
   * @returns undefined if not cached
   */
  check(key: T, force = false): K | undefined {
    // never cache on node server
    if (!force && !isBrowser()) {
      return undefined
    }

    const hash = this.hash(key)

    if (!this._cache.has(hash)) {
      return undefined
    }

    const cached = this._cache.get(hash)
    const ts = this._timestamp.get(hash)

    if (cached && ts) {
      if (new Date().getTime() < ts) {
        return JSON.parse(cached)
      }
      this._cache.delete(hash)
      this._timestamp.delete(hash)
    }

    return undefined
  }

  cache(key: T, data: K, timetocache = KlevuConfig.getDefault().cacheMaxTTL) {
    const hash = this.hash(key)
    this._cache.set(hash, JSON.stringify(data))
    this._timestamp.set(hash, new Date().getTime() + timetocache)
  }

  private hash(input: T): number {
    return Array.from(JSON.stringify(input)).reduce(
      (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
      0
    )
  }
}
