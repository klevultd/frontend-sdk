import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"

@Component({
  tag: "klevu-textfield",
  styleUrl: "klevu-textfield.css",
  shadow: true,
})
export class KlevuTextfield {
  textInput!: HTMLInputElement

  @Prop({ mutable: true })
  value: string
  @Prop({
    reflect: true,
  })
  disabled: boolean = false
  @Prop({
    reflect: true,
  })
  placeholder: string

  @Event({
    composed: true,
  })
  textChanged: EventEmitter<string>

  @Event({
    composed: true,
  })
  textFocused: EventEmitter<void>

  render() {
    return (
      <input
        type="text"
        ref={(el) => (this.textInput = el as HTMLInputElement)}
        value={this.value}
        disabled={this.disabled}
        placeholder={this.placeholder}
        onFocus={() => this.textFocused.emit()}
        onInput={(e) => {
          const el = e.target as HTMLInputElement
          this.value = el.value
          this.textChanged.emit(el.value)
        }}
      />
    )
  }
}
