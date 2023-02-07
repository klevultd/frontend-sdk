import { FilterManager, KlevuDomEvents, KlevuFilterResultOptions, KlevuFilterResultSlider } from "@klevu/core"
import { Component, EventEmitter, h, Host, Listen, Prop, State, Event, forceUpdate, Element } from "@stencil/core"
import { globalExportedParts } from "../../utils/utils"
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
   * When filters are applied
   */
  @Event({ composed: true })
  klevuApplyFilters!: EventEmitter<void>

  @State() options: KlevuFilterResultOptions[] = []
  @State() sliders: KlevuFilterResultSlider[] = []

  #applyManager = new FilterManager()

  connectedCallback() {
    if (!this.manager) {
      return
    }

    this.#applyManager = new FilterManager()
    this.#applyManager.setState(this.manager.getCurrentState())
    if (this.useApplyButton) {
      this.options = this.#applyManager.options
      this.sliders = this.#applyManager.sliders
    } else {
      this.options = this.manager.options
      this.sliders = this.manager.sliders
    }
  }

  @Listen("klevu-filters-applied", { target: "document" })
  filtersApplied() {
    this.#applyManager.setState(this.manager.getCurrentState())
    if (!this.useApplyButton) {
      this.options = this.manager.options
      this.sliders = this.manager.sliders
    }
  }

  @Listen("klevu-filter-selection-updates", { target: "document" })
  filterSelectionUpdate() {
    if (!this.useApplyButton) {
      this.options = this.manager.options
      this.sliders = this.manager.sliders
      this.klevuApplyFilters.emit()
    }
  }

  #applySettings() {
    this.manager.setState(this.#applyManager.getCurrentState())
    this.klevuApplyFilters.emit()
  }

  #clear() {
    this.#applyManager.clearOptionSelections()
    this.options = this.#applyManager.options
    this.sliders = this.#applyManager.sliders
  }

  render() {
    return (
      <Host>
        {this.options.map((o, index) => {
          let mode
          if (this.mode && typeof this.mode === "string") {
            mode = this.mode
          } else if (this.mode && typeof this.mode === "object") {
            mode = this.mode[o.key]
          }

          return (
            <klevu-facet
              accordion={this.accordion}
              accordionStartOpen={index === 0}
              customOrder={this.customOrder?.[o.key]}
              exportparts={globalExportedParts}
              manager={this.useApplyButton ? this.#applyManager : this.manager}
              option={o}
              mode={mode}
            ></klevu-facet>
          )
        })}
        {this.sliders.map((s) => (
          <klevu-facet
            accordion={this.accordion}
            exportparts={globalExportedParts}
            manager={this.useApplyButton ? this.#applyManager : this.manager}
            slider={s}
          ></klevu-facet>
        ))}
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
