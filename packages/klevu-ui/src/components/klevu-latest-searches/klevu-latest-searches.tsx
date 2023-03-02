import { KlevuLastSearches } from "@klevu/core"
import { Component, h, Host, Prop, State } from "@stencil/core"

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
  @Prop() caption = "Last searches"

  @State() lastSearches: string[] = []

  async connectedCallback() {
    this.lastSearches = KlevuLastSearches.get().map((s) => s.term)
  }

  render() {
    return (
      <Host>
        <klevu-typography variant="h3" class="caption">
          {this.caption}
        </klevu-typography>
        {this.lastSearches.map((ls) => (
          <klevu-list condensed noXPadding>
            <span slot="primary">{ls}</span>
          </klevu-list>
        ))}
      </Host>
    )
  }
}
