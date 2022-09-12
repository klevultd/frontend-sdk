import { KlevuKMCSettings } from "@klevu/core"
import { Component, Host, h, State, Prop } from "@stencil/core"

@Component({
  tag: "klevu-popular-searches",
  styleUrl: "klevu-popular-searches.css",
  shadow: true,
})
export class KlevuPopularSearches {
  @State() popularSearches: string[]
  @Prop() caption = "Popular searches"

  async connectedCallback() {
    try {
      const settings = await KlevuKMCSettings()
      this.popularSearches = settings.root?.klevu_webstorePopularTerms ?? []
    } catch {}
  }

  render() {
    return (
      <Host>
        <klevu-heading variant="h2">{this.caption}</klevu-heading>
        <ul part="klevu-list">{this.popularSearches ? this.popularSearches.map((s) => <li>{s}</li>) : null}</ul>
      </Host>
    )
  }
}
