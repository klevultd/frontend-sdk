import { html, WebComponentTemplate } from "../../storybookUtils"
import "./klevu-accordion.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Accordion",
  parameters: {
    notes,
  },
}
export default meta

export const StartOpen = WebComponentTemplate<HTMLKlevuAccordionElement>({
  tag: "klevu-accordion",
  args: {
    startOpen: true,
  },
  innerHTML: html`<klevu-heading slot="header" variant="h2">Heading</klevu-heading>
    <div slot="content">Hello world accordion</div>`,
})
