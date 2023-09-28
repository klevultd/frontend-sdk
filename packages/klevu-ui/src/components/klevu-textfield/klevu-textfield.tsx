import { Component, Event, EventEmitter, h, Prop } from "@stencil/core"

export type KlevuTextfieldVariant = "default" | "pill"

/**
 * Branded text field component
 * @csspart textfield-base The container for input box
 * @csspart textfield-icon The icon at beginning of input
 * @csspart textfield-input The input box
 * @csspart textfield-clearbutton The clear button at the end of input
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

  /**
   * When enter is pressed in textfield
   */
  @Event({
    composed: true,
  })
  klevuTextEnterPressed!: EventEmitter<void>

  render() {
    return (
      <div part="textfield-base">
        <input
          part="textfield-input"
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              this.klevuTextEnterPressed.emit()
            }
          }}
          onInput={(e) => {
            const el = e.target as HTMLInputElement
            this.value = el.value
            this.klevuTextChanged.emit(el.value)
          }}
        />
        {this.icon && <klevu-icon part="textfield-icon" class="icon" name={this.icon} />}
        <slot name="end"></slot>
        {this.clearButton && this.value?.length > 0 && (
          <klevu-icon
            part="textfield-clearbutton"
            name="clear"
            class="clear"
            onClick={() => {
              this.value = ""
              this.klevuTextChanged.emit("")
            }}
          />
        )}
      </div>
    )
  }
}
