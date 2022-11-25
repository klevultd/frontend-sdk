import { KlevuKMCSettings } from "@klevu/core"
import { Component, h, Host, Prop, State } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"

@Component({
  tag: "klevu-popular-searches",
  styleUrl: "klevu-popular-searches.css",
  shadow: true,
})
export class KlevuPopularSearches {
  @State() popularSearches?: string[]
  @Prop() caption = "Popular searches"

  async connectedCallback() {
    await KlevuInit.ready()
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
