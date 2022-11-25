import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "klevu-dropdown",
  styleUrl: "klevu-dropdown.css",
  shadow: true,
})
export class KlevuDropdown {
  @Prop() name!: string

  @Prop() options!: Array<{ value: string; text: String }>
  @Prop() disabled?: boolean
  @Prop() selected!: string

  @Event({
    composed: true,
  })
  klevuDropdownChanged!: EventEmitter<string>

  onChange(event: any) {
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
          <select name={this.name} disabled={this.disabled} onChange={this.onChange.bind(this)}>
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
