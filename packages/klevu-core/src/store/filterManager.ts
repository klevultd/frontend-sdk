import {} from "../models/index.js"
import { KlevuDomEvents } from "../events/KlevuDomEvents.js"
import { ApplyFilter } from "../modifiers/applyFilter/applyFilter.js"
import {
  KlevuFilterType,
  KlevuFilterResultSlider,
  KlevuFilterResultOptions,
} from "../models/KlevuApiRawResponse.js"
import { isBrowser } from "../utils/isBrowser.js"

/**
 * Filter manager is used to store and handle filters (facets) in the results easily.
 * It can be easily used with applyFilterWithFilterManager() and listFilters() modifiers
 */
export class FilterManager {
  options: KlevuFilterResultOptions[] = []
  sliders: KlevuFilterResultSlider[] = []

  initFromListFilters(
    filters: Array<KlevuFilterResultOptions | KlevuFilterResultSlider>
  ) {
    this.options = []
    this.sliders = []
    for (const f of filters) {
      if (isKlevuFilterResultOptions(f)) {
        this.options.push(f)
      } else if (isKlevuFilterResultSlider(f)) {
        this.sliders.push(f)
      }
    }
    this.sort()

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FiltersApplied, {
          detail: {
            options: this.options,
            sliders: this.sliders,
          },
        })
      )
    }
  }

  private sort() {
    for (const o of this.options) {
      o.options.sort((a, b) => b.count - a.count)
    }
  }

  /**
   * clear current options and sliders
   */
  clear() {
    this.options = []
    this.sliders = []
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
    const optionIndex = this.options.findIndex((o) => o.key === key)

    if (optionIndex === -1) {
      console.warn(`No filter found with ${key}.`)
      return
    }

    const subOptionIndex = this.options[optionIndex].options.findIndex(
      (o) => o.name === name
    )

    if (subOptionIndex === -1) {
      console.warn(`No filter ${key} option found with ${name}.`)
      return
    }

    const prevSeleted =
      this.options[optionIndex].options[subOptionIndex].selected

    this.options[optionIndex].options[subOptionIndex].selected = !prevSeleted

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
   * Sets `selected` key of all options to false
   *
   * @param key Optional key to lmit clearing to one option
   * @returns
   */
  clearOptionSelections(key?: string) {
    if (key) {
      this.options
        .find((o) => o.key === key)
        ?.options.forEach((o) => (o.selected = false))
      return
    }

    this.options.forEach((o) =>
      o.options.forEach((o2) => (o2.selected = false))
    )
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
    const slideIndex = this.sliders.findIndex((s) => s.key === key)

    if (slideIndex === -1) {
      console.warn(`No slider found with ${key}.`)
      return
    }
    this.sliders[slideIndex].start = min.toString()
    this.sliders[slideIndex].end = max.toString()

    if (isBrowser()) {
      document.dispatchEvent(
        new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
          detail: {
            key: key,
            name: this.sliders[slideIndex].label,
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
    for (const o of this.options) {
      const selected = o.options.filter(
        (subOption) => subOption.selected === true
      )
      if (selected.length === 0) {
        continue
      }
      filters.push({
        key: o.key,
        values: selected.map((s) => s.value),
        settings: {
          singleSelect: false,
        },
      })
    }
    for (const s of this.sliders) {
      if (!s.start || !s.end) {
        continue
      }
      filters.push({
        key: s.key,
        values: [s.start, s.end],
        settings: {
          singleSelect: false,
        },
      })
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
    const opt = this.options.find((o) => o.key === key)
    if (opt) {
      const selectedOptions = opt.options.filter(
        (subOpt) => subOpt.selected === true
      )
      return selectedOptions.map((s) => s.value)
    }

    const slider = this.sliders.find((s) => s.key === key)
    if (slider && slider.start && slider.end) {
      return [slider.start, slider.end]
    }

    return undefined
  }
}

function isKlevuFilterResultSlider(
  filter: KlevuFilterResultOptions | KlevuFilterResultSlider
): filter is KlevuFilterResultSlider {
  return filter.type === KlevuFilterType.Slider
}

function isKlevuFilterResultOptions(
  filter: KlevuFilterResultOptions | KlevuFilterResultSlider
): filter is KlevuFilterResultOptions {
  return filter.type === KlevuFilterType.Options
}
