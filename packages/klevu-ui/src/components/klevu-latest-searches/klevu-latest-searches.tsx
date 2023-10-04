import { KlevuLastSearches } from "@klevu/core"
import { Component, h, Host, Prop, State, Event, EventEmitter } from "@stencil/core"
import { getTranslation } from "../../utils/getTranslation"
import { partsExports } from "../../utils/partsExports"

/**
 * Lists latest searches user has made on the site
 * @csspart latest-searches-caption The caption for the latest search list
 */
@Component({
  tag: "klevu-latest-searches",
  styleUrl: "klevu-latest-searches.css",
  shadow: true,
})
export class KlevuLatestSearches {
  /**
   * Caption of the list
   */
  @Prop() tCaption: string = getTranslation("latestSearches.tCaption")

  @State() lastSearches: string[] = []

  /**
   * Event that is emitted when a popular search is clicked
   */
  @Event({
    composed: true,
  })
  klevuLastSearchClicked!: EventEmitter<string>

  #lastSearchClick(suggestion: string) {
    this.klevuLastSearchClicked.emit(suggestion)
  }

  async connectedCallback() {
    this.lastSearches = KlevuLastSearches.get().map((s) => s.term)
  }

  render() {
    if (this.lastSearches.length === 0) {
      return null
    }

    return (
      <Host>
        <klevu-typography variant="h3" class="caption" part="latest-searches-caption">
          {this.tCaption}
        </klevu-typography>
        {this.lastSearches.map((ls) => (
          <klevu-list
            condensed
            noXPadding
            onClick={() => this.#lastSearchClick(ls)}
            exportparts={partsExports("klevu-list")}
          >
            <span slot="primary">{ls}</span>
          </klevu-list>
        ))}
      </Host>
    )
  }
}
