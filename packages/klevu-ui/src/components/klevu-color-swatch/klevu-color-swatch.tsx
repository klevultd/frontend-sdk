import { Component, Event, EventEmitter, Host, Prop, h } from "@stencil/core"

export type KlevuOnSwatchClick = {
  name: string
}

export type KlevuSwatch = {
  name: string
  selected: boolean
  imageUrl?: string
  color?: string
  borderColor?: string
}

/**
 * Color Swatch component
 *
 * @cssprop --klevu-color-swatch-border #8c8c8c Border on swatch
 * @cssprop --klevu-color-swatch-default-background #000 Shown when color not found in css
 * @cssprop --klevu-color-swatch-size 25px Size of swatch
 * @cssprop --klevu-color-swatch-selected-color #2b4af7 Ring color when selected
 * @cssprop --klevu-color-swatch-border-radius 50% To change the shape of swatch
 */
@Component({
  tag: "klevu-color-swatch",
  styleUrl: "klevu-color-swatch.css",
  shadow: true,
})
export class KlevuColorSwatch {
  /**
   * When swatch has been clicked
   */
  @Event({
    composed: true,
    cancelable: true,
  })
  klevuSwatchClick!: EventEmitter<KlevuOnSwatchClick>

  /**
   * This field will be sent in the click callback
   */
  @Prop() name!: string
  /**
   * Color to apply
   */
  @Prop() color?: string
  /**
   * If selected
   */
  @Prop() selected!: boolean
  /**
   * ImageUrl to load in swatch
   */
  @Prop() imageUrl?: string

  /**
   * Specify border color for the swatch
   */
  @Prop() borderColor?: string

  #swatchClick(name: string) {
    this.klevuSwatchClick.emit({ name })
  }
  render() {
    if (!this.name) {
      return null
    }
    return (
      <Host>
        <span
          class={`circle ${this.selected ? "selected" : ""}`}
          title={this.name}
          style={{
            border: this.borderColor ? `1px solid ${this.borderColor}` : "none",
            "background-color": this.imageUrl ? "" : this.color,
            "background-image": this.imageUrl ? `url(${this.imageUrl})` : "",
          }}
          onClick={() => this.#swatchClick(this.name)}
        ></span>
      </Host>
    )
  }
}
