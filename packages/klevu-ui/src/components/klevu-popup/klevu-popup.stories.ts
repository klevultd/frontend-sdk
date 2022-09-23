import { html, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-popup.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Popup",
  parameters: {
    notes,
  },
}
export default meta

export const StartOpen = WebComponentTemplate<HTMLKlevuPopupElement>({
  tag: "klevu-popup",
  args: {
    startOpen: true,
    anchor: "left",
  },
  innerHTML: html`<klevu-search-field slot="origin"></klevu-search-field>
    <div slot="content">Hello world popup</div>`,
})

export const StartClosed = WebComponentTemplate<HTMLKlevuPopupElement>({
  tag: "klevu-popup",
  args: {
    startOpen: false,
    anchor: "left",
  },
  innerHTML: html`<klevu-search-field slot="origin"></klevu-search-field>
    <div slot="content">Hello world popup</div>`,
})
