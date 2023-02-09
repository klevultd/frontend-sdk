//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"

export default autofillMeta("klevu-drawer", {
  title: "Atoms/Drawer",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuDrawerElement> = (args) =>
  html`<klevu-drawer
    .anchor=${args.anchor}
    .background=${args.background}
    .closeAtOutsideClick=${args.closeAtOutsideClick}
    .startOpen=${args.startOpen}
    .insertYPadding=${args.insertYPadding}
  >
    <klevu-button slot="origin">Open drawer</klevu-button>
    <div slot="content">Hello world drawer</div>
  </klevu-drawer>`

export const StartClosed = Template.bind({})
StartClosed.args = {
  startOpen: false,
  anchor: "left",
}

export const StartOpen = Template.bind({})
StartOpen.args = {
  startOpen: true,
  anchor: "right",
}
