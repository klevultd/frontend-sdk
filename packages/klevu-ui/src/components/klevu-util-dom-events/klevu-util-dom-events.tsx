import { KlevuDomEvents, type FilterManagerFilters, type KlevuRecord } from "@klevu/core"
import { Component, Event, EventEmitter, Host, h } from "@stencil/core"

/**
 * Utility compoenent that simplifies listening Klevu SDK Dom events
 * https://docs.klevu.com/headless-sdk/events-analytics#dhk6Y
 *
 */
@Component({
  tag: "klevu-util-dom-events",
  shadow: true,
})
export class KlevuUtilDomEvents {
  connectedCallback() {
    document.addEventListener(KlevuDomEvents.ClickEventSent, this.#clickSendEventHandler)
    document.addEventListener(KlevuDomEvents.FiltersApplied, this.#filtersAppliedEventHandler)
    document.addEventListener(KlevuDomEvents.FilterSelectionUpdate, this.#filterSelectionUpdateEventHandler)
    document.addEventListener(KlevuDomEvents.LastSearchUpdate, this.#lastSearchUpdateEventHandler)
  }
  disconnectedCallback() {
    document.removeEventListener(KlevuDomEvents.ClickEventSent, this.#clickSendEventHandler)
    document.removeEventListener(KlevuDomEvents.FiltersApplied, this.#filtersAppliedEventHandler)
    document.removeEventListener(KlevuDomEvents.FilterSelectionUpdate, this.#filterSelectionUpdateEventHandler)
    document.removeEventListener(KlevuDomEvents.LastSearchUpdate, this.#lastSearchUpdateEventHandler)
  }

  #clickSendEventHandler = (e: any) => {
    this.clickEventSent.emit(e.detail)
  }

  #filtersAppliedEventHandler = (e: any) => {
    this.filtersApplied.emit(e.detail)
  }

  #filterSelectionUpdateEventHandler = (e: any) => {
    this.filterSelectionUpdate.emit(e.detail)
  }

  #lastSearchUpdateEventHandler = (e: any) => {
    this.lastSearchUpdate.emit(e.detail)
  }

  @Event({ composed: true })
  lastSearchUpdate!: EventEmitter<void>

  @Event({ composed: true })
  filterSelectionUpdate!: EventEmitter<{
    key: string
    name: string
    selected: boolean
  }>

  @Event({ composed: true })
  filtersApplied!: EventEmitter<{
    filters: FilterManagerFilters[]
  }>

  @Event({ composed: true })
  clickEventSent!: EventEmitter<{
    productId: string
    product?: Partial<KlevuRecord>
  }>

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
