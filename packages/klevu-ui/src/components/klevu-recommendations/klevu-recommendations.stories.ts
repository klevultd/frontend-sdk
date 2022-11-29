import { autofillMeta } from "../../storybookUtils"

//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"

export default autofillMeta("klevu-recommendations", {
  title: "Apps/Recommendations",
  parameters: { notes },
})

const Template: Story<HTMLKlevuRecommendationsElement> = (args) =>
  html`<klevu-recommendations
    .cartProductIds=${args.cartProductIds}
    .categoryPath=${args.categoryPath}
    .currentProductId=${args.currentProductId}
    .itemGroupId=${args.itemGroupId}
    .recommendationId=${args.recommendationId}
    .recommendationTitle=${args.recommendationTitle}
    .renderProductSlot=${args.renderProductSlot}
  ></klevu-recommendations>`

export const Default = Template.bind({})
Default.args = {
  recommendationId: "k-4c963fdd-df37-4819-becd-bc6015307ba6",
  recommendationTitle: "The title",
}
