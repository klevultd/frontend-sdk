import { KlevuRecord } from "@klevu/core"
import { Component, Event, EventEmitter, Fragment, h, Host, Prop } from "@stencil/core"

/**
 * Component to display list of CMS page results
 */
@Component({
  tag: "klevu-cms-list",
  styleUrl: "klevu-cms-list.css",
  shadow: true,
})
export class KlevuCmsList {
  /**
   * List of Klevu results records with type of Page
   */
  @Prop() pages!: Array<Partial<KlevuRecord>>
  /**
   * Should use url parameter from link to create anchor
   */
  @Prop() link?: boolean
  /**
   * Caption of the listing
   */
  @Prop() caption = "CMS pages"

  @Event({
    composed: true,
  })
  klevuCmsPageClick!: EventEmitter<Partial<KlevuRecord>>

  render() {
    return (
      <Host>
        <klevu-typography class="caption" variant="h4">
          {this.caption}
        </klevu-typography>

        {this.pages?.map((page) => {
          if (this.link) {
            return (
              <klevu-list url={page.url} condensed noXPadding>
                <span slot="primary">{page.name}</span>
              </klevu-list>
            )
          }
          return (
            <klevu-list onClick={() => this.klevuCmsPageClick.emit(page)} condensed noXPadding>
              <span slot="primary">{page.name}</span>
            </klevu-list>
          )
        })}
      </Host>
    )
  }
}
