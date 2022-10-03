import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-dropdown.css"
// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Dropdown",
  parameters: {
    notes,
    actions: {
      handles: ["klevuDropdownChanged"],
    },
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuDropdownElement>({
  tag: "klevu-dropdown",
  args: {
    options: [
      {
        value: "1",
        text: "One",
      },
      {
        value: "2",
        text: "Two",
      },
      {
        value: "3",
        text: "Three",
      },
    ],
  },
})
