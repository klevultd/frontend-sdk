import { Component, Host, h, Prop, Fragment, Element, State, Listen } from "@stencil/core"

/**
 * Single list item for listing things.
 *
 * @slot primary - Primary text
 * @slot secondary - Secondary text
 * @csspart list-base The container for the list
 * @csspart list-icon The icon element of the list
 * @csspart list-image The image element of the list
 * @csspart list-content The content of the list
 * @csspart list-button The button element in the list
 */
@Component({
  tag: "klevu-list",
  styleUrl: "klevu-list.css",
  shadow: true,
})
export class KlevuList {
  @Element() el!: HTMLKlevuListElement

  /**
   * Icon to be displayed in the list item. Cannot be used with image.
   */
  @Prop() icon?: string
  /**
   * Image to be displayed in the list item. Cannot be used with icon.
   */
  @Prop() image?: string

  /**
   * Make the whole thing clickable and navigate to this url.
   */
  @Prop() url?: string

  /**
   * Condensed version of the list item.
   */
  @Prop() condensed = false

  @Prop() noXPadding = false

  @State() secondarySlotChildCount = 0

  componentDidLoad() {
    this.#checkSecondarySlotChildCount()
  }

  #checkSecondarySlotChildCount() {
    const slot = this.el.shadowRoot?.querySelector("slot[name='secondary']") as HTMLSlotElement | null
    this.secondarySlotChildCount = slot?.assignedElements().length ?? 0
  }

  @Listen("slotchange")
  handleSlotChange() {
    this.#checkSecondarySlotChildCount()
  }

  #getContent() {
    console.log(this.secondarySlotChildCount)
    return (
      <Fragment>
        {this.icon && <klevu-icon part="list-icon" class="icon" name={this.icon} />}
        {this.image && <img part="list-image" class="image" src={this.image} />}
        <div class="text" part="list-content">
          <slot name="primary"></slot>
          <slot name="secondary"></slot>
        </div>
        <span part="list-button">
          <slot name="button"></slot>
        </span>
      </Fragment>
    )
  }

  render() {
    return (
      <Host>
        <div part="list-base">
          {Boolean(this.url) ? (
            <a
              class={{
                condensed: this.condensed,
                noXPadding: this.noXPadding,
              }}
              href={this.url}
            >
              {this.#getContent()}
            </a>
          ) : (
            <div
              class={{
                container: true,
                condensed: this.condensed,
                noXPadding: this.noXPadding,
              }}
            >
              {this.#getContent()}
            </div>
          )}
        </div>
      </Host>
    )
  }
}
