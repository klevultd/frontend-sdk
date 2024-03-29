import { Component, Host, h, State, Method, Event, EventEmitter } from "@stencil/core"
import { KlevuUtilViewportCustomEvent } from "../../components"
import { ViewportSize } from "../klevu-util-viewport/klevu-util-viewport"
import { partsExports } from "../../utils/partsExports"

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
  drawerElement?: HTMLKlevuDrawerElement
  viewportUtil!: HTMLKlevuUtilViewportElement

  #sizeChange(event: KlevuUtilViewportCustomEvent<ViewportSize>) {
    this.currentViewPortSize = event.detail
  }

  async componentDidLoad() {
    this.currentViewPortSize = await this.viewportUtil.getCurrentSize()
  }

  /**
   * Can be used to close the drawer programmatically
   */
  @Method()
  async closeDrawer() {
    this.drawerElement?.closeModal()
  }

  @Event({ composed: true })
  klevuDrawerOpened!: EventEmitter<void>

  render() {
    const isMobile = this.currentViewPortSize?.name === "xs" || this.currentViewPortSize?.name === "sm"

    return (
      <Host>
        <klevu-util-viewport
          onKlevuSizeChanged={this.#sizeChange.bind(this)}
          ref={(el) => (this.viewportUtil = el as HTMLKlevuUtilViewportElement)}
        ></klevu-util-viewport>
        <header class="header">
          <slot name="header"></slot>
          {isMobile ? (
            <klevu-button
              exportparts={partsExports("klevu-button")}
              icon="menu"
              onClick={async (event) => {
                await this.drawerElement?.openModal()
                this.klevuDrawerOpened.emit()
                event.stopPropagation()
                return false
              }}
            ></klevu-button>
          ) : null}
        </header>
        <div class="container">
          {isMobile ? (
            <klevu-drawer
              exportparts={partsExports("klevu-drawer")}
              ref={(el) => (this.drawerElement = el as HTMLKlevuDrawerElement)}
              insertYPadding
              background
            >
              <slot slot="content" name="sidebar"></slot>
            </klevu-drawer>
          ) : (
            <aside class="sidebar">
              <slot name="sidebar"></slot>
            </aside>
          )}
          <main>
            <section class="content">
              <slot name="content"></slot>
            </section>
            <footer class="footer">
              <slot name="footer"></slot>
            </footer>
          </main>
        </div>
      </Host>
    )
  }
}
