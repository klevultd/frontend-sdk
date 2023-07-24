import { Component, Host, h, Element } from "@stencil/core"

@Component({
  tag: "klevu-util-portal",
  styleUrl: "klevu-util-portal.css",
  shadow: true,
})
export class KlevuUtilPortal {
  @Element() el!: HTMLKlevuUtilPortalElement
  root?: HTMLDivElement

  connectedCallback() {
    this.createRoot()
  }

  createRoot() {
    if (this.root) {
      return
    }

    this.root = document.createElement("div")
    this.root.appendChild(this.el)
    this.root.setAttribute("data-name", "klevu-portal")
    document.body.appendChild(this.root)
  }

  disconnectedCallback() {
    if (!this.root) {
      return
    }

    this.root.remove()
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
