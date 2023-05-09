import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuSuggestionsList } from "./klevu-suggestions-list"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-suggestions-list")

const meta: Meta = {
  title: "Components/SuggestionsList",
  component: "klevu-suggestions-list",
  argTypes,
  parameters,
}

export default meta

export const SuggestionsList: StoryObj<KlevuSuggestionsList> = {
  args: {
    suggestions: ["<strong>shoe</strong>s", "leather <strong>shoe</strong>s"],
  },
  render: (args) =>
    html`<klevu-suggestions-list
      caption=${ifDefined(args.caption)}
      .suggestions=${args.suggestions}
    ></klevu-suggestions-list>`,
}
