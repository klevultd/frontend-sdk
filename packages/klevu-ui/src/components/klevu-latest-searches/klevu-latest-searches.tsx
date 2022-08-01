import { KlevuLastClickedProducts, KlevuLastSearches } from "@klevu/core"
import { Component, Host, h, State } from "@stencil/core"

@Component({
  tag: "klevu-latest-searches",
  styleUrl: "klevu-latest-searches.css",
  shadow: true,
})
export class KlevuLatestSearches {
  @State() lastSearches: string[] = []

  async connectedCallback() {
    this.lastSearches = KlevuLastSearches.get().map((s) => s.term)
  }

  render() {
    return (
      <Host>
        <ul>
          {this.lastSearches.map((ls) => (
            <li>{ls}</li>
          ))}
        </ul>
      </Host>
    )
  }
}
