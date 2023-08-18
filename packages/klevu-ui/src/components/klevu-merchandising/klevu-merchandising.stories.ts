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

export const CustomizedMerchandising: StoryObj<KlevuMerchandising> = {
  args: {
    category: "women",
    categoryTitle: "Women's products",
    limit: 12,
  },
  render: (args) => html`
    <klevu-merchandising
      class="customized"
      category=${ifDefined(args.category)}
      category-title=${ifDefined(args.categoryTitle)}
      limit=${args.limit}
    >
      <div slot="content"></div>
    </klevu-merchandising>
    <script>
      const merch = document.querySelector("klevu-merchandising.customized")
      const contentSlot = document.querySelector("klevu-merchandising.customized div[slot='content']")
      const gridElement = document.createElement("klevu-grid")
      contentSlot.appendChild(gridElement)

      merch.addEventListener("data", (event) => {
        gridElement.innerHTML = ""
        for (const record of event.detail.records) {
          const p = document.createElement("klevu-product")
          p.product = record
          p.isWrapper = true
          p.innerHTML = '<img src="' + record.imageUrl + '" />'

          gridElement.appendChild(p)
        }
      })
    </script>
    <style>
      klevu-merchandising.customized img {
        width: 120px;
      }
    </style>
  `,
}
