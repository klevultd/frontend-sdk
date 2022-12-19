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
  private elementWidth = 300
  private containerDiv?: HTMLDivElement
  private slotElement?: HTMLSlotElement

  private prev = () => {
    if (!this.containerDiv) {
      return
    }

    this.containerDiv.scrollLeft -= this.elementWidth
  }

  private next = () => {
    if (!this.containerDiv) {
      return
    }
    this.containerDiv.scrollLeft += this.elementWidth
  }

  componentDidLoad() {
    const w = this.slotElement?.assignedElements().at(0)?.clientWidth
    if (w) {
      this.elementWidth = w
    }
  }

  render() {
    return (
      <Host>
        <klevu-button class="prev" onClick={this.prev.bind(this)}>
          &lt;
        </klevu-button>
        <div class="slides" ref={(el) => (this.containerDiv = el)}>
          <slot ref={(el) => (this.slotElement = el as HTMLSlotElement)}></slot>
        </div>
        <klevu-button class="next" onClick={this.next.bind(this)}>
          &gt;
        </klevu-button>
      </Host>
    )
  }
}
