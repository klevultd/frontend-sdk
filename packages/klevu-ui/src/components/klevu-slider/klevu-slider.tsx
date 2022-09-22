import { Component, Host, h, Prop, Element, Listen, Event, EventEmitter } from "@stencil/core"
import noUiSlider from "nouislider"

@Component({
  tag: "klevu-slider",
  styleUrl: "klevu-slider.css",
  shadow: true,
})
export class KlevuSlider {
  @Prop() min: number
  @Prop() max: number
  @Prop() start?: number
  @Prop() end?: number
  @Prop() showTooltips?: boolean

  @Element() el: HTMLElement

  @Event({
    composed: true,
  })
  klevuSliderChange: EventEmitter<[number, number]>

  initNoUISlider(el: HTMLDivElement) {
    noUiSlider.create(el, {
      connect: true,
      tooltips: this.showTooltips,
      step: 1,
      range: {
        max: this.max,
        min: this.min,
      },
      start: [this.start || this.min, this.end || this.max],
    })
    // @ts-expect-error
    el.noUiSlider.on("end", (ev) => {
      this.klevuSliderChange.emit([parseFloat(ev[0]), parseFloat(ev[1])])
    })
  }

  render() {
    return (
      <Host>
        <div
          class={{
            outerContainer: true,
            hasTooltips: this.showTooltips,
          }}
        >
          <div class="container" ref={this.initNoUISlider.bind(this)}></div>
        </div>
      </Host>
    )
  }
}
