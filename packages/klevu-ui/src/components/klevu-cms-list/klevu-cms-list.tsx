import { KlevuRecord } from "@klevu/core"
import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core"

@Component({
  tag: "klevu-cms-list",
  styleUrl: "klevu-cms-list.css",
  shadow: true,
})
export class KlevuCmsList {
  @Prop() pages!: Array<Partial<KlevuRecord>>
  @Prop() link?: boolean
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
