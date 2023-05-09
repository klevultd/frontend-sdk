import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuRecommendations } from "./klevu-recommendations"
export const { argTypes, parameters, description } = MDXAutoFillMeta("klevu-recommendations")

const meta: Meta = {
  title: "Apps/Recommendations",
  component: "klevu-recommendations",
  argTypes,
  parameters,
}

export default meta

export const Recommendations: StoryObj<KlevuRecommendations> = {
  args: {
    recommendationId: "k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d",
    recommendationTitle: "Trending products",
  },
  render: (args) => html`<klevu-recommendations
    .cartProductIds=${args.cartProductIds}
    category-path=${ifDefined(args.categoryPath)}
    current-product-id=${ifDefined(args.currentProductId)}
    item-group-id=${ifDefined(args.itemGroupId)}
    recommendation-id=${ifDefined(args.recommendationId)}
    recommendation-title=${ifDefined(args.recommendationTitle)}
    .renderProductSlot=${args.renderProductSlot}
  ></klevu-recommendations>`,
}
