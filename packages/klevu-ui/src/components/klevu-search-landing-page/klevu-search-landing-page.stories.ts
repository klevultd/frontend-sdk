import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuSearchLandingPage } from "./klevu-search-landing-page"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-search-landing-page")

const meta: Meta = {
  title: "Apps/Search Landing Page",
  component: "klevu-search-landing-page",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const SearchLandingPage: StoryObj<KlevuSearchLandingPage> = {
  args: {
    term: "jackets",
    useInfiniteScroll: false,
  },
  render: (args) => html`<klevu-search-landing-page
    filter-count=${ifDefined(args.filterCount)}
    .filterCustomOrder=${args.filterCustomOrder}
    limit=${ifDefined(args.limit)}
    sort=${ifDefined(args.sort)}
    term=${ifDefined(args.term)}
    use-pagination=${ifDefined(args.usePagination)}
    t-search-title=${ifDefined(args.tSearchTitle)}
    t-load-more=${ifDefined(args.loadMore)}
    show-ratings=${ifDefined(args.showRatings)}
    show-ratings-count=${ifDefined(args.showRatingsCount)}
    use-infinite-scroll=${ifDefined(args.useInfiniteScroll)}
    use-personalisation=${ifDefined(args.usePersonalisation)}
    use-klaviyo=${ifDefined(args.useKlaviyo)}
    popular-products-result-Count=${ifDefined(args.popularProductsResultCount)}
    show-search=${ifDefined(args.showSearch)}
    hide-filters=${ifDefined(args.hideFilters)}
    use-multi-select-filters=${ifDefined(args.useMultiSelectFilters)}
    show-price-as-slider=${ifDefined(args.showPriceAsSlider)}
    price-interval=${ifDefined(args.priceInterval)}
    hide-price=${ifDefined(args.hidePrice)}
    hide-brand=${ifDefined(args.hideBrand)}
    hide-description=${ifDefined(args.hideDescription)}
    hide-hover-image=${ifDefined(args.hideHoverImage)}
    hide-image=${ifDefined(args.hideImage)}
    hide-name=${ifDefined(args.hideName)}
    hide-swatches=${ifDefined(args.hideSwatches)}
    show-variants-count=${ifDefined(args.showVariantsCount)}
    out-of-stock-caption=${ifDefined(args.outOfStockCaption)}
    show-add-to-cart=${ifDefined(args.showAddToCart)}
    show-product-code=${ifDefined(args.showProductCode)}
    t-add-to-cart=${ifDefined(args.tAddToCart)}
    vat-caption=${ifDefined(args.vatCaption)}
    .options=${args.options}
    .sortOptions=${args.sortOptions}
    use-loading-indicator=${ifDefined(args.useLoadingIndicator)}
  ></klevu-search-landing-page>`,
}

export const WithInfiniteScroll: StoryObj<KlevuSearchLandingPage> = {
  args: {
    term: "red shoes",
    useInfiniteScroll: true,
  },
  render: SearchLandingPage.render,
}

export const Styled: StoryObj<KlevuSearchLandingPage> = {
  args: {
    term: "hoodies",
  },
  render: (args) => html`<klevu-search-landing-page class="stylished" .term=${args.term}></klevu-search-landing-page>
    <style id="stylished">
      klevu-search-landing-page.stylished::part(search-landing-page-sidebar) {
        border: 1px solid hotpink;
      }
      klevu-search-landing-page.stylished::part(search-landing-page-header) {
        border: 1px solid green;
        color: green;
      }
      klevu-search-landing-page.stylished::part(search-landing-page-footer) {
        border: 1px solid black;
        color: black;
      }
      klevu-search-landing-page.stylished::part(search-landing-page-content) {
        border: 1px solid blue;
      }
      klevu-search-landing-page.stylished::part(product-price) {
        color: red;
        display: block;
        text-align: right;
      }
    </style>`,
}
