import { Component, h, Prop, Event, EventEmitter } from "@stencil/core"

// this component needs to implement new ElementInternals as soon as it's implemented
// https://github.com/ionic-team/stencil/issues/2284

/**
 * Checkbox component
 * @cssprop --klevu-checkbox-color --klevu-color-primary Color of the checkbox mark
 * @cssprop --klevu-checkbox-shape polygon CSS clip-path shape to create the checkbox look.
 */
@Component({
  tag: "klevu-checkbox",
  styleUrl: "klevu-checkbox.css",
  shadow: true,
})
export class KlevuCheckbox {
  /**
   * Is checkbox checked
   */
  @Prop() checked?: boolean
  /**
   * Is disabled
   */
  @Prop() disabled?: boolean
  /**
   * Name of the checkbox
   */
  @Prop() name?: string

  #onChange() {
    this.checked = !this.checked
    this.klevuCheckboxChange.emit(this.checked)
  }

  @Event()
  klevuCheckboxChange!: EventEmitter<boolean>

  render() {
    return (
      <input
        type="checkbox"
        checked={this.checked}
        disabled={this.disabled}
        name={this.name}
        id={this.name}
        onChange={this.#onChange.bind(this)}
      />
    )
  }
}
