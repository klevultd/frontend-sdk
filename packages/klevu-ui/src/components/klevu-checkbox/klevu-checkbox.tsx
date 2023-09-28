import { Component, h, Prop, Event, EventEmitter, Host, Element, State } from "@stencil/core"

// this component needs to implement new ElementInternals as soon as it's implemented
// https://github.com/ionic-team/stencil/issues/2284

/**
 * Checkbox component
 * @cssprop --klevu-checkbox-color --klevu-color-primary Color of the checkbox background and border
 * @cssprop --klevu-checkbox-size 20px Size of the checkbox
 * @csspart checkbox-base The container element of the checkbox
 * @csspart checkbox-box The checkbox element
 * @csspart checkbox-content The label of the checkbox
 */
@Component({
  tag: "klevu-checkbox",
  styleUrl: "klevu-checkbox.css",
  shadow: true,
})
export class KlevuCheckbox {
  @Element() host!: HTMLElement

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

  componentWillRender() {
    const slotContent = this.host.innerHTML.trim()
    this.renderContent = slotContent.length > 0
  }

  @State()
  renderContent = true

  render() {
    return (
      <Host>
        <div class="check" part="checkbox-base">
          <input
            part="checkbox-box"
            type="checkbox"
            checked={this.checked}
            disabled={this.disabled}
            name={this.name}
            id={this.name}
            onChange={this.#onChange.bind(this)}
          />
          <klevu-icon name="check" />
        </div>
        {this.renderContent && (
          <label class="content" htmlFor={this.name}>
            <klevu-typography variant="body-s" fullWidth part="checkbox-content">
              <slot />
            </klevu-typography>
          </label>
        )}
      </Host>
    )
  }
}
