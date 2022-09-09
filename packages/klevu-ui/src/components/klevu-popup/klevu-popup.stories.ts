import { html, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-popup.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Atoms/Popup",
  parameters: {
    notes,
  },
}

export const StartOpen = WebComponentTemplate<HTMLKlevuPopupElement>({
  tag: "klevu-popup",
  args: {
    open: true,
    anchor: "left",
  },
  innerHTML: html`<klevu-search-field slot="origin"></klevu-search-field>
    <div slot="content">Hello world popup</div>`,
})

export const StartClosed = WebComponentTemplate<HTMLKlevuPopupElement>({
  tag: "klevu-popup",
  args: {
    open: false,
    achor: "left",
  },
  innerHTML: html`<klevu-search-field slot="origin"></klevu-search-field>
    <div slot="content">Hello world popup</div>`,
})
