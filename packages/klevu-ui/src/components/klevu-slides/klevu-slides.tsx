import { Component, h, Host, Prop } from "@stencil/core"
import { parts } from "../../utils/parts"
import { partsExports } from "../../utils/partsExports"

/**
 * Horizontal slides component. Can be used to display a list of items horizontally. Has optional title and next/prev buttons.
 * @csspart slides-base The container for the slides component
 * @csspart slides-heading The heading of the slides
 * @csspart slides-previous-button The previous button
 * @csspart slides-next-button The next button
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

  /**
   * center position next and previous buttons
   */
  @Prop()
  centerNextPrev?: boolean

  #gap = 0
  #slotElement?: HTMLSlotElement
  #scrollElement?: HTMLKlevuUtilScrollbarsElement
  #previousButton?: HTMLKlevuButtonElement
  #nextButton?: HTMLKlevuButtonElement
  #validateNavigation = async () => {
    const instance = await this.#scrollElement?.getInstance()
    if (instance?.customInstance) {
      const elements = instance.customInstance.elements()
      const amountToSlide = await this.#calcAmountToSlide()
      const hideNext =
        elements.viewport.scrollLeft + elements.viewport.clientWidth + amountToSlide >=
        elements.viewport.scrollWidth + amountToSlide

      if (hideNext) {
        this.#nextButton?.classList.add("hidden")
      } else {
        this.#nextButton?.classList.remove("hidden")
      }
      if (elements.viewport.scrollLeft === 0) {
        this.#previousButton?.classList.add("hidden")
      } else {
        this.#previousButton?.classList.remove("hidden")
      }
    }
  }
  #prev = async () => {
    const instance = await this.#scrollElement?.getInstance()
    if (instance?.customInstance) {
      const elements = instance.customInstance.elements()
      elements.viewport.scrollTo({
        left: elements.viewport.scrollLeft - (await this.#calcAmountToSlide()),
        behavior: "smooth",
      })
    } else if (instance?.nativeContainer) {
      instance.nativeContainer.scroll({
        left: instance.nativeContainer.scrollLeft - (await this.#calcAmountToSlide()),
        behavior: "smooth",
      })
    }
  }

  #next = async () => {
    const instance = await this.#scrollElement?.getInstance()
    if (instance?.customInstance) {
      const elements = instance.customInstance.elements()
      elements.viewport.scrollTo({
        left: elements.viewport.scrollLeft + (await this.#calcAmountToSlide()),
        behavior: "smooth",
      })
    } else if (instance?.nativeContainer) {
      instance.nativeContainer.scroll({
        left: instance.nativeContainer.scrollLeft + (await this.#calcAmountToSlide()),
        behavior: "smooth",
      })
    }
  }

  #attachEventListener = async () => {
    const instance = await this.#scrollElement?.getInstance()
    if (instance?.customInstance) {
      const elements = instance.customInstance.elements()
      elements.viewport.addEventListener("scrollend", this.#validateNavigation)
    } else if (instance?.nativeContainer) {
      instance.nativeContainer.addEventListener("scrollend", this.#validateNavigation)
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

  componentDidLoad() {
    this.#validateNavigation()
    this.#attachEventListener()
  }

  render() {
    return (
      <Host>
        {this.centerNextPrev ? (
          <div part="slides-base">
            {this.heading === undefined || !this.hideNextPrev ? (
              <header>
                <klevu-typography variant="h2" part="slides-heading">
                  {this.heading}
                </klevu-typography>
              </header>
            ) : null}
            <div class="gridButtons">
              {this.hideNextPrev ? null : (
                <div class="left">
                  <klevu-button
                    exportparts={partsExports("klevu-button")}
                    part="slides-previous-button"
                    class="prev"
                    icon="chevron_left"
                    onClick={this.#prev.bind(this)}
                    ref={(el) => (this.#previousButton = el as HTMLKlevuButtonElement)}
                  ></klevu-button>
                </div>
              )}
              <klevu-util-scrollbars overflowY="scroll" ref={(el) => (this.#scrollElement = el)}>
                <div class={{ slides: true }}>
                  <slot ref={(el) => (this.#slotElement = el as HTMLSlotElement)}></slot>
                </div>
              </klevu-util-scrollbars>
              {this.hideNextPrev ? null : (
                <div class="right">
                  <klevu-button
                    exportparts={partsExports("klevu-button")}
                    part="slides-next-button"
                    class="next"
                    icon="chevron_right"
                    onClick={this.#next.bind(this)}
                    ref={(el) => (this.#nextButton = el as HTMLKlevuButtonElement)}
                  ></klevu-button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div part="slides-base">
            {this.heading === undefined || !this.hideNextPrev ? (
              <header>
                <klevu-typography variant="h2" part="slides-heading">
                  {this.heading}
                </klevu-typography>
                {this.hideNextPrev ? null : (
                  <div>
                    <klevu-button
                      exportparts={partsExports("klevu-button")}
                      part="slides-previous-button"
                      class="prev"
                      icon="chevron_left"
                      onClick={this.#prev.bind(this)}
                      ref={(el) => (this.#previousButton = el as HTMLKlevuButtonElement)}
                    ></klevu-button>
                    <klevu-button
                      exportparts={partsExports("klevu-button")}
                      part="slides-next-button"
                      class="next"
                      icon="chevron_right"
                      onClick={this.#next.bind(this)}
                      ref={(el) => (this.#nextButton = el as HTMLKlevuButtonElement)}
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
          </div>
        )}
      </Host>
    )
  }
}
