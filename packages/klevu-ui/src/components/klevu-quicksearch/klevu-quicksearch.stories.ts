import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuQuicksearch } from "./klevu-quicksearch"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-quicksearch")

const meta: Meta = {
  title: "Apps/Quicksearch",
  component: "klevu-quicksearch",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Quicksearch: StoryObj<KlevuQuicksearch> = {
  args: {
    popupAnchor: "bottom-start",
    fallbackTerm: "shoes",
    searchCategories: true,
    searchCmsPages: true,
  },
  render: (args) => html`<klevu-quicksearch
    fallback-term=${ifDefined(args.fallbackTerm)}
    popup-anchor=${ifDefined(args.popupAnchor)}
    search-categories=${ifDefined(args.searchCategories)}
    search-cms-cages=${ifDefined(args.searchCmsPages)}
    placeholder=${ifDefined(args.placeholder)}
    search-field-variant=${ifDefined(args.searchFieldVariant)}
    t-search-result=${ifDefined(args.tSearchResults)}
    t-start-chat=${ifDefined(args.tStartChat)}
    t-categories-caption=${ifDefined(args.tCategoriesCaption)}
    show-ratings=${ifDefined(args.showRatings)}
    show-ratings-count=${ifDefined(args.showRatingsCount)}
    show-popular-keywords=${ifDefined(args.showPopularKeywords)}
    show-trending-products=${ifDefined(args.showTrendingProducts)}
    show-recently-viewed-products=${ifDefined(args.showRecentlyViewedProducts)}
    t-last-clicked-products-caption=${ifDefined(args.tLastClickedProductsCaption)}
    t-trending-caption=${ifDefined(args.tTrendingCaption)}
    t-popular-products-title=${ifDefined(args.tPopularProductsTitle)}
    .customUrlRedirects=${args.customUrlRedirects}
  ></klevu-quicksearch>`,
}

export const CustomizedQuicksearch: StoryObj<KlevuQuicksearch> = {
  render: (args) => html`
    <klevu-quicksearch
      class="customized"
      show-ratings=${ifDefined(args.showRatings)}
      show-ratings-count=${ifDefined(args.showRatingsCount)}
      show-popular-keywords=${ifDefined(args.showPopularKeywords)}
      show-trending-products=${ifDefined(args.showTrendingProducts)}
      show-recently-viewed-products=${ifDefined(args.showRecentlyViewedProducts)}
      t-last-clicked-products-caption=${ifDefined(args.tLastClickedProductsCaption)}
      t-trending-caption=${ifDefined(args.tTrendingCaption)}
      t-popular-products-title=${ifDefined(args.tPopularProductsTitle)}
      .customUrlRedirects=${args.customUrlRedirects}
    >
      <div slot="search-products">This will be replaced by script below</div>
      <div slot="trending-products">This will be replaced by script below</div>
      <div slot="last-clicked-products">This will be replace by script below</div>
    </klevu-quicksearch>
    <script>
      const qs = document.querySelector("klevu-quicksearch.customized")
      const productsSlot = document.querySelector('div[slot="search-products"]')
      const lastClickedSlot = document.querySelector('div[slot="last-clicked-products"]')
      const trendingProductsSlot = document.querySelector('div[slot="trending-products"]')

      // when ever the data changes inside the quicksearch component we will receive it
      qs.addEventListener("klevuData", (event) => {
        // empty from previous content
        productsSlot.innerHTML = ""
        lastClickedSlot.innerHTML = ""
        trendingProductsSlot.innerHTML = ""

        if (event.detail.searchResult) {
          for (const record of event.detail.searchResult.records) {
            // we should put everything inside kleve-product to get analytics working
            const p = document.createElement("klevu-product")
            // set the product attribute to wrapper
            p.isWrapper = true
            // we need to provide what record we are rending
            p.product = record

            // this is the your cutom styling for the product
            p.innerHTML =
              "<div class='product'><strong>" + record.name + "</strong><p>" + record.designer + "</p></div>"

            // and then the default slot of klevu-product has everything you exacly want to display
            productsSlot.appendChild(p)
          }
        }
        // lets do the same for last clicked products
        if (event.detail.lastClickedProducts) {
          for (const record of event.detail.lastClickedProducts) {
            const p = document.createElement("klevu-product")
            p.isWrapper = true
            p.product = record

            p.innerHTML =
              "<div class='product'><strong>" + record.name + "</strong><p>" + record.designer + "</p></div>"
            lastClickedSlot.appendChild(p)
          }
        }
        // and trending products
        if (event.detail.trendingProducts) {
          for (const record of event.detail.trendingProducts) {
            const p = document.createElement("klevu-product")
            p.isWrapper = true
            p.product = record

            p.innerHTML =
              "<div class='product'><strong>" + record.name + "</strong><p>" + record.designer + "</p></div>"
            trendingProductsSlot.appendChild(p)
          }
        }
      })
    </script>
    <!-- your custom code can be modified with fully custom css -->
    <style>
      div.product {
        display: block;
        border: 1px solid grey;
        margin-bottom: 8px;
      }

      div.product strong {
        font-size: 1.2em;
      }
      div.product p {
        margin: 0;
      }

      klevu-product {
        display: block;
      }
    </style>
  `,
}
