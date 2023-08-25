import { Component, Host, Prop, h } from "@stencil/core"

/**
 * Klevu ratings component
 *
 * @prop rating - The rating value as a number to show
 * @prop ratingRange - The number of stars to show
 */
@Component({
  tag: "klevu-rating",
  styleUrl: "klevu-rating.css",
  shadow: true,
})
export class KlevuRating {
  /**
   * Rating value
   */
  @Prop() rating: number = 0

  /**
   * Number of stars to show
   */
  @Prop() ratingRange: number = 5

  #getFillPercentage(ratingValue: number) {
    if (ratingValue < this.rating) return 0

    const roundOff = Math.floor(this.rating)
    if (roundOff <= ratingValue - 1) {
      const decimal = this.rating - roundOff
      return decimal * 100 - 100
    }
  }
  render() {
    return (
      <Host>
        {...[...Array(this.ratingRange)].map((_, i) => (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <title>{`${this.rating}`}</title>
            <symbol viewBox="0 0 126.729 126.73" id="star">
              <path d="M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z" />
            </symbol>
            <defs>
              <mask id="mstar">
                <use fill="white" xlinkHref="#star"></use>
              </mask>
            </defs>
            <rect
              x={`${this.#getFillPercentage(i + 1)}%`}
              y="0"
              class={Math.ceil(this.rating) >= i + 1 ? "filled" : ""}
              width="100%"
              height="100%"
              mask="url(#mstar)"
            />
            <use xlinkHref="#star" stroke-width="6" stroke="#333" fill="none"></use>
          </svg>
        ))}
      </Host>
    )
  }
}
