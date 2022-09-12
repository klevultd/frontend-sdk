import { Component, Host, h, Prop } from "@stencil/core"

export type KlevuHeadingVariant = "h1" | "h2" | "h3"

@Component({
  tag: "klevu-heading",
  styleUrl: "klevu-heading.css",
  shadow: true,
})
export class KlevuHeading {
  @Prop() variant: KlevuHeadingVariant = "h2"

  render() {
    return (
      <span class={`heading-${this.variant}`}>
        <slot></slot>
      </span>
    )
  }
}
