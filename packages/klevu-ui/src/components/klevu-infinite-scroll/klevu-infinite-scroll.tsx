import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from "@stencil/core"

/**
 * Component that triggers event when intercepted on scroll of page.
 *
 * @prop infiniteScrollPauseThreshold - The number of pages after which triggers infiniteScrollingPaused event.
 *                                      Listen to this event to allow further loading on user input.
 * @prop enabled - Whether infinite scrolling is enabled
 * @event loadMore - Event emitted when infinite scroll element is intercepted
 * @event infiniteLoadingPaused - Event emitted when infinite loading reaches a multiple of infiniteScrollPauseThreshold
 */
@Component({
  tag: "klevu-infinite-scroll",
})
export class KlevuInfiniteScroll {
  @Event({
    composed: true,
  })
  loadMore!: EventEmitter<void>

  @Event({
    composed: true,
  })
  infiniteScrollingPaused!: EventEmitter<void>

  @Prop()
  infiniteScrollPauseThreshold: number = 3

  @Prop()
  enabled: boolean = false

  @Element() el!: HTMLElement

  #loadMoreCount: number = 1
  #observer: IntersectionObserver | null = null

  #loadMore = () => {
    if (this.infiniteScrollPauseThreshold === 0) {
      this.loadMore.emit()
      return
    }
    if (this.#loadMoreCount % this.infiniteScrollPauseThreshold === 0) {
      this.infiniteScrollingPaused.emit()
    } else {
      this.loadMore.emit()
    }
    this.#loadMoreCount++
  }

  @Watch("enabled")
  onEnableToggled() {
    if (this.enabled) {
      this.#attachIntersectionObserver()
    } else {
      this.#detachIntersectionObserver()
    }
  }

  #attachIntersectionObserver() {
    this.#detachIntersectionObserver()
    this.#observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.#loadMore()
      }
    })
    if (this.el && this.#observer) {
      this.#observer.observe(this.el)
    }
  }

  #detachIntersectionObserver() {
    if (this.el && this.#observer) {
      this.#observer.unobserve(this.el)
    }
  }

  disconnectedCallback() {
    this.#detachIntersectionObserver()
  }

  connectedCallback() {
    if (this.enabled) {
      // To avoid triggering load more immediately
      setTimeout(() => {
        this.#attachIntersectionObserver()
      }, 100)
    }
  }

  render() {
    return <Host>&nbsp;</Host>
  }
}
