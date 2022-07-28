import { KlevuConfig } from "@klevu/core"
import { Component, Host, h, Prop } from "@stencil/core"

@Component({
  tag: "klevu-init",
  shadow: true,
})
export class KlevuInit {
  @Prop() apiKey!: string
  @Prop() url!: string

  connectedCallback() {
    KlevuConfig.init({
      apiKey: this.apiKey,
      url: this.url,
    })
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
