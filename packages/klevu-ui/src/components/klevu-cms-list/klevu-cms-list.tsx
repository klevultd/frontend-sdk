import { KlevuRecord } from "@klevu/core"
import { Component, Event, EventEmitter, Fragment, h, Host, Prop } from "@stencil/core"
import { getTranslation } from "../../utils/getTranslation"
import { partsExports } from "../../utils/partsExports"

/**
 * Component to display list of CMS page results
 * @csspart cms-list-caption The caption for the cms list
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
  @Prop() tCaption: string = getTranslation("cmsList.tCaption")

  @Event({
    composed: true,
  })
  klevuCmsPageClick!: EventEmitter<Partial<KlevuRecord>>

  render() {
    return (
      <Host>
        <klevu-typography class="caption" variant="h3" part="cms-list-caption">
          {this.tCaption}
        </klevu-typography>

        {this.pages?.map((page) => {
          if (this.link) {
            return (
              <klevu-list url={page.url} condensed noXPadding exportparts={partsExports("klevu-list")}>
                <span slot="primary">{page.name}</span>
              </klevu-list>
            )
          }
          return (
            <klevu-list
              onClick={() => this.klevuCmsPageClick.emit(page)}
              exportparts={partsExports("klevu-list")}
              condensed
              noXPadding
            >
              <span slot="primary">{page.name}</span>
            </klevu-list>
          )
        })}
      </Host>
    )
  }
}
