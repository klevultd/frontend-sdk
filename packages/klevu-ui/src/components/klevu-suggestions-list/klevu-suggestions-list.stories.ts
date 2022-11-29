import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-suggestions-list", {
  title: "Components/SuggestionsList",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuSuggestionsListElement> = (args) =>
  html`<klevu-suggestions-list .caption=${args.caption} .suggestions=${args.suggestions}></klevu-suggestions-list>`

export const Default = Template.bind({})
Default.args = {
  suggestions: ["<strong>shoe</strong>s", "leather <strong>shoe</strong>s"],
}
