import { FilterManager, KlevuFilterResultOptions, KlevuFilterResultSlider } from "@klevu/core"
import { Component, Host, h, Prop, Listen, State } from "@stencil/core"

@Component({
  tag: "klevu-facet-list",
  styleUrl: "klevu-facet-list.css",
  shadow: true,
})
export class KlevuFacetList {
  @Prop() manager: FilterManager
  @State() options: KlevuFilterResultOptions[] = []
  @State() sliders: KlevuFilterResultSlider[] = []

  connectedCallback() {
    this.options = this.manager.options
    this.sliders = this.manager.sliders
  }

  @Listen("klevu-filters-applied", { target: "document" })
  filtersApplied(event) {
    console.log("filtersapplied", event)
    this.options = this.manager.options
    this.sliders = this.manager.sliders
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate(event) {
    this.options = this.manager.options
    this.sliders = this.manager.sliders
  }

  render() {
    return (
      <Host>
        {this.options.map((o) => (
          <klevu-facet manager={this.manager} option={o}></klevu-facet>
        ))}
        {this.sliders.map((s) => (
          <klevu-facet manager={this.manager} slider={s}></klevu-facet>
        ))}
      </Host>
    )
  }
}
