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
    this.klevuClickEventSent.emit(e.detail)
  }

  #filtersAppliedEventHandler = (e: any) => {
    this.klevuFiltersApplied.emit(e.detail)
  }

  #filterSelectionUpdateEventHandler = (e: any) => {
    this.klevuFilterSelectionUpdate.emit(e.detail)
  }

  #lastSearchUpdateEventHandler = (e: any) => {
    this.klevuLastSearchUpdate.emit(e.detail)
  }

  @Event({ composed: true })
  klevuLastSearchUpdate!: EventEmitter<void>

  @Event({ composed: true })
  klevuFilterSelectionUpdate!: EventEmitter<{
    key: string
    name: string
    selected: boolean
  }>

  @Event({ composed: true })
  klevuFiltersApplied!: EventEmitter<{
    filters: FilterManagerFilters[]
  }>

  @Event({ composed: true })
  klevuClickEventSent!: EventEmitter<{
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
