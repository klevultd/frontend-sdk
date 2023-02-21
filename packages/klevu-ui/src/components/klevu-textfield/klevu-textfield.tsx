import { Component, Event, EventEmitter, h, Prop } from "@stencil/core"

/**
 * Branded text field component
 */
@Component({
  tag: "klevu-textfield",
  styleUrl: "klevu-textfield.css",
  shadow: true,
})
export class KlevuTextfield {
  textInput!: HTMLInputElement

  /**
   * Current value of the field
   */
  @Prop({ mutable: true })
  value!: string

  /**
   * Is field disabled
   */
  @Prop({
    reflect: true,
  })
  disabled: boolean = false

  /**
   * Placeholder value of the field
   */
  @Prop({
    reflect: true,
  })
  placeholder?: string

  /**
   * Is field in error state
   */
  @Prop()
  error?: boolean

  /**
   * When text changes in field
   */
  @Event({
    composed: true,
  })
  klevuTextChanged!: EventEmitter<string>

  /**
   * When textfield is focused
   */
  @Event({
    composed: true,
  })
  klevuTextFocused!: EventEmitter<void>

  render() {
    return (
      <input
        type="text"
        ref={(el) => (this.textInput = el as HTMLInputElement)}
        value={this.value}
        disabled={this.disabled}
        placeholder={this.placeholder}
        class={{
          error: Boolean(this.error),
        }}
        onFocus={() => this.klevuTextFocused.emit()}
        onInput={(e) => {
          const el = e.target as HTMLInputElement
          this.value = el.value
          this.klevuTextChanged.emit(el.value)
        }}
      />
    )
  }
}
