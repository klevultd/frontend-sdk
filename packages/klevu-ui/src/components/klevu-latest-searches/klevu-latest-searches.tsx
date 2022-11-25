import { KlevuLastSearches } from "@klevu/core"
import { Component, h, Host, Prop, State } from "@stencil/core"

@Component({
  tag: "klevu-latest-searches",
  styleUrl: "klevu-latest-searches.css",
  shadow: true,
})
export class KlevuLatestSearches {
  @Prop() caption = "Last searches"
  @State() lastSearches: string[] = []

  async connectedCallback() {
    this.lastSearches = KlevuLastSearches.get().map((s) => s.term)
  }

  render() {
    return (
      <Host>
        <klevu-heading variant="h2">{this.caption}</klevu-heading>
        <ul part="klevu-list">
          {this.lastSearches.map((ls) => (
            <li>{ls}</li>
          ))}
        </ul>
      </Host>
    )
  }
}
