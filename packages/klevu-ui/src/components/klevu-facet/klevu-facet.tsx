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
          <h3>{this.option.label}</h3>
          <ul part="klevu-list">
            {this.option.options.map((o) => (
              <li>
                <klevu-checkbox
                  value={o.value}
                  checked={o.selected}
                  onClick={() => this.manager.toggleOption(this.option.key, o.name)}
                ></klevu-checkbox>
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
          {this.slider.label} ({this.slider.min} - {this.slider.max})
          <input type="text" value={this.slider.start} /> - <input type="text" value={this.slider.end} />
        </Host>
      )
    }

    return null
  }
}
