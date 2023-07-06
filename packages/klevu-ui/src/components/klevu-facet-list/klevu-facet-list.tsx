import {
  FilterManager,
  KlevuDomEvents,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuFilterResultRating,
} from "@klevu/core"
import { Component, EventEmitter, h, Host, Listen, Prop, State, Event, forceUpdate, Element } from "@stencil/core"
import { KlevuFacetMode } from "../klevu-facet/klevu-facet"

/**
 * Render all facets of filter manager
 *
 * @cssprop --klevu-face-list-width 200px Width of the facet listing
 */
@Component({
  tag: "klevu-facet-list",
  styleUrl: "klevu-facet-list.css",
  shadow: true,
})
export class KlevuFacetList {
  @Element()
  el!: HTMLKlevuFacetListElement

  /**
   * Filter managet from which the list is built from
   */
  @Prop() manager!: FilterManager
  /**
   * Set mode for facets or if object is passed then define per key
   */
  @Prop() mode?: KlevuFacetMode | { [key: string]: KlevuFacetMode }

  /**
   * Custom order keys for every facet
   */
  @Prop() customOrder?: { [key: string]: string[] }

  /**
   * Should use accordions to for facets
   */
  @Prop() accordion?: boolean

  /**
   * Display "apply filters" button in the end. And do not apply filters until this button is pressed
   */
  @Prop() useApplyButton?: boolean

  /**
   * Button text for Apply button when using `useApplyButton`
   */
  @Prop() applyButtonText = "Apply"

  /**
   * Button text for Clear button when using `useApplyButton`
   */
  @Prop() clearButtonText = "Clear"

  /**
   * Default price label for sliders
   */
  @Prop() defaultPriceLabel = "Price"

  /**
   * When filters are applied
   */
  @Event({ composed: true })
  klevuApplyFilters!: EventEmitter<void>

  @State() filters: Array<KlevuFilterResultOptions | KlevuFilterResultSlider | KlevuFilterResultRating> = []

  #applyManager = new FilterManager()

  connectedCallback() {
    if (!this.manager) {
      return
    }

    this.#applyManager = new FilterManager()
    this.#applyManager.setState(this.manager.getCurrentState())
    if (this.useApplyButton) {
      this.filters = this.#applyManager.filters
    } else {
      this.filters = this.manager.filters
    }
  }

  @Listen("klevu-filters-applied", { target: "document" })
  filtersApplied() {
    this.#applyManager.setState(this.manager.getCurrentState())
    if (!this.useApplyButton) {
      this.filters = this.manager.filters
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
    if (!this.useApplyButton) {
      this.filters = this.manager.filters
      this.klevuApplyFilters.emit()
    }
  }

  #applySettings() {
    this.manager.setState(this.#applyManager.getCurrentState())
    this.klevuApplyFilters.emit()
  }

  #clear() {
    this.#applyManager.clearOptionSelections()
    this.filters = this.#applyManager.filters
  }

  render() {
    return (
      <Host>
        {this.filters.map((f, index) => {
          if (FilterManager.isKlevuFilterResultOptions(f) || FilterManager.isKlevuFilterResultRating(f)) {
            let mode
            if (this.mode && typeof this.mode === "string") {
              mode = this.mode
            } else if (this.mode && typeof this.mode === "object") {
              mode = this.mode[f.key]
            }

            return (
              <klevu-facet
                accordion={this.accordion}
                accordionStartOpen={index === 0}
                customOrder={this.customOrder?.[f.key]}
                manager={this.useApplyButton ? this.#applyManager : this.manager}
                option={f}
                mode={mode}
              ></klevu-facet>
            )
          } else if (FilterManager.isKlevuFilterResultSlider(f)) {
            return (
              <klevu-facet
                accordion={this.accordion}
                manager={this.useApplyButton ? this.#applyManager : this.manager}
                slider={f}
                labelOverride={f.label === "klevu_price" ? this.defaultPriceLabel : undefined}
              ></klevu-facet>
            )
          }
        })}
        {this.useApplyButton ? (
          <div class="applybar">
            <klevu-button isSecondary onClick={() => this.#clear()}>
              {this.clearButtonText}
            </klevu-button>
            <klevu-button fullWidth class="apply" onClick={() => this.#applySettings()}>
              {this.applyButtonText}
            </klevu-button>
          </div>
        ) : null}
      </Host>
    )
  }
}
