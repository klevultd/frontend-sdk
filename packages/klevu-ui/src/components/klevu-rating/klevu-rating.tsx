import { Component, Host, Prop, h } from "@stencil/core"

/**
 * Klevu ratings component
 *
 * @prop rating - The rating value as a number to show
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

  render() {
    return (
      <Host>
        {...[...Array(5)].map((_, i) => (
          <svg
            width="16"
            height="16"
            fill="currentColor"
            class={this.rating >= i + 1 ? "filled" : ""}
            viewBox="0 0 16 16"
          >
            <title>{`${this.rating}`}</title>
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        ))}
      </Host>
    )
  }
}
