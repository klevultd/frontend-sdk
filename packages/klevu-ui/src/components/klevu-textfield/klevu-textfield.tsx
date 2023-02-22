import { Component, Event, EventEmitter, h, Prop } from "@stencil/core"

export type KlevuTextfieldVariant = "default" | "pill"

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
   * Variant of textfield
   */
  @Prop()
  variant: KlevuTextfieldVariant = "default"

  /**
   * Icon to display in textfield start of the field. Please use tokens of material icons
   */
  @Prop()
  icon?: string

  /**
   * Display a button to clear field value on the right side of the field
   */
  @Prop()
  clearButton?: boolean

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
      <div>
        <input
          type="text"
          ref={(el) => (this.textInput = el as HTMLInputElement)}
          value={this.value}
          disabled={this.disabled}
          placeholder={this.placeholder}
          class={{
            error: Boolean(this.error),
            pill: this.variant === "pill",
            default: this.variant === "default",
            hasicon: Boolean(this.icon),
            hasclear: Boolean(this.clearButton),
          }}
          onFocus={() => this.klevuTextFocused.emit()}
          onInput={(e) => {
            const el = e.target as HTMLInputElement
            this.value = el.value
            this.klevuTextChanged.emit(el.value)
          }}
        />
        {this.icon && (
          <span class="icon" part="material-icon">
            {this.icon}
          </span>
        )}
        {this.clearButton && this.value?.length > 0 && (
          <span
            class="clear"
            part="material-icon"
            onClick={() => {
              this.value = ""
              this.klevuTextChanged.emit("")
            }}
          >
            clear
          </span>
        )}
      </div>
    )
  }
}
