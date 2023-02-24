//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import { autofillMeta } from "../../storybookUtils"

export default autofillMeta("klevu-popup", {
  title: "Atoms/Popup",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuPopupElement> = (args) => html`<klevu-popup
  anchor=${ifDefined(args.anchor)}
  close-at-outside-click=${ifDefined(args.closeAtOutsideClick)}
  fullwidth-content=${ifDefined(args.fullwidthContent)}
  open-at-focus=${ifDefined(args.openAtFocus)}
  start-open=${ifDefined(args.startOpen)}
>
  <klevu-search-field slot="origin"></klevu-search-field>
  <div slot="content">Hello world popup</div>
</klevu-popup>`

export const StartOpen = Template.bind({})
StartOpen.args = {
  startOpen: true,
  anchor: "bottom-start",
}

export const StartClosed = Template.bind({})
StartClosed.args = {
  startOpen: false,
  anchor: "bottom-start",
}
