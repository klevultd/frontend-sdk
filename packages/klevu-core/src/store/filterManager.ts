import {} from "../models/index.js"
import { KlevuDomEvents } from "../events/KlevuDomEvents.js"
import { ApplyFilter } from "../modifiers/applyFilter/applyFilter.js"
import {
  KlevuFilterType,
  KlevuFilterResultSlider,
  KlevuFilterResultOptions,
} from "../models/KlevuApiRawResponse.js"
import { isBrowser } from "../utils/isBrowser.js"

type FilterManagerState = {
  filters: FilterManagerFilters[]
}

type FilterManagerFilters = KlevuFilterResultOptions | KlevuFilterResultSlider

/**
 * Filter manager is used to store and handle filters (facets) in the results easily.
 * It can be easily used with applyFilterWithFilterManager() and listFilters() modifiers
 */
export class FilterManager {
  filters: FilterManagerFilters[] = []

  /**
   * Manager can be initialized with existing options and sliders
   *
   * @param initialValues initialize manager with values
   */
  constructor(initialValues?: {
    /** Given set of filters */
    filters?: FilterManagerFilters[]
    /** set of   */
    enabledOptions?: Array<[string, string]>
  }) {
    this.filters = initialValues?.filters ?? []
  }

  initFromListFilters(
    filters: Array<KlevuFilterResultOptions | KlevuFilterResultSlider>
  ) {
    this.filters = filters

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FiltersApplied, {
          detail: {
            filters: this.filters,
          },
        })
      )
    }
  }

  /**
   * clear current options and sliders
   */
  clear() {
    this.filters = []
  }

  /**
   * Gets current state of filters
   *
   * @returns current state
   */
  getCurrentState(): FilterManagerState {
    return {
      filters: this.filters,
    }
  }

  setState(state: FilterManagerState): void {
    this.filters = state.filters
  }

  /**
   * Function to select filters in filter manager
   *
   * Sends a Dom event on change
   *
   * @param key Key of option
   * @param name Name of value
   */
  toggleOption(key: string, name: string) {
    const option = this.getOptionByKey(key)

    if (!option) {
      return
    }

    const subOptionIndex = option.options.findIndex((o) => o.name === name)

    if (subOptionIndex === -1) {
      console.warn(`No filter ${key} option found with ${name}.`)
      return
    }

    const prevSeleted = option.options[subOptionIndex].selected

    option.options[subOptionIndex].selected = !prevSeleted

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key,
            name,
            selected: !prevSeleted,
          },
        })
      )
    }
  }

  /**
   * Select given option
   *
   * @param key key of filter to select
   * @param name name of option to select
   * @returns
   */
  selectOption(key: string, name: string) {
    const option = this.getOptionByKey(key)
    if (!option) {
      return
    }

    const subOptionIndex = option.options.findIndex((o) => o.name === name)

    if (subOptionIndex === -1) {
      console.warn(`No filter ${key} option found with ${name}.`)
      return
    }

    option.options[subOptionIndex].selected = true

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key,
            name,
            selected: true,
          },
        })
      )
    }
  }

  /**
   * Deselect given option
   *
   * @param key name of filter to deselect
   * @param name name of option to deselect
   * @returns
   */
  deselectOption(key: string, name: string) {
    const option = this.getOptionByKey(key)
    if (!option) {
      return
    }

    const subOptionIndex = option.options.findIndex((o) => o.name === name)

    if (subOptionIndex === -1) {
      console.warn(`No filter ${key} option found with ${name}.`)
      return
    }

    option.options[subOptionIndex].selected = false

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key,
            name,
            selected: false,
          },
        })
      )
    }
  }

  /**
   * Sets `selected` key of all options to false
   *
   * @param key Optional key to lmit clearing to one option
   * @returns
   */
  clearOptionSelections(key?: string) {
    if (key) {
      const option = this.filters.find((o) => o.key === key)
      if (option && this.isKlevuFilterResultOptions(option)) {
        option.options.forEach((o) => (o.selected = false))
      }
      return
    }

    this.filters.forEach((option) => {
      if (option && this.isKlevuFilterResultOptions(option)) {
        option.options.forEach((o2) => (o2.selected = false))
      }
    })

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate)
      )
    }
  }

  /**
   * Function to update slide in filter manager
   *
   * Sends a Dom event on change
   *
   * @param key Key of slide
   * @param min Min value of slide
   * @param max Max value of slide
   */
  updateSlide(key: string, min: number, max: number) {
    const slideIndex = this.filters.findIndex((s) => s.key === key)

    if (slideIndex === -1) {
      console.warn(`No slider found with ${key}.`)
      return
    }

    if (!this.isKlevuFilterResultSlider(this.filters[slideIndex])) {
      console.warn(`Filter ${key} is not a slider filter.`)
      return
    }

    const slider = this.filters[slideIndex] as KlevuFilterResultSlider

    slider.start = min.toString()
    slider.end = max.toString()

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key: key,
            name: slider.label,
            start: min.toString(),
            end: max.toString(),
          },
        })
      )
    }
  }

  /**
   * Populate filter manager with filters from Klevu API
   * @returns
   */
  toApplyFilters(): ApplyFilter[] {
    const filters: ApplyFilter[] = []
    for (const filter of this.filters) {
      if (this.isKlevuFilterResultOptions(filter)) {
        const selected = filter.options.filter(
          (subOption) => subOption.selected === true
        )
        if (selected.length === 0) {
          continue
        }
        filters.push({
          key: filter.key,
          values: selected.map((s) => s.value),
          settings: {
            singleSelect: false,
          },
        })
      } else if (this.isKlevuFilterResultSlider(filter)) {
        if (!filter.start || !filter.end) {
          continue
        }
        filters.push({
          key: filter.key,
          values: [filter.start, filter.end],
          settings: {
            singleSelect: false,
          },
        })
      }
    }

    return filters
  }

  /**
   * Get current selection by key
   *
   * @param key
   * @returns
   */
  currentSelection(key: string): string[] | undefined {
    const opt = this.filters.find((o) => o.key === key)
    if (opt && this.isKlevuFilterResultOptions(opt)) {
      const selectedOptions = opt.options.filter(
        (subOpt) => subOpt.selected === true
      )
      return selectedOptions.map((s) => s.value)
    }

    if (opt && this.isKlevuFilterResultSlider(opt) && opt.start && opt.end) {
      return [opt.start, opt.end]
    }

    return undefined
  }

  /**
   * Changes current selection of filters to a URL param string
   *
   * @returns string of URL params
   */
  toURLParams(): string {
    const params = new URLSearchParams()
    for (const filter of this.filters) {
      if (this.isKlevuFilterResultOptions(filter)) {
        const selected = filter.options.filter(
          (subOption) => subOption.selected === true
        )
        if (selected.length === 0) {
          continue
        }
        params.append(filter.key, selected.map((s) => s.value).join(","))
      } else if (this.isKlevuFilterResultSlider(filter)) {
        if (!filter.start || !filter.end) {
          continue
        }
        params.append(filter.key, `${filter.start}-${filter.end}`)
      }
    }

    return params.toString()
  }

  /**
   * Set current selection of filters from a URL param string
   *
   * @param params URLSearchParams to read from
   */
  readFromURLParams(params: URLSearchParams) {
    this.clearOptionSelections()
    for (const filter of this.filters) {
      if (this.isKlevuFilterResultOptions(filter)) {
        const selected = params.getAll(filter.key)
        if (selected.length === 0) {
          continue
        }
        filter.options.forEach((o) => {
          o.selected = selected.includes(o.value)
        })
      } else if (this.isKlevuFilterResultSlider(filter)) {
        const selected = params.get(filter.key)
        if (!selected) {
          continue
        }
        const [start, end] = selected.split("-")
        filter.start = start
        filter.end = end
      }
    }
  }

  private getOptionByKey(key: string): KlevuFilterResultOptions | undefined {
    const optionIndex = this.filters.findIndex((o) => o.key === key)

    if (optionIndex === -1) {
      console.warn(`No filter found with ${key}.`)
      return
    }

    if (!this.isKlevuFilterResultOptions(this.filters[optionIndex])) {
      console.warn(`Filter ${key} is not an option filter.`)
      return
    }

    return this.filters[optionIndex] as KlevuFilterResultOptions
  }

  private isKlevuFilterResultSlider(
    filter: KlevuFilterResultOptions | KlevuFilterResultSlider
  ): filter is KlevuFilterResultSlider {
    return filter.type === KlevuFilterType.Slider
  }

  private isKlevuFilterResultOptions(
    filter: KlevuFilterResultOptions | KlevuFilterResultSlider
  ): filter is KlevuFilterResultOptions {
    return filter.type === KlevuFilterType.Options
  }
}
