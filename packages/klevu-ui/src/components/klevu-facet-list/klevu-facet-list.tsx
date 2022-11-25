import { FilterManager, KlevuFilterResultOptions, KlevuFilterResultSlider } from "@klevu/core"
import { Component, h, Host, Listen, Prop, State } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
import { KlevuFacetMode } from "../klevu-facet/klevu-facet"

@Component({
  tag: "klevu-facet-list",
  styleUrl: "klevu-facet-list.css",
  shadow: true,
})
export class KlevuFacetList {
  /**
   * Filter managet from which the list is built from
   */
  @Prop() manager!: FilterManager
  /**
   * Set mode for facets or if object is passed then define per key
   */
  @Prop() mode?: KlevuFacetMode | { [key: string]: KlevuFacetMode }

  /**
   * Custom order keys for every facet
   */
  @Prop() customOrder?: { [key: string]: string[] }

  /**
   * Should use accordions to for facets
   */
  @Prop() accordion?: boolean

  @State() options: KlevuFilterResultOptions[] = []
  @State() sliders: KlevuFilterResultSlider[] = []

  connectedCallback() {
    if (!this.manager) {
      return
    }

    this.options = this.manager.options
    this.sliders = this.manager.sliders
  }

  @Listen("klevu-filters-applied", { target: "document" })
  filtersApplied() {
    this.options = this.manager.options
    this.sliders = this.manager.sliders
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
    this.options = this.manager.options
    this.sliders = this.manager.sliders
  }

  render() {
    return (
      <Host>
        {this.options.map((o, index) => {
          let mode
          if (this.mode && typeof this.mode === "string") {
            mode = this.mode
          } else if (this.mode && typeof this.mode === "object") {
            mode = this.mode[o.key]
          }

          return (
            <klevu-facet
              accordion={this.accordion}
              accordionStartOpen={index === 0}
              customOrder={this.customOrder?.[o.key]}
              exportparts={globalExportedParts}
              manager={this.manager}
              option={o}
              mode={mode}
            ></klevu-facet>
          )
        })}
        {this.sliders.map((s) => (
          <klevu-facet
            accordion={this.accordion}
            exportparts={globalExportedParts}
            manager={this.manager}
            slider={s}
          ></klevu-facet>
        ))}
      </Host>
    )
  }
}
