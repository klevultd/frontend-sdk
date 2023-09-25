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
    term: "hoodies",
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
    image-url-for-search=${ifDefined(args.imageUrlForSearch)}
    show-variants-count=${ifDefined(args.showVariantsCount)}
  ></klevu-search-landing-page>`,
}

export const WithInfiniteScroll: StoryObj<KlevuSearchLandingPage> = {
  args: {
    term: "red shoes",
    useInfiniteScroll: true,
  },
  render: SearchLandingPage.render,
}

export const WithImageSearch: StoryObj<KlevuSearchLandingPage> = {
  args: {
    imageUrlForSearch: "https://picsum.photos/600/600",
    useInfiniteScroll: true,
  },
  render: SearchLandingPage.render,
}
