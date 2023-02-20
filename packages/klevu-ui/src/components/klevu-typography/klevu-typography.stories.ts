import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-typography", {
  title: "Atoms/Typography",
  parameters: { notes },
})

const Template: Story<HTMLKlevuTypographyElement & { text: string }> = (args) =>
  html`
    <style>
      li {
        padding: 16px 0;
        list-style-type: none;
      }
    </style>
    <ul>
      <li>
        <klevu-typography variant=${args.variant}>Configured: ${args.text}</klevu-typography>
      </li>
      <li><klevu-typography variant="h1">H1: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="h2">H2: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="h3">H3: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="h4">H4: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-l">Body-L: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-m">Body-M: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-s">Body-S: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-xs">Body-XS: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-l-bold">Body-L-bold: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-m-bold">Body-M-bold: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-s-bold">Body-S-bold: ${args.text}</klevu-typography></li>
      <li><klevu-typography variant="body-xs-bold">Body-XS-bold: ${args.text}</klevu-typography></li>
    </ul>
  `

export const Typography = Template.bind({})
Typography.args = {
  text: "The quick brown fox jumps over the lazy dog",
}
