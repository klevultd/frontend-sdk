import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

export type KlevuDropdownVariant = "default" | "inline"

/**
 * Simple native dropdown component for dropdown
 *
 * @csspart dropdown-base The container for the dropdown
 * @csspart dropdown-select The select box
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
  @Prop() options!: Array<{ value: string; text: string }>
  /**
   * Is element disabled
   */
  @Prop() disabled?: boolean
  /**
   * Which element value is selected
   */
  @Prop() selected!: string

  /**
   * Variant of dropdown
   */
  @Prop() variant: KlevuDropdownVariant = "default"

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
            selectcontainer: true,
            disabled: Boolean(this.disabled),
            inline: this.variant === "inline",
            default: this.variant === "default",
          }}
          part="dropdown-base"
        >
          <select name={this.name} disabled={this.disabled} onChange={this.#onChange.bind(this)} part="dropdown-select">
            {this.options?.map((o) => (
              <option selected={this.selected === o.value} value={o.value}>
                {o.text}
              </option>
            ))}
          </select>
          <klevu-icon name="expand_more" class="triangle" />
        </div>
      </Host>
    )
  }
}
