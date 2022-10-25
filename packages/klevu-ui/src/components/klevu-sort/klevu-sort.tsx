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

  render() {
    const options: Array<{ value: KlevuSearchSorting; text: string }> = [
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

    return (
      <Host>
        <klevu-dropdown
          name="sort"
          options={options}
          onKlevuDropdownChanged={(e: any) => this.klevuSortChanged.emit(e.target.value)}
        ></klevu-dropdown>
      </Host>
    )
  }
}
