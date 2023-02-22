import { FilterManager, KlevuFilterResultOptions, KlevuFilterResultSlider } from "@klevu/core"
import { Component, Fragment, h, Host, Listen, Prop, Element, forceUpdate } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"

export type KlevuFacetMode = "checkbox" | "radio"

/**
 * Rendering items of single facet
 *
 * @csspart heading - Heading of the facet
 */
@Component({
  tag: "klevu-facet",
  styleUrl: "klevu-facet.css",
  shadow: true,
})
export class KlevuFacet {
  @Element()
  el!: HTMLKlevuFacetElement

  /**
   * From which options to build facet
   */
  @Prop() option?: KlevuFilterResultOptions
  /**
   * From which slider to build facet
   */
  @Prop() slider?: KlevuFilterResultSlider
  /**
   * Originating filter manager which to modify
   */
  @Prop() manager!: FilterManager
  /**
   * Which mode should facets be in
   */
  @Prop() mode: KlevuFacetMode = "checkbox"

  /**
   * Set predefined order for options. Unfound values are in original order in end
   */
  @Prop() customOrder?: string[]

  /**
   * Should the facet be in accordion
   */
  @Prop() accordion?: boolean

  /**
   * Start accordion open
   */
  @Prop() accordionStartOpen?: boolean

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate(event: any) {
    forceUpdate(this.el)
  }

  render() {
    return (
      <Host>
        {this.option ? (
          <Fragment>
            {this.accordion ? (
              <klevu-accordion exportparts={globalExportedParts} startOpen={this.accordionStartOpen}>
                {this.#renderOptions()}
              </klevu-accordion>
            ) : (
              this.#renderOptions()
            )}
          </Fragment>
        ) : this.slider ? (
          <Fragment>
            {this.accordion ? (
              <klevu-accordion exportparts={globalExportedParts} startOpen={this.accordionStartOpen}>
                {this.#renderSlider()}
              </klevu-accordion>
            ) : (
              this.#renderSlider()
            )}
          </Fragment>
        ) : null}
      </Host>
    )
  }

  #renderSlider() {
    if (!this.slider) {
      return null
    }
    return (
      <Fragment>
        <klevu-typography
          part="heading"
          class={{ accordion: Boolean(this.accordion) }}
          variant="body-s-bold"
          slot="header"
        >
          {this.slider.label}
        </klevu-typography>
        <klevu-slider
          slot="content"
          showTooltips
          min={parseFloat(this.slider.min)}
          max={parseFloat(this.slider.max)}
          start={this.slider.start ? parseFloat(this.slider.start) : undefined}
          end={this.slider.end ? parseFloat(this.slider.end) : undefined}
          onKlevuSliderChange={(event) => {
            this.manager.updateSlide(this.slider!.key, event.detail[0], event.detail[1])
          }}
        ></klevu-slider>
      </Fragment>
    )
  }

  #renderOptions() {
    if (!this.option) {
      return null
    }
    const opts = [...this.option.options]
    if (this.customOrder) {
      opts.sort((a, b) => {
        const aio = this.customOrder!.indexOf(a.value)
        const bio = this.customOrder!.indexOf(b.value)

        if (aio === -1 && bio !== -1) {
          return 1
        }
        if (aio !== -1 && bio === -1) {
          return -1
        }

        return aio - bio
      })
    }

    return (
      <Fragment>
        <klevu-typography
          part="heading"
          class={{ accordion: Boolean(this.accordion) }}
          variant="body-s-bold"
          slot="header"
        >
          {this.option.label}
        </klevu-typography>
        <ul slot="content" part="klevu-list">
          {opts.map((o) => (
            <li>
              {this.mode === "checkbox" ? (
                <klevu-checkbox
                  exportparts={globalExportedParts}
                  checked={o.selected}
                  name={this.option!.key}
                  onKlevuCheckboxChange={(event: CustomEvent<boolean>) => {
                    this.manager.toggleOption(this.option!.key, o.name)
                  }}
                >
                  <div class="container">
                    <span class="name">
                      <span>{o.name}</span>
                    </span>
                    <span class="count">({o.count})</span>
                  </div>
                </klevu-checkbox>
              ) : (
                <Fragment>
                  <div class="container">
                    <input
                      type="radio"
                      id={this.option!.key}
                      name={this.option!.key}
                      value={o.value}
                      checked={o.selected}
                      onClick={() => {
                        this.manager.clearOptionSelections(this.option!.key)
                        this.manager.toggleOption(this.option!.key, o.name)
                      }}
                    />
                    <label htmlFor={this.option!.key} class="name">
                      <span>{o.name}</span>
                    </label>
                    <span class="count">({o.count})</span>
                  </div>
                </Fragment>
              )}
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}
