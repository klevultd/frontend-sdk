import { Component, Host, h, Element } from "@stencil/core"

@Component({
  tag: "klevu-util-portal",
  styleUrl: "klevu-util-portal.css",
  shadow: true,
})
export class KlevuUtilPortal {
  @Element() el!: HTMLKlevuUtilPortalElement

  connectedCallback() {
    console.log("hello", this.el)
    // document.body.appendChild(this.el)
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
