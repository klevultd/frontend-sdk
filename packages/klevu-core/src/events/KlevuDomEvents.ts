/**
 * @category KlevuEvents
 * Global custom document events that @klevu/core sends
 */
export enum KlevuDomEvents {
  /**
   * When list of last searched terms update
   */
  LastSearchUpdate = "klevu-last-search-update",

  /**
   * When filter manager selection has changed
   */
  FilterSelectionUpdate = "klevu-filter-selection-updates",

  /**
   * When any click event has been fired on the page
   */
  ClickEventSent = "klevu-click-event-sent",
}

/**
 * Helper function to listen Klevu Dom events
 *
 * @example ```ts
 * import { KlevuDomEvents, KlevuListenDomEvent } from '@klevu/core'
 *
 * // Event to listen
 * const stopListen = KlevuListenDomEvent(KlevuDomEvents.LastSearchUpdate, (event) => {
 *   console.log('last search updated!', event.detail)
 * })
 *
 * // stop listening
 * stopListen();
 * ```
 *
 * @category KlevuEvents
 * @param klevuDomEvent What event to listen
 * @param callback What to do when event is fired
 * @returns Function to stop listening
 */
export function KlevuListenDomEvent(
  klevuDomEvent: KlevuDomEvents,
  callback: (event: Event) => void
) {
  document.addEventListener(klevuDomEvent, callback)

  return () => {
    document.removeEventListener(klevuDomEvent, callback)
  }
}
