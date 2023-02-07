import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

/**
 * Simple native dropdown component for dropdown
 *
 * @cssprop --klevu-dropdown-icon-clip-path polygon shape of the cut of icon
 * @cssprop --klevu-dropdown-icon-color --klevu-color-primary icon color
 */
@Component({
  tag: "klevu-dropdown",
  styleUrl: "klevu-dropdown.css",
  shadow: true,
})
export class KlevuDropdown {
  /**
   * Form name
   */
  @Prop() name!: string

  /**
   * Options to display in dropdown
   */
  @Prop() options!: Array<{ value: string; text: String }>
  /**
   * Is element disabled
   */
  @Prop() disabled?: boolean
  /**
   * Which element value is selected
   */
  @Prop() selected!: string

  /**
   * When dropdown item has been changed
   */
  @Event({
    composed: true,
  })
  klevuDropdownChanged!: EventEmitter<string>

  #onChange(event: any) {
    this.klevuDropdownChanged.emit(event.target.value)
  }

  render() {
    return (
      <Host>
        <div
          class={{
            select: true,
            disabled: Boolean(this.disabled),
          }}
        >
          <select name={this.name} disabled={this.disabled} onChange={this.#onChange.bind(this)}>
            {this.options?.map((o) => (
              <option selected={this.selected === o.value} value={o.value}>
                {o.text}
              </option>
            ))}
          </select>
          <div class="triangle"></div>
        </div>
      </Host>
    )
  }
}
