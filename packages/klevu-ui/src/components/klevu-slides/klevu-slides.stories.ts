import { MDXAutoFillMeta, KlevuProductElement, mockProducts } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuSlides } from "./klevu-slides"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-slides")

const productElements = () =>
  mockProducts.slice(0, 16).map((p) => KlevuProductElement(p, { variant: "small", fixedWidth: true }))

const meta: Meta = {
  title: "Components/Slides",
  component: "klevu-slides",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Slides: StoryObj<KlevuSlides> = {
  render: (args) =>
    html`<klevu-slides
      heading=${ifDefined(args.heading)}
      slide-full-width=${ifDefined(args.slideFullWidth)}
      hide-next-prev=${ifDefined(args.hideNextPrev)}
    >
      ${productElements()}</klevu-slides
    >`,
}
