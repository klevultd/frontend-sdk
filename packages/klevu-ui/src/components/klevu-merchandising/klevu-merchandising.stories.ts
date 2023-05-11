import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuMerchandising } from "./klevu-merchandising"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-merchandising")

const meta: Meta = {
  title: "Apps/Merchandising",
  component: "klevu-merchandising",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Merchandising: StoryObj<KlevuMerchandising> = {
  args: {
    category: "women",
    categoryTitle: "Women's products",
    limit: 24,
  },
  render: (args) => html`<klevu-merchandising
    category=${ifDefined(args.category)}
    category-title=${ifDefined(args.categoryTitle)}
    filter-count=${ifDefined(args.filterCount)}
    .filterCustomOrder=${args.filterCustomOrder}
    limit=${args.limit}
    .renderProductSlot=${args.renderProductSlot}
    sort=${ifDefined(args.sort)}
    use-pagination=${ifDefined(args.usePagination)}
  ></klevu-merchandising>`,
}

export const WithPagination: StoryObj<KlevuMerchandising> = {
  ...Merchandising,
  args: {
    category: "men;shoes",
    categoryTitle: "Mens Shoes",
    usePagination: true,
    limit: 10,
  },
}
