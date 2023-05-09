import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuCmsList } from "./klevu-cms-list"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-cms-list")

const meta: Meta = {
  title: "Components/Cms List",
  component: "klevu-cms-list",
  argTypes,
  parameters,
}

export default meta

export const CmsList: StoryObj<KlevuCmsList> = {
  args: {
    link: true,
    pages: [
      {
        name: "Google",
        url: "https://www.google.com",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com",
      },
    ],
  },
  render: (args) => html`<klevu-cms-list
    link=${ifDefined(args.link)}
    .pages=${args.pages}
    caption=${ifDefined(args.caption)}
  ></klevu-cms-list>`,
}
