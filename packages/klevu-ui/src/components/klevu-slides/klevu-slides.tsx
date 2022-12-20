import { Component, Element, h, Host, Prop } from "@stencil/core"

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

  private gap = 0
  private containerDiv?: HTMLDivElement
  private slotElement?: HTMLSlotElement

  private prev = () => {
    if (!this.containerDiv) {
      return
    }

    this.containerDiv.scrollLeft -= this.calcAmountToSlide()
  }

  private next = () => {
    if (!this.containerDiv) {
      return
    }
    this.containerDiv.scrollLeft += this.calcAmountToSlide()
  }

  private calcAmountToSlide(): number {
    let w: number | undefined
    if (this.slideFullWidth) {
      w = this.containerDiv?.clientWidth
    } else {
      w = (this.slotElement?.assignedElements().at(0)?.clientWidth ?? 300) + this.gap
    }

    return w ?? 300
  }

  connectedCallback() {
    this.gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--klevu-spacing-large"))
  }

  render() {
    return (
      <Host style={{ height: `${this.height}px` }}>
        {this.hideNextPrev ? null : (
          <klevu-button class="prev" onClick={this.prev.bind(this)}>
            &lt;
          </klevu-button>
        )}
        <div
          class={{
            slides: true,
            hideNextPrev: Boolean(this.hideNextPrev),
          }}
          ref={(el) => (this.containerDiv = el)}
        >
          <slot ref={(el) => (this.slotElement = el as HTMLSlotElement)}></slot>
        </div>
        {this.hideNextPrev ? null : (
          <klevu-button class="next" onClick={this.next.bind(this)}>
            &gt;
          </klevu-button>
        )}
      </Host>
    )
  }
}
