import { FilterManager, KlevuFilterResultOptions, KlevuFilterResultSlider } from "@klevu/core"
import { Component, Host, h, Prop, Fragment } from "@stencil/core"

@Component({
  tag: "klevu-facet",
  styleUrl: "klevu-facet.css",
  shadow: true,
})
export class KlevuFacet {
  @Prop() option: KlevuFilterResultOptions
  @Prop() slider: KlevuFilterResultSlider
  @Prop() manager!: FilterManager

  render() {
    if (this.option) {
      return (
        <Host>
          <ul>
            {this.option.options.map((o) => (
              <li>
                <input type="checkbox" value={o.value} checked={o.selected} />
                {o.name}
              </li>
            ))}
          </ul>
        </Host>
      )
    }

    if (this.slider) {
      return (
        <Host>
          {this.slider.label} ({this.slider.min} - {this.slider.max})
          <input type="text" value={this.slider.start} /> - <input type="text" value={this.slider.end} />
        </Host>
      )
    }

    return null
  }
}
