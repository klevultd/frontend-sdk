import { Component, Host, h, Prop, Fragment, Element, State, Listen } from "@stencil/core"

/**
 * Single list item for listing things.
 *
 * @slot primary - Primary text
 * @slot secondary - Secondary text
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
    const slot = this.el.shadowRoot?.querySelector("slot[name='secondary']") as HTMLSlotElement
    this.secondarySlotChildCount = slot.assignedElements().length
  }

  @Listen("slotchange")
  handleSlotChange() {
    this.#checkSecondarySlotChildCount()
  }

  #getContent() {
    return (
      <Fragment>
        {this.icon && <klevu-icon class="icon" name={this.icon} />}
        {this.image && <img class="image" src={this.image} />}
        <div class="text">
          <klevu-typography variant="body-s">
            <slot name="primary"></slot>
          </klevu-typography>
          {this.secondarySlotChildCount > 0 && (
            <klevu-typography
              variant="body-s"
              style={{
                "--klevu-typography-color": "var(--klevu-color-neutral-7)",
              }}
            >
              <slot name="secondary"></slot>
            </klevu-typography>
          )}
        </div>
        <slot name="button"></slot>
      </Fragment>
    )
  }

  render() {
    return (
      <Host>
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
      </Host>
    )
  }
}
