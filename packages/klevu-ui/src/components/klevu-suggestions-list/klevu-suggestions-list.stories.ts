import { WebComponentTemplate } from "../../storybookUtils"

// @ts-ignore
import notes from "./readme.md"

import { Meta } from "@storybook/html"

const meta: Meta = {
  title: "Components/SuggestionsList",
  parameters: {
    notes,
  },
}
export default meta

export const Default = WebComponentTemplate<HTMLKlevuSuggestionsListElement>({
  tag: "klevu-suggestions-list",
  args: {
    suggestions: ["<strong>shoe</strong>s", "leather <strong>shoe</strong>s"],
  },
})
