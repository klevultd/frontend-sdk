import { KlevuKMCSettings } from "@klevu/core"
import { Component, h, Host, Prop, State, Event, EventEmitter } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"
import { getTranslation } from "../../utils/getTranslation"

/**
 * Fetches and displays most popular searches from Klevu Merchant center
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
  @Prop() tCaption = getTranslation("popularSearches.tCaption")

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
        <klevu-typography class="caption" variant="h3">
          {this.tCaption}
        </klevu-typography>
        {this.popularSearches.map((s) => (
          <klevu-list condensed noXPadding onClick={() => this.#popularSearchClick(s)}>
            <span slot="primary">{s}</span>
          </klevu-list>
        ))}
      </Host>
    )
  }
}
