import { WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Apps/SimpleSearch",
  parameters: {
    notes,
    actions: {
      handles: ["klevuSuggestionClick"],
    },
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuSimpleSearchElement>({
  tag: "klevu-simple-search",
})
