import { action } from "@storybook/addon-actions"
import "./suggestions"
import { KlevuSuggestions } from "./suggestions"

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: "suggestions",
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    suggestions: { type: "array" },
  },
}

const Template: any = (args: any) => {
  const element = document.createElement(
    "klevu-suggestions"
  ) as KlevuSuggestions
  element.suggestions = ["suggestion 1", "suggestion 2", "suggestion 3"]
  return element
}

export const Default = Template.bind({})
