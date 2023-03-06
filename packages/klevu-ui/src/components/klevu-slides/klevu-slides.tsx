import { Component, h, Host, Prop } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

/**
 * Horizontal slides component
 */
@Component({
  tag: "klevu-slides",
  styleUrl: "klevu-slides.css",
  shadow: true,
})
export class KlevuSlides {
  /**
   * When clicking next/prev buttons should scroll full width of container
   */
  @Prop()
  slideFullWidth?: boolean

  /**
   * Height of the slider
   */
  @Prop()
  height = 300

  /**
   * Hides next and previous buttons
   */
  @Prop()
  hideNextPrev?: boolean

  #gap = 0
  #containerDiv?: HTMLDivElement
  #slotElement?: HTMLSlotElement

  #prev = () => {
    if (!this.#containerDiv) {
      return
    }

    this.#containerDiv.scrollLeft -= this.#calcAmountToSlide()
  }

  #next = () => {
    if (!this.#containerDiv) {
      return
    }
    this.#containerDiv.scrollLeft += this.#calcAmountToSlide()
  }

  #calcAmountToSlide(): number {
    let w: number | undefined
    if (this.slideFullWidth) {
      w = this.#containerDiv?.clientWidth
    } else {
      w = (this.#slotElement?.assignedElements().at(0)?.clientWidth ?? 200) + this.#gap
    }

    return w ?? 200
  }

  connectedCallback() {
    this.#gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--klevu-spacing-05"))
    if (isNaN(this.#gap)) {
      this.#gap = 0
    }
  }

  render() {
    return (
      <Host style={{ height: `${this.height}px` }}>
        {this.hideNextPrev ? null : (
          <klevu-button
            exportparts={globalExportedParts}
            class="prev"
            icon="chevron_left"
            onClick={this.#prev.bind(this)}
          ></klevu-button>
        )}
        <div
          class={{
            slides: true,
            hideNextPrev: Boolean(this.hideNextPrev),
          }}
          ref={(el) => (this.#containerDiv = el)}
          style={{
            "--klevu-product-width": "200px",
          }}
        >
          <slot ref={(el) => (this.#slotElement = el as HTMLSlotElement)}></slot>
        </div>
        {this.hideNextPrev ? null : (
          <klevu-button
            exportparts={globalExportedParts}
            class="next"
            icon="chevron_right"
            onClick={this.#next.bind(this)}
          ></klevu-button>
        )}
      </Host>
    )
  }
}
