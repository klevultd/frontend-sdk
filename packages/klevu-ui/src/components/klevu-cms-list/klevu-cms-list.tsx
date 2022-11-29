import { KlevuRecord } from "@klevu/core"
import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

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
        <klevu-heading variant="h2">{this.caption}</klevu-heading>
        <ul part="klevu-list">
          {this.pages?.map((page) => {
            if (this.link) {
              return (
                <li>
                  <a href={page.url}>{page.name}</a>
                </li>
              )
            }
            return <li onClick={() => this.klevuCmsPageClick.emit(page)}>{page.name}</li>
          })}
        </ul>
      </Host>
    )
  }
}
