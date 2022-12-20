import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta, KlevuProductElement, mockProducts } from "../../storybookUtils"
import notes from "./readme.md"

const productElements = mockProducts
  .slice(0, 8)
  .map((p) => KlevuProductElement(p, { variant: "small", fixedWidth: true }))

export default autofillMeta("klevu-slides", {
  title: "Components/Slides",
  parameters: { notes },
})

const Template: Story<HTMLKlevuSlidesElement> = (args) => html`<klevu-slides
  .slideFullWidth=${args.slideFullWidth}
  .hideNextPrev=${args.hideNextPrev}
  .height=${args.height}
>
  ${productElements}</klevu-slides
>`

export const WithProducts = Template.bind({})
