import { Component, Element, Event, EventEmitter, h, Host, Prop } from "@stencil/core"
import noUiSlider from "nouislider"

/**
 * Horizontal slider component. Used for price range
 */
@Component({
  tag: "klevu-slider",
  styleUrl: "klevu-slider.css",
  shadow: true,
})
export class KlevuSlider {
  /**
   * Min value of the range
   */
  @Prop() min!: number
  /**
   * Max value of the range
   */
  @Prop() max!: number
  /**
   * Current start value of the range
   */
  @Prop() start?: number
  /**
   * Current end value of the range
   */
  @Prop() end?: number

  /**
   * Show tooltips on top of slider
   */
  @Prop() showTooltips?: boolean

  @Element() el?: HTMLKlevuSliderElement

  /**
   * When values change
   */
  @Event({
    composed: true,
  })
  klevuSliderChange!: EventEmitter<[number, number]>

  initNoUISlider(el: HTMLDivElement | undefined) {
    if (!el) {
      return
    }
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
            hasTooltips: Boolean(this.showTooltips),
          }}
        >
          <div class="container" ref={this.initNoUISlider.bind(this)}></div>
        </div>
      </Host>
    )
  }
}
