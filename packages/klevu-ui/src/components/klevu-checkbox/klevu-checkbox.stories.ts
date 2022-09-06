import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-checkbox.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Atoms/Checkbox",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuCheckboxElement>({
  tag: "klevu-checkbox",
  attributes: {
    checked: true,
  },
})
