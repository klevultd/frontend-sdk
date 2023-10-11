import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuRecommendations } from "./klevu-recommendations"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-recommendations")

const meta: Meta = {
  title: "Apps/Recommendations",
  component: "klevu-recommendations",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Recommendations: StoryObj<KlevuRecommendations> = {
  args: {
    recommendationId: "k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d",
  },
  render: (args) => html`<klevu-recommendations
    .cartProductIds=${args.cartProductIds}
    category-path=${ifDefined(args.categoryPath)}
    current-product-id=${ifDefined(args.currentProductId)}
    item-group-id=${ifDefined(args.itemGroupId)}
    recommendation-id=${ifDefined(args.recommendationId)}
    recommendation-title=${ifDefined(args.recommendationTitle)}
  ></klevu-recommendations>`,
}

export const Customized: StoryObj<KlevuRecommendations> = {
  args: {
    recommendationId: "k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d",
  },
  render: (args) => html`<klevu-recommendations
      id="customized"
      recommendation-id=${ifDefined(args.recommendationId)}
      recommendation-title="A custom recommendation"
    >
      <klevu-slides heading="A custom recommendation"></klevu-slides>
    </klevu-recommendations>
    <script>
      const recommendation = document.getElementById("customized")
      const slides = recommendation.querySelector("#customized klevu-slides")
      recommendation.addEventListener("klevuData", (e) => {
        console.log(e)
        slides.innerHTML = ""
        e.detail.records.forEach((item) => {
          const product = document.createElement("klevu-product")
          product.product = item
          product.isWrapper = true
          slides.appendChild(product)

          const productDiv = document.createElement("div")
          productDiv.style = "width: 200px; border: 1px solid red; padding: 10px; cursor: pointer;"
          productDiv.innerHTML = item.name
          product.appendChild(productDiv)
        })
      })
    </script> `,
}

export const Styled: StoryObj<KlevuRecommendations> = {
  args: {
    recommendationId: "k-b1c018f7-ee85-45c0-b65f-b9556f7dc15d",
  },
  render: (args) => html`<klevu-recommendations
      class="stylished"
      recommendation-id=${ifDefined(args.recommendationId)}
      recommendation-title="A stylished recommendation"
    ></klevu-recommendations>
    <style id="stylished">
      klevu-recommendations.stylished::part(slides-heading) {
        color: red;
        /* When styling text inside klevu-typography using CSS variables is required */
        --klevu-typography-font-weight: bold;
        --klevu-typography-font-size: 12px;
      }
      klevu-recommendations.stylished::part(button-base) {
        background-color: hotpink;
      }
      klevu-recommendations.stylished::part(button-base):focus:after {
        border: 2px solid black;
      }
    </style> `,
}

export const ImageBannerRecommendations: StoryObj<KlevuRecommendations> = {
  args: {
    recommendationId: "k-031a546d-15b4-4577-ae13-296663460bd8",
  },
  render: (args) => html`<klevu-recommendations
    .cartProductIds=${args.cartProductIds}
    category-path=${ifDefined(args.categoryPath)}
    current-product-id=${ifDefined(args.currentProductId)}
    item-group-id=${ifDefined(args.itemGroupId)}
    recommendation-id=${ifDefined(args.recommendationId)}
    recommendation-title=${ifDefined(args.recommendationTitle)}
  ></klevu-recommendations>`,
}
