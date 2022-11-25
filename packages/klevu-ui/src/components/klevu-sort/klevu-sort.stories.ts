import { html, WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/Sort",
  parameters: {
    notes,
    action: {
      handles: ["klevuSortChanged"],
    },
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuSortElement>({
  tag: "klevu-sort",
})
