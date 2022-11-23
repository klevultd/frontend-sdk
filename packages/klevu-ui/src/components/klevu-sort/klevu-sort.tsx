import { KlevuSearchSorting } from "@klevu/core"
import { Component, Host, h, Event, EventEmitter } from "@stencil/core"

@Component({
  tag: "klevu-sort",
  styleUrl: "klevu-sort.css",
  shadow: true,
})
export class KlevuSort {
  @Event({
    composed: true,
  })
  klevuSortChanged!: EventEmitter<KlevuSearchSorting>

  private options: Array<{ value: KlevuSearchSorting; text: string }> = [
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

  private selected = KlevuSearchSorting.Relevance

  private onChange(event: CustomEvent<string>) {
    const newSort = event.detail as KlevuSearchSorting
    this.selected = newSort
    this.klevuSortChanged.emit(newSort)
  }

  render() {
    return (
      <Host>
        <klevu-dropdown
          name="sort"
          options={this.options}
          selected={this.selected}
          onKlevuDropdownChanged={this.onChange.bind(this)}
        ></klevu-dropdown>
      </Host>
    )
  }
}
