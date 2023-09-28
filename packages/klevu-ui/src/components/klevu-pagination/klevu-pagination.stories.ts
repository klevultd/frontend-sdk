import { MDXAutoFillMeta, fullMockRequest } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuPagination } from "./klevu-pagination"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-pagination")

const meta: Meta = {
  title: "Atoms/Pagination",
  component: "klevu-pagination",
  argTypes,
  parameters,
  decorators,
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

export const StyledPagination: StoryObj<KlevuPagination> = {
  args: {
    min: 1,
    max: 6,
    current: 3,
  },

  render: (args) => html` <klevu-pagination
      id="styledPagination"
      current=${ifDefined(args.current)}
      max=${ifDefined(args.max)}
      min=${ifDefined(args.min)}
      .queryResult=${args.queryResult}
    ></klevu-pagination>

    <style>
      #styledPagination::part(pagination-navigation-previous),
      #styledPagination::part(pagination-navigation-next) {
        color: green;
      }
      #styledPagination::part(pagination-page-number) {
        color: red;
      }
    </style>`,
}

export const PaginationFromResults: StoryObj<KlevuPagination> = {
  ...Pagination,
  args: {
    queryResult: fullMockRequest.queryResults?.[0],
  },
}
