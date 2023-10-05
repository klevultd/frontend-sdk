import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"

/**
 * Chip component that is used to display selected value in a listing. Gives also ability to remove the chip.
 *
 * Has selected and removable attributes that can be used to display the chip in selected state and also to remove the chip.
 * @slot default - Chip content
 * @csspart chip-base The container for the chip
 * @csspart chip-icon The icon for the close button
 * @csspart chip-content The content for the chip
 */
@Component({
  tag: "klevu-chip",
  styleUrl: "klevu-chip.css",
  shadow: true,
})
export class KlevuChip {
  /**
   * Selected state of the chip
   */
  @Prop() selected: boolean = false

  /**
   * Removable state of the chip
   */
  @Prop() removable: boolean = false

  /**
   * Event that is fired when chip is removed
   */
  @Event({ composed: true }) klevuChipRemove!: EventEmitter<void>

  #close(event: Event) {
    if (this.removable) {
      const emittedEvent = this.klevuChipRemove.emit()
      if (emittedEvent.defaultPrevented) {
        event.stopPropagation()
        return false
      }
    }
  }

  render() {
    return (
      <Host class={{ removable: Boolean(this.removable), selected: Boolean(this.selected) }}>
        <div part="chip-base">
          {this.removable && <klevu-icon part="chip-icon" name="close" onClick={this.#close.bind(this)} />}
          <klevu-typography variant="body-xs" part="chip-content">
            <slot></slot>
          </klevu-typography>
        </div>
      </Host>
    )
  }
}
