import { WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"
import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Atoms/Textfield",
  parameters: {
    notes,
    actions: {
      handles: ["klevuTextChanged", "klevuTextFocused"],
    },
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuTextfieldElement>({
  tag: "klevu-textfield",
  args: {},
})
