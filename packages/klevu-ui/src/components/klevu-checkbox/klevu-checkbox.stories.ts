import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-checkbox.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Checkbox",
  parameters: { notes },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuCheckboxElement>({
  tag: "klevu-checkbox",
  attributes: {
    checked: true,
  },
})
