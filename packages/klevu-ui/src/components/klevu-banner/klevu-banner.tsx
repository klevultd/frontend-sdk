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
  @Prop() imageUrl?: string
  @Prop() linkUrl?: string
  @Prop() altText?: string
  @Prop() target: "_blank" | "_self" = "_blank"

  @Event({
    composed: true,
  })
  klevuBannerClick!: EventEmitter

  render() {
    return (
      <Host>
        <slot>
          <a href={this.linkUrl} target={this.target}>
            <img part="banner-image" src={this.imageUrl} alt={this.altText} />
          </a>
        </slot>
      </Host>
    )
  }
}
