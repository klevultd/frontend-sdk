import { isBrowser } from "../utils/isBrowser.js"

const FIVE_MINUTES = 300_000

/**
 * @ignore
 */
export class KlevuFetchCache<T extends object, K extends object> {
  _cache = new Map<number, K>()
  _timestamp = new Map<number, number>()

  check(key: T): K | undefined {
    // never cache on node server
    if (!isBrowser()) {
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
        return cached
      }
      this._cache.delete(hash)
      this._timestamp.delete(hash)
    }

    return undefined
  }

  cache(key: T, data: K, timetocache = FIVE_MINUTES) {
    const hash = this.hash(key)
    this._cache.set(hash, data)
    this._timestamp.set(hash, new Date().getTime() + timetocache)
  }

  private hash(input: T): number {
    return Array.from(JSON.stringify(input)).reduce(
      (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
      0
    )
  }
}
