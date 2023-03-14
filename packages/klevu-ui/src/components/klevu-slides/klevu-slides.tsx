import { Component, h, Host, Prop } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

/**
 * Horizontal slides component. Can be used to display a list of items horizontally. Has optional title and next/prev buttons.
 */
@Component({
  tag: "klevu-slides",
  styleUrl: "klevu-slides.css",
  shadow: true,
})
export class KlevuSlides {
  /**
   * Heading for the slides component
   */
  @Prop() heading?: string

  /**
   * When clicking next/prev buttons should scroll full width of container
   */
  @Prop()
  slideFullWidth?: boolean

  /**
   * Hides next and previous buttons
   */
  @Prop()
  hideNextPrev?: boolean

  #gap = 0
  #slotElement?: HTMLSlotElement
  #scrollElement?: HTMLKlevuUtilScrollbarsElement

  #prev = async () => {
    const instance = await this.#scrollElement?.getInstance()
    if (instance) {
      instance.elements().viewport.scrollTo({
        left: instance.elements().viewport.scrollLeft - (await this.#calcAmountToSlide()),
        behavior: "smooth",
      })
    }
  }

  #next = async () => {
    const instance = await this.#scrollElement?.getInstance()
    if (instance) {
      instance.elements().viewport.scrollTo({
        left: instance.elements().viewport.scrollLeft + (await this.#calcAmountToSlide()),
        behavior: "smooth",
      })
    }
  }

  async #calcAmountToSlide(): Promise<number> {
    let w: number | undefined
    if (this.slideFullWidth) {
      const cont = await this.#scrollElement?.getContainer()
      if (cont) {
        w = cont.clientWidth
      }
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
      <Host>
        {this.heading === undefined || !this.hideNextPrev ? (
          <header>
            <klevu-typography variant="h2">{this.heading}</klevu-typography>
            {this.hideNextPrev ? null : (
              <div>
                <klevu-button
                  exportparts={globalExportedParts}
                  class="prev"
                  icon="chevron_left"
                  onClick={this.#prev.bind(this)}
                  isSecondary
                ></klevu-button>
                <klevu-button
                  exportparts={globalExportedParts}
                  class="next"
                  icon="chevron_right"
                  onClick={this.#next.bind(this)}
                  isSecondary
                ></klevu-button>
              </div>
            )}
          </header>
        ) : null}

        <klevu-util-scrollbars overflowY="scroll" ref={(el) => (this.#scrollElement = el)}>
          <div class={{ slides: true }}>
            <slot ref={(el) => (this.#slotElement = el as HTMLSlotElement)}></slot>
          </div>
        </klevu-util-scrollbars>
      </Host>
    )
  }
}
