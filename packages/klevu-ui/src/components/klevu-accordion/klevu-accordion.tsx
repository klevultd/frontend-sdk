import { Component, h, Host, Prop } from "@stencil/core"

/**
 * Component that wrap two slots to create accordion element
 *
 * @slot header - Element that has title that can be clicked
 * @slot content - Element containing content of the accordion
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

  private id: string

  constructor() {
    this.id = `chk${Math.floor(Math.random() * 1000000)}`
  }

  connectedCallback() {
    if (this.startOpen) {
      this.open = true
    }
  }

  render() {
    return (
      <Host>
        <input type="checkbox" id={this.id} checked={this.open} onChange={() => (this.open = !this.open)} />
        <label htmlFor={this.id}>
          <slot name="header"></slot>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </label>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </Host>
    )
  }
}
