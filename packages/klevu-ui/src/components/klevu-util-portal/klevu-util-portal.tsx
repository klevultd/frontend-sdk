import { Component, Host, h, Element } from "@stencil/core"

/**
 * Portal component to move content to end of body instead of normal DOM position. Typically used for popups
 * to prevent problems with CSS stylings.
 *
 * Does not move styles, so create a child component that has styles defined in shadow DOM.
 */
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
    const assignedContent: Element[] = []

    this.el.querySelectorAll("slot").forEach((slot) => {
      assignedContent.push(...slot.assignedElements())
    })
    this.root.appendChild(this.el)

    for (const element of assignedContent) {
      this.el.childNodes[0].appendChild(element)
    }

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
