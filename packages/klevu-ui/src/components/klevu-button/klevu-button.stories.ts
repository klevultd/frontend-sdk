import { autofillMeta, WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

export default autofillMeta("klevu-button", {
  title: "Atoms/Button",
  parameters: {
    notes,
  },
})

export const Default = WebComponentTemplate<HTMLKlevuButtonElement>({
  tag: "klevu-button",
  args: {},
  innerHTML: "Hello Button",
})
