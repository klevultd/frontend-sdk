import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "klevu-slides",
  styleUrl: "klevu-slides.css",
  shadow: true,
})
export class KlevuSlides {
  @Prop() height = "400px"

  render() {
    return (
      <Host style={{ height: this.height }}>
        <div class="slides">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
