import { KlevuKMCSettings } from "@klevu/core"
import { Component, h, Host, Prop, State } from "@stencil/core"
import { KlevuInit } from "../klevu-init/klevu-init"

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
  @Prop() caption = "Popular searches"
  @State() popularSearches?: string[]

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
        <klevu-typography variant="h2">{this.caption}</klevu-typography>
        <ul part="klevu-list">{this.popularSearches ? this.popularSearches.map((s) => <li>{s}</li>) : null}</ul>
      </Host>
    )
  }
}
