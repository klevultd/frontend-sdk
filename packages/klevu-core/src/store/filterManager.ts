import { KlevuDomEvents } from "../events/KlevuDomEvents.js"
import { ApplyFilter } from "../modifiers/applyFilter/applyFilter.js"
import {
  KlevuFilterType,
  KlevuFilterResultSlider,
  KlevuFilterResultOptions,
  KlevuFilterResultRating,
} from "../models/KlevuApiRawResponse.js"
import { isBrowser } from "../utils/isBrowser.js"

type FilterManagerState = {
  filters: FilterManagerFilters[]
}

type FilterManagerFilters =
  | KlevuFilterResultOptions
  | KlevuFilterResultSlider
  | KlevuFilterResultRating

/**
 * Filter manager is used to store and handle filters (facets) in the results easily.
 * It can be easily used with applyFilterWithFilterManager() and listFilters() modifiers
 */
export class FilterManager {
  filters: FilterManagerFilters[] = []

  /**
   * @deprecated use filters instead. This doesn't take into account order of options and sliders
   */
  get options(): KlevuFilterResultOptions[] {
    return this.filters.filter(
      (filter): filter is KlevuFilterResultOptions =>
        filter.type === KlevuFilterType.Options
    )
  }

  /**
   * @deprecated use filters instead. This doesn't take into account order of options and sliders
   */
  get sliders(): KlevuFilterResultSlider[] {
    return this.filters.filter(
      (filter): filter is KlevuFilterResultSlider =>
        filter.type === KlevuFilterType.Slider
    )
  }

  /**
   * Manager can be initialized with existing options and sliders
   *
   * @param initialValues initialize manager with values
   */
  constructor(initialValues?: {
    /** Given set of filters */
    filters?: FilterManagerFilters[]
  }) {
    this.filters = initialValues?.filters ?? []
  }

  initFromListFilters(
    filters: Array<
      | KlevuFilterResultOptions
      | KlevuFilterResultSlider
      | KlevuFilterResultRating
    >
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
   * @param value value of option to toggle
   */
  toggleOption(key: string, value: string) {
    const suboption = this.getOptionByKeyCreateIfNotExists(key, value)
    const prevSeleted = suboption.selected
    suboption.selected = !suboption.selected

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key,
            name: value,
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
   * @param value value of option to select
   * @returns
   */
  selectOption(key: string, value: string) {
    const suboption = this.getOptionByKeyCreateIfNotExists(key, value)
    suboption.selected = true

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key,
            name: value,
            selected: true,
          },
        })
      )
    }
  }

  /**
   * Deselect given option
   *
   * @param key key of filter to deselect
   * @param value value of option to deselect
   * @returns
   */
  deselectOption(key: string, value: string) {
    const suboption = this.getOptionByKeyCreateIfNotExists(key, value)
    suboption.selected = false

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key,
            name: value,
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
      if (option && FilterManager.isKlevuFilterResultOptions(option)) {
        option.options.forEach((o) => (o.selected = false))
      }
      return
    }

    this.filters.forEach((option) => {
      if (option && FilterManager.isKlevuFilterResultOptions(option)) {
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
    let slider: KlevuFilterResultSlider

    if (slideIndex === -1) {
      slider = {
        key,
        end: max.toString(),
        start: min.toString(),
        min: min.toString(),
        max: max.toString(),
        label: key,
        type: KlevuFilterType.Slider,
      }
      this.filters.push(slider)
    } else if (
      !FilterManager.isKlevuFilterResultSlider(this.filters[slideIndex])
    ) {
      throw new Error(`Filter ${key} is not a slider filter.`)
    } else {
      slider = this.filters[slideIndex] as KlevuFilterResultSlider
      slider.start = min.toString()
      slider.end = max.toString()
    }

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
      if (
        FilterManager.isKlevuFilterResultOptions(filter) ||
        FilterManager.isKlevuFilterResultRating(filter)
      ) {
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
      } else if (FilterManager.isKlevuFilterResultSlider(filter)) {
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
    if (
      opt &&
      (FilterManager.isKlevuFilterResultOptions(opt) ||
        FilterManager.isKlevuFilterResultRating(opt))
    ) {
      const selectedOptions = opt.options.filter(
        (subOpt) => subOpt.selected === true
      )
      return selectedOptions.map((s) => s.value)
    }

    if (
      opt &&
      FilterManager.isKlevuFilterResultSlider(opt) &&
      opt.start &&
      opt.end
    ) {
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
      if (
        FilterManager.isKlevuFilterResultOptions(filter) ||
        FilterManager.isKlevuFilterResultRating(filter)
      ) {
        const selected = filter.options.filter(
          (subOption) => subOption.selected === true
        )
        if (selected.length === 0) {
          continue
        }
        params.append(`o_${filter.key}`, selected.map((s) => s.value).join(","))
      } else if (FilterManager.isKlevuFilterResultSlider(filter)) {
        if (!filter.start || !filter.end) {
          continue
        }
        params.append(`s_${filter.key}`, `${filter.start}-${filter.end}`)
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
    for (const [key, value] of params.entries()) {
      if (key.startsWith("o")) {
        const optionKey = key.substring(2)
        this.selectOption(optionKey, value)
      } else if (key.startsWith("s")) {
        const sliderKey = key.substring(2)
        this.updateSlide(
          sliderKey,
          parseFloat(value.split("-")[0]),
          parseFloat(value.split("-")[1])
        )
      }
    }
  }

  /**
   * Get option by key and sub option name. If doesn't exist, create it.
   *
   * @param key
   * @returns
   */
  private getOptionByKeyCreateIfNotExists(
    key: string,
    value: string
  ): KlevuFilterResultOptions["options"][0] {
    const optionIndex = this.filters.findIndex((o) => o.key === key)
    let option: KlevuFilterResultOptions
    if (optionIndex === -1) {
      option = {
        key,
        label: key,
        options: [],
        type: KlevuFilterType.Options,
      }
      this.filters.push(option)
    } else if (
      !FilterManager.isKlevuFilterResultOptions(this.filters[optionIndex]) &&
      !FilterManager.isKlevuFilterResultRating(this.filters[optionIndex])
    ) {
      throw new Error(`Filter ${key} is not an option filter.`)
    } else {
      option = this.filters[optionIndex] as KlevuFilterResultOptions
    }
    const subOptionIndex = option.options.findIndex((o) => o.value === value)

    if (subOptionIndex === -1) {
      option.options.push({
        count: 1,
        name: value,
        selected: false,
        value: value,
      })

      return option.options[option.options.length - 1]
    }

    return option.options[subOptionIndex]
  }

  /**
   * Is given variable a slider filter
   * @param filter
   * @returns
   */
  static isKlevuFilterResultSlider(
    filter:
      | KlevuFilterResultOptions
      | KlevuFilterResultSlider
      | KlevuFilterResultRating
  ): filter is KlevuFilterResultSlider {
    return filter.type === KlevuFilterType.Slider
  }

  /**
   * Is given variable an option filter
   * @param filter
   * @returns
   */
  static isKlevuFilterResultOptions(
    filter:
      | KlevuFilterResultOptions
      | KlevuFilterResultSlider
      | KlevuFilterResultRating
  ): filter is KlevuFilterResultOptions {
    return filter.type === KlevuFilterType.Options
  }

  /**
   * Is given variable an rating filter
   * @param filter
   * @returns
   */
  static isKlevuFilterResultRating(
    filter:
      | KlevuFilterResultOptions
      | KlevuFilterResultSlider
      | KlevuFilterResultRating
  ): filter is KlevuFilterResultRating {
    return filter.type === KlevuFilterType.Rating
  }
}
