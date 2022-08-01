import { FilterManager } from "@klevu/core"
import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "klevu-facet-list",
  styleUrl: "klevu-facet-list.css",
  shadow: true,
})
export class KlevuFacetList {
  @Prop() manager: FilterManager

  render() {
    console.log(this.manager)
    return (
      <Host>
        {this.manager.options.map((o) => (
          <klevu-facet manager={this.manager} option={o}></klevu-facet>
        ))}
        {this.manager.sliders.map((s) => (
          <klevu-facet manager={this.manager} slider={s}></klevu-facet>
        ))}
      </Host>
    )
  }
}
