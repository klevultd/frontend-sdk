import { KlevuKMCSettings } from "@klevu/core"
import { Component, Host, h, State } from "@stencil/core"

@Component({
  tag: "klevu-popular-searches",
  styleUrl: "klevu-popular-searches.css",
  shadow: true,
})
export class KlevuPopularSearches {
  @State() popularSearches: string[]

  async connectedCallback() {
    const settings = await KlevuKMCSettings()
    this.popularSearches = settings.root?.klevu_webstorePopularTerms ?? []
  }

  render() {
    return (
      <Host>
        <ul>{this.popularSearches ? this.popularSearches.map((s) => <li>{s}</li>) : null}</ul>
      </Host>
    )
  }
}
