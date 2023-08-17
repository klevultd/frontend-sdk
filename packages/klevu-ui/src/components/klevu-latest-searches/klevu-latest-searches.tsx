import { KlevuLastSearches } from "@klevu/core"
import { Component, h, Host, Prop, State, Event, EventEmitter } from "@stencil/core"

/**
 * Lists latest searches user has made on the site
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
  @Prop() tCaption = "Last searches"

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
        <klevu-typography variant="h3" class="caption">
          {this.tCaption}
        </klevu-typography>
        {this.lastSearches.map((ls) => (
          <klevu-list condensed noXPadding onClick={() => this.#lastSearchClick(ls)}>
            <span slot="primary">{ls}</span>
          </klevu-list>
        ))}
      </Host>
    )
  }
}
