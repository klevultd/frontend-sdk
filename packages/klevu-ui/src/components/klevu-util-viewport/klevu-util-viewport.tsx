import { Component, Event, EventEmitter, Method, Prop } from "@stencil/core"

export type ViewportSizeName = "xs" | "sm" | "md" | "lg" | "xl"
export type ViewportSize = { name: ViewportSizeName; minWidth: number; maxWidth: number }

@Component({
  tag: "klevu-util-viewport",
})
export class KlevuUtilViewport {
  @Event() sizeChanged!: EventEmitter<ViewportSize>

  /**
   * List of sizes to listen for
   */
  @Prop() sizes: ViewportSize[] = [
    { name: "xs", minWidth: 0, maxWidth: 319 },
    { name: "sm", minWidth: 320, maxWidth: 511 },
    { name: "md", minWidth: 512, maxWidth: 991 },
    { name: "lg", minWidth: 992, maxWidth: 1199 },
    { name: "xl", minWidth: 1200, maxWidth: 9999 },
  ]

  connectedCallback() {
    // Add listeners for all sizes provided
    for (const size of this.sizes) {
      window
        .matchMedia(`(min-width: ${size.minWidth}px) and (max-width: ${size.maxWidth}px)`)
        .addEventListener("change", this.#handleMatchMediaChange.bind(this))
    }
  }

  disconnectedCallback() {
    for (const size of this.sizes) {
      window
        .matchMedia(`(min-width: ${size.minWidth}px) and (max-width: ${size.maxWidth}px)`)
        .removeEventListener("change", this.#handleMatchMediaChange.bind(this))
    }
  }

  @Method()
  async getCurrentSize() {
    // Iterate over all given sizes and see which one matches
    for (const size of this.sizes) {
      if (window.matchMedia(`(min-width: ${size.minWidth}px)  and (max-width: ${size.maxWidth}px)`).matches) {
        return size
      }
    }
  }

  #handleMatchMediaChange(q: MediaQueryListEvent) {
    if (!q.matches) {
      return
    }
    // Find the name of the matching size and emit an event
    for (const size of this.sizes) {
      if (q.media.indexOf(`min-width: ${size.minWidth}px`) > -1) {
        this.sizeChanged.emit(size)
      }
    }
  }

  render() {
    return null
  }
}
