import { Component, Host, h, Prop } from "@stencil/core"

/**
 * Single list item for listing things. Can include icons, or images and
 */
@Component({
  tag: "klevu-list",
  styleUrl: "klevu-list.css",
  shadow: true,
})
export class KlevuList {
  /**
   * Icon to be displayed in the list item. Cannot be used with image.
   */
  @Prop() icon?: string
  /**
   * Image to be displayed in the list item. Cannot be used with icon.
   */
  @Prop() image?: string

  render() {
    return (
      <Host>
        {this.icon && (
          <span class="icon" part="material-icon">
            {this.icon}
          </span>
        )}
        {this.image && <img class="image" src={this.image} />}
        <div class="text">
          <klevu-typography variant="body-s">
            <slot name="primary"></slot>
          </klevu-typography>
          <klevu-typography
            variant="body-s"
            style={{
              "--klevu-typography-color": "var(--klevu-color-neutral-7)",
            }}
          >
            <slot name="secondary"></slot>
          </klevu-typography>
        </div>
        <slot name="button"></slot>
      </Host>
    )
  }
}
