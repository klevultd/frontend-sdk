import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-button.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Atoms/Button",
  parameters: {
    notes,
  },
}

export const Default = WebComponentTemplate<HTMLKlevuButtonElement>({
  tag: "klevu-button",
  args: {},
  innerHTML: "Hello Button",
})
