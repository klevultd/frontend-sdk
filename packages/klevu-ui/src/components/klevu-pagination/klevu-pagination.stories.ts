import { MDXAutoFillMeta, fullMockRequest } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuPagination } from "./klevu-pagination"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-pagination")

const meta: Meta = {
  title: "Atoms/Pagination",
  component: "klevu-pagination",
  argTypes,
  parameters,
}

export default meta

export const Pagination: StoryObj<KlevuPagination> = {
  args: {
    min: 1,
    max: 6,
    current: 3,
  },

  render: (args) => html`<klevu-pagination
    current=${ifDefined(args.current)}
    max=${ifDefined(args.max)}
    min=${ifDefined(args.min)}
    .queryResult=${args.queryResult}
  ></klevu-pagination>`,
}

export const PaginationFromResults: StoryObj<KlevuPagination> = {
  ...Pagination,
  args: {
    queryResult: fullMockRequest.queryResults?.[0],
  },
}
