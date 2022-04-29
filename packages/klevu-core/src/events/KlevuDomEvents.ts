/**
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
