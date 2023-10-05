import { KlevuKMCSettings } from "@klevu/core"
import { Component, h, Host, Prop, State, Event, EventEmitter } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"
import { getTranslation } from "../../utils/getTranslation"
import { partsExports } from "../../utils/partsExports"

/**
 * Fetches and displays most popular searches from Klevu Merchant center
 * @csspart popular-searches-base The container for the popular searches
 * @csspart popular-searches-caption The caption for the search
 * @csspart popular-searches-list-item The list item in search
 */
@Component({
  tag: "klevu-popular-searches",
  styleUrl: "klevu-popular-searches.css",
  shadow: true,
})
export class KlevuPopularSearches {
  /**
   * Caption of the list
   */
  @Prop() tCaption: string = getTranslation("popularSearches.tCaption")

  @State() popularSearches: string[] = []

  /**
   * Event that is emitted when a popular search is clicked
   */
  @Event({
    composed: true,
  })
  klevuPopularSearchClicked!: EventEmitter<string>

  #popularSearchClick(suggestion: string) {
    this.klevuPopularSearchClicked.emit(suggestion)
  }

  async connectedCallback() {
    await KlevuInit.ready()
    try {
      const settings = await KlevuKMCSettings()
      this.popularSearches = settings.root?.klevu_webstorePopularTerms ?? []
    } catch {}
  }

  render() {
    if (this.popularSearches.length == 0) {
      return null
    }
    return (
      <Host>
        <div part="popular-searches-base">
          <klevu-typography class="caption" variant="h3" part="popular-searches-caption">
            {this.tCaption}
          </klevu-typography>
          {this.popularSearches.map((s) => (
            <klevu-list
              condensed
              noXPadding
              onClick={() => this.#popularSearchClick(s)}
              exportparts={partsExports("klevu-list")}
            >
              <span part="popular-searches-list-item" slot="primary">
                {s}
              </span>
            </klevu-list>
          ))}
        </div>
      </Host>
    )
  }
}
