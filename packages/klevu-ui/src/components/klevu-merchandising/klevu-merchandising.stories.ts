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
    useInfiniteScroll: false,
  },
  render: (args) => html`<klevu-merchandising
    category=${ifDefined(args.category)}
    category-title=${ifDefined(args.categoryTitle)}
    filter-count=${ifDefined(args.filterCount)}
    .filterCustomOrder=${args.filterCustomOrder}
    limit=${args.limit}
    sort=${ifDefined(args.sort)}
    use-pagination=${ifDefined(args.usePagination)}
    show-ratings=${ifDefined(args.showRatings)}
    show-ratings-count=${ifDefined(args.showRatingsCount)}
    use-infinite-scroll=${ifDefined(args.useInfiniteScroll)}
    use-personalisation=${ifDefined(args.usePersonalisation)}
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
      show-ratings=${ifDefined(args.showRatings)}
      show-ratings-count=${ifDefined(args.showRatingsCount)}
    >
      <div slot="content"></div>
    </klevu-merchandising>
    <script>
      const merch = document.querySelector("klevu-merchandising.customized")
      const contentSlot = document.querySelector("klevu-merchandising.customized div[slot='content']")
      const gridElement = document.createElement("klevu-grid")
      contentSlot.appendChild(gridElement)

      merch.addEventListener("klevuData", (event) => {
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

export const WithInfiniteScroll: StoryObj<KlevuMerchandising> = {
  args: {
    category: "women",
    categoryTitle: "Women's products",
    limit: 24,
    useInfiniteScroll: true,
  },
  render: Merchandising.render,
}

export const Stylished: StoryObj<KlevuMerchandising> = {
  args: {
    category: "women",
  },
  render: (args) => html`<klevu-merchandising class="stylished" .category=${args.category}></klevu-merchandising>
    <style id="stylished">
      klevu-merchandising.stylished::part(merchandising-sidebar) {
        border: 1px solid hotpink;
      }
      klevu-merchandising.stylished::part(merchandising-header) {
        border: 1px solid green;
        color: green;
        justify-content: center;
      }
      klevu-merchandising.stylished::part(merchandising-footer) {
        border: 1px solid black;
        color: black;
      }
      klevu-merchandising.stylished::part(merchandising-content) {
        border: 1px solid blue;
      }
      klevu-merchandising.stylished::part(product-price) {
        color: red;
        display: block;
        text-align: right;
      }
    </style>`,
}
