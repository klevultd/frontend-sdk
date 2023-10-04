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
        id="slides"
        heading=${ifDefined(args.heading)}
        slide-full-width=${ifDefined(args.slideFullWidth)}
        hide-next-prev=${ifDefined(args.hideNextPrev)}
      >
        ${productElements()}</klevu-slides
      >
      <style id="styled">
        #slides::part(slides-previous-button) {
          --klevu-button-background-color: var(--klevu-color-neutral-2);
          --klevu-button-background-hover: var(--klevu-color-neutral-4);
          --klevu-button-text-color: var(--klevu-color-neutral-8);
        }
        #slides::part(slides-next-button) {
          --klevu-button-background-color: var(--klevu-color-neutral-2);
          --klevu-button-background-hover: var(--klevu-color-neutral-4);
          --klevu-button-text-color: var(--klevu-color-neutral-8);
        }
      </style>`,
}

export const StyledSlides: StoryObj<KlevuSlides> = {
  render: (args) =>
    html`<klevu-slides
        id="styledSlides"
        heading="Styled Slides"
        slide-full-width=${ifDefined(args.slideFullWidth)}
        hide-next-prev=${ifDefined(args.hideNextPrev)}
      >
        ${productElements()}</klevu-slides
      >
      <style id="styled">
        #styledSlides::part(slides-heading) {
          --klevu-typography-color: darkorange;
        }
        #styledSlides::part(slides-previous-button) {
          --klevu-button-background-color: none;
          --klevu-button-text-color: darkorange;
          --klevu-button-background-hover: var(--klevu-color-neutral-2);
        }
        #styledSlides::part(slides-next-button) {
          --klevu-button-background-color: none;
          --klevu-button-text-color: darkorange;
          --klevu-button-background-hover: var(--klevu-color-neutral-2);
        }
      </style>`,
}
