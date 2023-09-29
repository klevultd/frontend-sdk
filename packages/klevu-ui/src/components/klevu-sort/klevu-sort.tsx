import { KlevuSearchSorting } from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

import { KlevuDropdownCustomEvent, KlevuDropdownVariant } from "../../components"
import { getTranslation } from "../../utils/getTranslation"
import { partsExports } from "../../utils/partsExports"

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
    { value: KlevuSearchSorting.Relevance, text: getTranslation("sort.tRelevance") },
    { value: KlevuSearchSorting.NameAsc, text: getTranslation("sort.tNameAsc") },
    { value: KlevuSearchSorting.NameDesc, text: getTranslation("sort.tNameDesc") },
    { value: KlevuSearchSorting.NewArrivalAsc, text: getTranslation("sort.tNewArrivalsAsc") },
    { value: KlevuSearchSorting.NewArrivalDesc, text: getTranslation("sort.tNewArrivalsDesc") },
    { value: KlevuSearchSorting.PriceAsc, text: getTranslation("sort.tPriceAsc") },
    { value: KlevuSearchSorting.PriceDesc, text: getTranslation("sort.tPriceDesc") },
    { value: KlevuSearchSorting.RatingAsc, text: getTranslation("sort.tRatingAsc") },
    { value: KlevuSearchSorting.RatingDesc, text: getTranslation("sort.tRatingDesc") },
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
          exportparts={partsExports("klevu-dropdown")}
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
