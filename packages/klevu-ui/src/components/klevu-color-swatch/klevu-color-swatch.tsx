import { Component, Event, EventEmitter, Host, Prop, h } from "@stencil/core"

export type KlevuOnSwatchClick = {
  name: string
}

export type KlevuSwatch = {
  name: string
  selected: boolean
  imageUrl?: string
  color?: string
}

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

  #swatchClick(name: string) {
    this.klevuSwatchClick.emit({ name })
  }
  render() {
    if (!this.name) {
      return ""
    }
    return (
      <Host>
        <span
          class="circle"
          title={this.name}
          style={{
            "box-shadow": `0px 0px 0px 2px ${this.selected ? "#2B4AF7" : "transparent"}`,
            "background-color": this.imageUrl ? "" : this.color,
            "background-image": this.imageUrl ? `url(${this.imageUrl})` : "",
          }}
          onClick={() => this.#swatchClick(this.name)}
        ></span>
      </Host>
    )
  }
}
