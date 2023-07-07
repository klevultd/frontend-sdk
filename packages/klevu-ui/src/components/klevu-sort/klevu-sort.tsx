import { KlevuSearchSorting } from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

import { KlevuDropdownCustomEvent, KlevuDropdownVariant } from "../../components"

/**
 * Sort dropdown. User can select what kind of sorting they want
 */
@Component({
  tag: "klevu-sort",
  styleUrl: "klevu-sort.css",
  shadow: true,
})
export class KlevuSort {
  /**
   * When the sorting changes
   */
  @Event({
    composed: true,
  })
  klevuSortChanged!: EventEmitter<KlevuSearchSorting>

  /**
   * Dropdown variant
   */
  @Prop()
  variant: KlevuDropdownVariant = "default"

  /**
   * Pass custom options for the sort dropdown
   */
  @Prop()
  options: Array<{ value: KlevuSearchSorting; text: string }> = [
    { value: KlevuSearchSorting.Relevance, text: "Relevance" },
    { value: KlevuSearchSorting.NameAsc, text: "Name ▲" },
    { value: KlevuSearchSorting.NameDesc, text: "Name ▼" },
    { value: KlevuSearchSorting.NewArrivalAsc, text: "New arrivals ▲" },
    { value: KlevuSearchSorting.NewArrivalDesc, text: "New arrivals ▼" },
    { value: KlevuSearchSorting.PriceAsc, text: "Price ▲" },
    { value: KlevuSearchSorting.PriceDesc, text: "Price ▼" },
    { value: KlevuSearchSorting.RatingAsc, text: "Rating ▲" },
    { value: KlevuSearchSorting.RatingDesc, text: "Rating ▼" },
  ]

  #selected = KlevuSearchSorting.Relevance

  #onChange(event: KlevuDropdownCustomEvent<string>) {
    const newSort = event.detail as KlevuSearchSorting
    this.#selected = newSort
    this.klevuSortChanged.emit(newSort)
  }

  render() {
    return (
      <Host>
        <klevu-dropdown
          name="sort"
          options={this.options}
          selected={this.#selected}
          variant={this.variant}
          onKlevuDropdownChanged={this.#onChange.bind(this)}
        ></klevu-dropdown>
      </Host>
    )
  }
}
