import { FilterManager, KlevuFilterResultOptions, KlevuFilterResultSlider } from "@klevu/core"
import {
  Component,
  Fragment,
  h,
  Host,
  Listen,
  Prop,
  Element,
  forceUpdate,
  State,
  Event,
  EventEmitter,
} from "@stencil/core"
import { getGlobalSettings } from "../../utils/utils"
import { getTranslation } from "../../utils/getTranslation"

export type KlevuFacetMode = "checkbox" | "radio"

export type KlevuSelectionUpdatedEventDetail = {
  manager: FilterManager
  filter?: {
    key: string
    name: string
    selected?: boolean
    start?: string
    end?: string
  }
}

/**
 * Rendering items of single facet with all its options or a slider.
 *
 * Manager property must be set for this component to work.
 *
 * @csspart facet-heading - Heading of the facet
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
   * From which options to build facet. Single option value from Klevu SDK FilterManager. Either this or slider must be set.
   */
  @Prop() option?: KlevuFilterResultOptions

  /**
   * From which slider to build facet.
   */
  @Prop() slider?: KlevuFilterResultSlider

  /**
   * Originating filter manager which to modify. This is the most important property of the component.
   * It will be used to modify the filter state for queries.
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

  /**
   * Override label text with custom value
   */
  @Prop() labelOverride?: string

  @Prop() tMore = getTranslation("facet.tMore")

  /**
   * Show all options
   */
  @State() showAll = false

  /**
   * When filter selection is updated
   */
  @Event({ composed: true })
  klevuFilterSelectionUpdate!: EventEmitter<KlevuSelectionUpdatedEventDetail>

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate(event: any) {
    forceUpdate(this.el)

    this.klevuFilterSelectionUpdate.emit({
      manager: this.manager,
      filter: event.detail,
    })
  }

  render() {
    return (
      <Host>
        {this.option ? (
          <Fragment>
            {this.accordion ? (
              <klevu-accordion startOpen={this.accordionStartOpen}>{this.#renderOptions()}</klevu-accordion>
            ) : (
              this.#renderOptions()
            )}
          </Fragment>
        ) : this.slider ? (
          <Fragment>
            {this.accordion ? (
              <klevu-accordion startOpen={this.accordionStartOpen}>{this.#renderSlider()}</klevu-accordion>
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
          part="facet-heading"
          class={{ accordion: Boolean(this.accordion) }}
          variant="body-s-bold"
          slot="header"
        >
          {this.labelOverride || this.slider.label}
        </klevu-typography>
        <klevu-slider
          slot="content"
          showTooltips
          min={parseFloat(this.slider.min)}
          max={parseFloat(this.slider.max)}
          start={this.slider.start ? parseFloat(this.slider.start) : undefined}
          end={this.slider.end ? parseFloat(this.slider.end) : undefined}
          formatTooltip={(value) =>
            (getGlobalSettings()?.renderPrice?.(value.toFixed(2), "EUR") ?? value.toFixed(2)).toString()
          }
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
    let opts = [...this.option.options]
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

    let showAllButton = false
    if (!this.showAll && opts.length > 5) {
      opts = opts.slice(0, 5)
      showAllButton = true
    }

    return (
      <Fragment>
        <klevu-typography
          part="facet-heading"
          class={{ accordion: Boolean(this.accordion) }}
          variant="body-s-bold"
          slot="header"
        >
          {this.labelOverride || this.option.label}
        </klevu-typography>
        <div class="options" slot="content">
          {opts.map((o) => (
            <div class="option">
              {this.mode === "checkbox" ? (
                <klevu-checkbox
                  checked={o.selected}
                  name={this.option!.key}
                  onKlevuCheckboxChange={(event: CustomEvent<boolean>) => {
                    this.manager.toggleOption(this.option!.key, o.value)
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
                <div class="container">
                  <input
                    type="radio"
                    id={this.option!.key}
                    name={this.option!.key}
                    value={o.value}
                    checked={o.selected}
                    onClick={() => {
                      this.manager.clearOptionSelections(this.option!.key)
                      this.manager.toggleOption(this.option!.key, o.value)
                    }}
                  />
                  <label htmlFor={this.option!.key} class="name">
                    <span>{o.name}</span>
                  </label>
                  <span class="count">({o.count})</span>
                </div>
              )}
            </div>
          ))}
          {showAllButton ? (
            <klevu-button
              style={{ "--klevu-button-text-align": "left" }}
              isTertiary
              fullWidth
              onClick={() => (this.showAll = true)}
            >
              {this.tMore}
            </klevu-button>
          ) : null}
        </div>
      </Fragment>
    )
  }
}
