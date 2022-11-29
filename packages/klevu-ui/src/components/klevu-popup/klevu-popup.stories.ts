//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"

export default autofillMeta("klevu-popup", {
  title: "Atoms/Popup",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuPopupElement> = (args) => html`<klevu-popup
  .anchor=${args.anchor}
  .closeAtOutsideClick=${args.closeAtOutsideClick}
  .fullwidthContent=${args.fullwidthContent}
  .openAtFocus=${args.openAtFocus}
  .startOpen=${args.startOpen}
>
  <klevu-search-field slot="origin"></klevu-search-field>
  <div slot="content">Hello world popup</div>
</klevu-popup>`

export const StartOpen = Template.bind({})
StartOpen.args = {
  startOpen: true,
  anchor: "left",
}

export const StartClosed = Template.bind({})
StartClosed.args = {
  startOpen: false,
  anchor: "left",
}
