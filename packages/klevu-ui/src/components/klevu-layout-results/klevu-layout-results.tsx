import { Component, Host, h, State, Method } from "@stencil/core"
import { KlevuUtilViewportCustomEvent } from "../../components"
import { ViewportSize } from "../klevu-util-viewport/klevu-util-viewport"

/**
 * Generic layout used in merchansiding and search landing page
 *
 * @slot sidebar - Sidebar
 * @slot header - Header area above the content
 * @slot content - Main content
 * @slot footer - Footer are below the content
 */
@Component({
  tag: "klevu-layout-results",
  styleUrl: "klevu-layout-results.css",
  shadow: true,
})
export class KlevuLayoutResults {
  @State() currentViewPortSize?: ViewportSize
  drawerElement!: HTMLKlevuDrawerElement
  viewportUtil!: HTMLKlevuUtilViewportElement

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.viewportUtil.getCurrentSize()
  }

  @Method()
  async closeDrawer() {
    this.drawerElement.closeModal()
  }

  render() {
    const isMobile = this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"

    return (
      <Host>
        <klevu-util-viewport
          onSizeChanged={this.#sizeChange.bind(this)}
          ref={(el) => (this.viewportUtil = el as HTMLKlevuUtilViewportElement)}
        ></klevu-util-viewport>
        <div class="container">
          {isMobile ? (
            <klevu-drawer ref={(el) => (this.drawerElement = el as HTMLKlevuDrawerElement)}>
              <slot slot="content" name="sidebar"></slot>
            </klevu-drawer>
          ) : (
            <aside class="sidebar">
              <slot name="sidebar"></slot>
            </aside>
          )}

          <section>
            <div class="header">
              <slot name="header"></slot>
              {isMobile ? (
                <klevu-button
                  onClick={async (event) => {
                    await this.drawerElement.openModal()
                    event.stopPropagation()
                    return false
                  }}
                >
                  Open&nbsp;menu
                </klevu-button>
              ) : null}
            </div>
            <div class="content">
              <slot name="content"></slot>
            </div>
            <div class="footer">
              <slot name="footer"></slot>
            </div>
          </section>
        </div>
      </Host>
    )
  }
}
