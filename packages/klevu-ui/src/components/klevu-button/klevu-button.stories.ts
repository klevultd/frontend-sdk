import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-button.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Button",
  parameters: {
    notes,
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuButtonElement>({
  tag: "klevu-button",
  args: {},
  innerHTML: "Hello Button",
})
