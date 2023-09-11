import { Component, Event, EventEmitter, Host, Prop, h } from "@stencil/core"

/**
 * Component that displays a typical klevu banner
 */
@Component({
  tag: "klevu-banner",
  styleUrl: "klevu-banner.css",
  shadow: true,
})
export class KlevuBanner {
  /**
   * The image url to display
   */
  @Prop() imageUrl!: string

  /**
   * The link url to navigate to
   */
  @Prop() linkUrl!: string

  /**
   * The alt text to display for iamge
   */
  @Prop() altText!: string

  /**
   * The target to open the link in
   */
  @Prop() target: "_blank" | "_self" = "_blank"

  /**
   * Event emitted when the banner is clicked. Sends the link url as the event detail
   *
   * If defaultPrevented is called on the event, the link will not be followed
   */
  @Event({
    composed: true,
  })
  klevuBannerClick!: EventEmitter<string>

  #click(event: Event) {
    const sent = this.klevuBannerClick.emit(this.linkUrl)
    if (sent.defaultPrevented) {
      event.preventDefault()
      return false
    }
  }

  render() {
    return (
      <Host>
        <slot>
          <a href={this.linkUrl} target={this.target} onClick={this.#click}>
            <img part="banner-image" src={this.imageUrl} alt={this.altText} />
          </a>
        </slot>
      </Host>
    )
  }
}
