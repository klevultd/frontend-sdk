import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from "@stencil/core"

/**
 * Component that triggers event when intercepted on scroll of page.
 */
@Component({
  tag: "klevu-util-infinite-scroll",
})
export class KlevuUtilInfiniteScroll {
  /**
   * Event emitted when infinite scroll element is intercepted
   */
  @Event({
    composed: true,
  })
  klevuLoadMore!: EventEmitter<void>
  /**
   * Event emitted when infinite loading reaches a multiple of infiniteScrollPauseThreshold
   */
  @Event({
    composed: true,
  })
  klevuInfiniteScrollingPaused!: EventEmitter<void>

  /**
   * The number of pages after which triggers infiniteScrollingPaused event.
   * Listen to this event to allow further loading on user input.
   */
  @Prop()
  infiniteScrollPauseThreshold: number = 3

  /**
   * Whether infinite scrolling is enabled
   */
  @Prop()
  enabled: boolean = false

  @Element() el!: HTMLElement

  #loadMoreCount: number = 1
  #observer: IntersectionObserver | null = null

  #loadMore = () => {
    if (this.infiniteScrollPauseThreshold === 0) {
      this.klevuLoadMore.emit()
      return
    }
    if (this.#loadMoreCount % this.infiniteScrollPauseThreshold === 0) {
      this.klevuInfiniteScrollingPaused.emit()
    } else {
      this.klevuLoadMore.emit()
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
    return (
      <Host>
        <div />
      </Host>
    )
  }
}
