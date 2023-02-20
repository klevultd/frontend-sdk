import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
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
  slide-full-width=${ifDefined(args.slideFullWidth)}
  hide-next-prev=${ifDefined(args.hideNextPrev)}
  height=${ifDefined(args.height)}
>
  ${productElements}</klevu-slides
>`

export const WithProducts = Template.bind({})
