import { Component, h, Host, Prop } from "@stencil/core"

/**
 * Component that wrap two slots to create accordion element.
 *
 * @slot header - Element that has title that can be clicked
 * @slot content - Element containing content of the accordion
 * @slot icon - Icon element
 * @cssprop --klevu-accordion-icon-color --klevu-h3-color Color of the icon
 * @cssprop --klevu-accordion-background transparent Header background
 * @cssprop --klevu-accordion-content-height 600px Maxium height for content
 */
@Component({
  tag: "klevu-accordion",
  styleUrl: "klevu-accordion.css",
  shadow: true,
})
export class KlevuAccordion {
  /**
   * is accordion open
   */
  @Prop({ reflect: true }) open = false

  /**
   * Should it initially be open
   */
  @Prop() startOpen?: boolean

  #id: string

  constructor() {
    this.#id = `chk${Math.floor(Math.random() * 1000000)}`
  }

  connectedCallback() {
    if (this.startOpen) {
      this.open = true
    }
  }

  render() {
    return (
      <Host>
        <input type="checkbox" id={this.#id} checked={this.open} onChange={() => (this.open = !this.open)} />
        <label htmlFor={this.#id}>
          <klevu-typography variant="body-s-bold">
            <slot name="header"></slot>
          </klevu-typography>
          <klevu-icon name="expand_more"></klevu-icon>
        </label>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </Host>
    )
  }
}
