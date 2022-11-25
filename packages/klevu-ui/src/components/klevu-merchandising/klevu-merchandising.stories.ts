import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-merchandising", {
  title: "Apps/Merchandising",
  parameters: { notes },
})

const Template: Story<HTMLKlevuMerchandisingElement> = (args) =>
  html`<klevu-merchandising
    .category=${args.category}
    .categoryTitle=${args.categoryTitle}
    .filterCount=${args.filterCount}
    .filterCustomOrder=${args.filterCustomOrder}
    .limit=${args.limit}
    .renderProductSlot=${args.renderProductSlot}
    .sort=${args.sort}
  ></klevu-merchandising>`

export const Default = Template.bind({})
Default.args = {
  category: "Apparel",
  categoryTitle: "Apparels",
}
