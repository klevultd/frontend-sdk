import { Component, Element, Event, EventEmitter, h, Host, Prop } from "@stencil/core"
import noUiSlider, { API } from "nouislider"

/**
 * @param slider HtmlElement with an initialized slider
 * @param threshold Minimum proximity (in percentages) to merge tooltips
 * @param separator String joining tooltips
 */
function mergeTooltips(slider: any, threshold: number, separator: string) {
  const textIsRtl = getComputedStyle(slider).direction === "rtl"
  const isRtl = slider.noUiSlider.options.direction === "rtl"
  const isVertical = slider.noUiSlider.options.orientation === "vertical"
  const tooltips = slider.noUiSlider.getTooltips()
  const origins = slider.noUiSlider.getOrigins()
  if (!tooltips) {
    return
  }
  // Move tooltips into the origin element. The default stylesheet handles this.
  tooltips.forEach(function (tooltip: string, index: number) {
    if (tooltip) {
      origins[index].appendChild(tooltip)
    }
  })

  slider.noUiSlider.on(
    "update",
    function (values: string[], handle: number, unencoded: number[], tap: boolean, positions: number[]) {
      const pools: [number[]] = [[]]
      const poolPositions: [number[]] = [[]]
      const poolValues: [string[]] = [[]]
      let atPool = 0

      // Assign the first tooltip to the first pool, if the tooltip is configured
      if (tooltips[0]) {
        pools[0][0] = 0
        poolPositions[0][0] = positions[0]
        poolValues[0][0] = values[0]
      }

      for (let i = 1; i < positions.length; i++) {
        if (!tooltips[i] || positions[i] - positions[i - 1] > threshold) {
          atPool++
          pools[atPool] = []
          poolValues[atPool] = []
          poolPositions[atPool] = []
        }

        if (tooltips[i]) {
          pools[atPool].push(i)
          poolValues[atPool].push(values[i])
          poolPositions[atPool].push(positions[i])
        }
      }

      pools.forEach(function (pool, poolIndex) {
        const handlesInPool = pool.length

        for (let j = 0; j < handlesInPool; j++) {
          const handleNumber = pool[j]

          if (j === handlesInPool - 1) {
            let offset = 0

            poolPositions[poolIndex].forEach(function (value) {
              offset += 1000 - value
            })

            const direction = isVertical ? "bottom" : "right"
            const last = isRtl ? 0 : handlesInPool - 1
            const lastOffset = 1000 - poolPositions[poolIndex][last]
            offset = (textIsRtl && !isVertical ? 100 : 0) + offset / handlesInPool - lastOffset

            // Center this tooltip over the affected handles
            tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator)
            tooltips[handleNumber].style.display = "block"
            tooltips[handleNumber].style[direction] = offset + "%"
          } else {
            // Hide this tooltip
            tooltips[handleNumber].style.display = "none"
          }
        }
      })
    }
  )
}

/**
 * Horizontal slider component. By default used for price range in this package. But can
 * be used for other purposes as well.
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
   * Format tooltip value with function
   */
  @Prop()
  formatTooltip?: (value: number) => string

  /**
   * Show tooltips on top of slider
   */
  @Prop() showTooltips?: boolean

  @Element() el?: HTMLKlevuSliderElement

  sliderInstance?: API

  /**
   * When values change
   */
  @Event({
    composed: true,
  })
  klevuSliderChange!: EventEmitter<[number, number]>

  #initNoUISlider(el: HTMLDivElement | undefined) {
    if (!el) {
      return
    }

    if (this.sliderInstance) {
      this.sliderInstance.set([this.start || this.min, this.end || this.max])
      return
    }

    this.sliderInstance = noUiSlider.create(el, {
      connect: true,
      tooltips: this.showTooltips
        ? this.formatTooltip
          ? {
              to: this.formatTooltip,
            }
          : true
        : false,
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
    mergeTooltips(el, 20, " - ")
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
          <div class="container" ref={this.#initNoUISlider.bind(this)}></div>
        </div>
      </Host>
    )
  }
}
