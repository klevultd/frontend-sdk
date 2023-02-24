//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import { autofillMeta } from "../../storybookUtils"

export default autofillMeta("klevu-drawer", {
  title: "Atoms/Drawer",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuDrawerElement> = (args) =>
  html`<klevu-drawer
    anchor=${ifDefined(args.anchor)}
    background=${ifDefined(args.background)}
    close-at-outside-click=${ifDefined(args.closeAtOutsideClick)}
    start-open=${ifDefined(args.startOpen)}
    insert-y-padding=${ifDefined(args.insertYPadding)}
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
