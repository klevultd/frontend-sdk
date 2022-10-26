import { FilterManager, KlevuFilterResultOptions, KlevuFilterResultSlider } from "@klevu/core"
import { Component, Host, h, Prop, Fragment } from "@stencil/core"

export type KlevuFacetMode = "checkbox" | "radio"

@Component({
  tag: "klevu-facet",
  styleUrl: "klevu-facet.css",
  shadow: true,
})
export class KlevuFacet {
  /**
   * From which options to build facet
   */
  @Prop() option?: KlevuFilterResultOptions
  /**
   * From which slider to build facet
   */
  @Prop() slider?: KlevuFilterResultSlider
  /**
   * Originating filter manager which to modify
   */
  @Prop() manager!: FilterManager
  /**
   * Which mode should facets be in
   */
  @Prop() mode: KlevuFacetMode = "checkbox"

  /**
   * Set predefined order for options. Unfound values are in original order in end
   */
  @Prop() customOrder?: string[]

  render() {
    if (this.option) {
      const opts = [...this.option.options]
      if (this.customOrder) {
        opts.sort((a, b) => {
          const aio = this.customOrder!.indexOf(a.value)
          const bio = this.customOrder!.indexOf(b.value)

          if (aio === -1 && bio !== -1) {
            return 1
          }
          if (aio !== -1 && bio === -1) {
            return -1
          }

          return aio - bio
        })
      }

      return (
        <Host>
          <h3>{this.option.label}</h3>
          <ul part="klevu-list">
            {opts.map((o) => (
              <li>
                {this.mode === "checkbox" ? (
                  <klevu-checkbox
                    value={o.value}
                    checked={o.selected}
                    onClick={() => this.manager.toggleOption(this.option!.key, o.name)}
                  ></klevu-checkbox>
                ) : (
                  <input
                    type="radio"
                    name={this.option!.key}
                    value={o.value}
                    checked={o.selected}
                    onClick={() => {
                      this.manager.clearOptionSelections(this.option!.key)
                      this.manager.toggleOption(this.option!.key, o.name)
                    }}
                  />
                )}
                <span class="name">{o.name}</span>
                <span class="count">{o.count}</span>
              </li>
            ))}
          </ul>
        </Host>
      )
    }

    if (this.slider) {
      return (
        <Host>
          <h3>{this.slider.label}</h3>
          <klevu-slider
            showTooltips
            min={parseFloat(this.slider.min)}
            max={parseFloat(this.slider.max)}
            start={this.slider.start ? parseFloat(this.slider.start) : undefined}
            end={this.slider.end ? parseFloat(this.slider.end) : undefined}
            onKlevuSliderChange={(event) => {
              this.manager.updateSlide(this.slider!.key, event.detail[0], event.detail[1])
              console.log(event)
            }}
          ></klevu-slider>
        </Host>
      )
    }

    return null
  }
}
