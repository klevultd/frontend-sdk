import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuQuery } from "./klevu-query"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-query")

const meta: Meta = {
  title: "Non components/Query",
  component: "klevu-query",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Query: StoryObj<KlevuQuery> = {
  args: {
    type: "search",
    searchTerm: "hoodies",
  },
  render: (args) => html`<klevu-query
      category=${ifDefined(args.category)}
      category-title=${ifDefined(args.categoryTitle)}
      limit=${ifDefined(args.limit)}
      .manager=${args.manager}
      offset=${ifDefined(args.offset)}
      .options=${args.options}
      recommendation-id=${ifDefined(args.recommendationId)}
      search-term=${ifDefined(args.searchTerm)}
      sort=${ifDefined(args.sort)}
      type=${ifDefined(args.type)}
      update-on-filter-change=${ifDefined(args.updateOnFilterChange)}
      search-suggestions=${ifDefined(args.searchSuggestions)}
      filter-get=${ifDefined(args.filterGet)}
      filter-count=${ifDefined(args.filterCount)}
      filter-with-prices=${ifDefined(args.filterWithPrices)}
      .recommendationCartProductIds=${args.recommendationCartProductIds}
      recommendation-current-product-id=${ifDefined(args.recommendationCurrentProductId)}
      recommendation-item-group-id=${ifDefined(args.recommendationItemGroupId)}
      recommendation-category-path=${ifDefined(args.recommendationCategoryPath)}
      .overrideModifiers=${args.overrideModifiers}
      disable-initial-fetch=${ifDefined(args.disableInitialFetch)}
      >Check ths console for more info on event payload.</klevu-query
    >
    <script>
      function addEventListener() {
        // Reference to query element
        const query = document.querySelector("klevu-query")
        query.addEventListener("klevuQueryResult", (e) => {
          console.log(event.detail.result)
          document.querySelector("klevu-query").innerHTML +=
            "<p>Number of results for query: " + event.detail.result.query.records.length + "</p>"
        })
      }
      addEventListener()
    </script>`,
}

export const CustomQuery: StoryObj<KlevuQuery> = {
  render: (args) => html`
    <klevu-query id="customquery" type="search" disable-initial-fetch></klevu-query>
    <klevu-textfield placeholder="Type something here!"></klevu-textfield>
    <div id="result"></div>
    <style>
      klevu-textfield {
        width: 100%;
        margin: 16px 0;
      }
    </style>
    <script>
      function addEventListenerForCustom() {
        // Reference to query element
        const query = document.querySelector("#customquery")
        // Reference to search field
        const field = document.querySelector("klevu-textfield")
        // Reference to result element
        const result = document.querySelector("#result")

        let searchCount = 0

        // When field value changes, update query element search term
        field.addEventListener("klevuTextChanged", (e) => {
          const searchTerm = e.detail

          // let's not search for less than 3 characters
          if (searchTerm.length < 3) {
            return
          }

          query.setAttribute("search-term", searchTerm)
        })

        query.addEventListener("klevuQueryResult", (e) => {
          searchCount++

          // clear result element
          result.innerHTML = ""

          const grid = document.createElement("klevu-product-grid")
          // loop through results
          e.detail.result.records.forEach((item) => {
            const p = document.createElement("klevu-product")
            p.product = item
            grid.appendChild(p)
          })

          // add search count
          const count = document.createElement("p")
          count.innerText = "Search count: " + searchCount
          result.appendChild(count)

          result.appendChild(document.createElement("hr"))
          result.appendChild(grid)
        })
      }
      addEventListenerForCustom()
    </script>
  `,
}
