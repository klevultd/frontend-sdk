import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-heading", {
  title: "Atoms/Heading",
  parameters: { notes },
})

const Template: Story<HTMLKlevuHeadingElement & { text: string }> = (args) =>
  html`
    <style>
      li {
        padding: 16px 0;
        list-style-type: none;
      }
    </style>
    <ul>
      <li>
        <klevu-heading variant=${args.variant}>Configured: ${args.text}</klevu-heading>
      </li>
      <li><klevu-heading variant="h1">H1: ${args.text}</klevu-heading></li>
      <li><klevu-heading variant="h2">H2: ${args.text}</klevu-heading></li>
      <li><klevu-heading variant="h3">H3: ${args.text}</klevu-heading></li>
      <li><klevu-heading variant="h4">H4: ${args.text}</klevu-heading></li>
    </ul>
  `

export const Headings = Template.bind({})
Headings.args = {
  text: "The quick brown fox jumps over the lazy dog",
}
