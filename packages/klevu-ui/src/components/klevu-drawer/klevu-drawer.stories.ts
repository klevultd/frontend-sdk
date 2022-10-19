import { html, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-drawer.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Drawer",
  parameters: {
    notes,
  },
}
export default meta

export const StartClosed = WebComponentTemplate<HTMLKlevuDrawerElement>({
  tag: "klevu-drawer",
  args: {
    startOpen: false,
    anchor: "left",
  },
  innerHTML: html`<klevu-button slot="origin">Open drawer</klevu-button>
    <div slot="content">Hello world drawer</div>`,
})

export const StartOpen = WebComponentTemplate<HTMLKlevuDrawerElement>({
  tag: "klevu-drawer",
  args: {
    startOpen: true,
    anchor: "right",
  },
  innerHTML: html`<klevu-button slot="origin">Open drawer</klevu-button>
    <div slot="content">Hello world drawer</div>`,
})
