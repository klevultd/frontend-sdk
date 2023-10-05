import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuTypography } from "./klevu-typography"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-typography")

const meta: Meta = {
  title: "Atoms/Typography",
  component: "klevu-typography",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Typography: StoryObj<KlevuTypography & { text?: string }> = {
  args: {
    text: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    text: {
      description: "Text to be displayed next to typography",
      control: {
        type: "text",
      },
    },
  },
  render: (args) => html`<style></style>
    <klevu-typography variant=${args.variant} full-width=${ifDefined(args.fullWidth)}
      >Configured: ${args.text}</klevu-typography
    >`,
}

const Typography_old: StoryObj<KlevuTypography & { text?: string }> = {
  args: {
    text: "The quick brown fox jumps over the lazy dog",
  },
  argTypes: {
    text: {
      description: "Text to be displayed next to typography",
      control: {
        type: "text",
      },
    },
  },
  render: (args) => html`<style>
      li {
        padding: 16px 0;
        list-style-type: none;
      }
    </style>
    <ul>
      <li>
        <klevu-typography variant=${args.variant} full-width=${ifDefined(args.fullWidth)}
          >Configured: ${args.text}</klevu-typography
        >
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
    </ul>`,
}
