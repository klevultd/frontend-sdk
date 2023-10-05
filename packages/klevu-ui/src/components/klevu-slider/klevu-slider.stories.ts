import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuSlider } from "./klevu-slider"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-slider")

const meta: Meta = {
  title: "Atoms/Slider",
  component: "klevu-slider",
  argTypes: {
    ...argTypes,
    showTooltips: {
      table: {
        disable: true,
      },
    },
    formatTooltip: {
      table: {
        disable: true,
      },
    },
  },
  parameters,
  decorators,
}

export default meta

export const Slider: StoryObj<KlevuSlider> = {
  args: {
    min: 0,
    max: 100,
    start: 10,
    end: 90,
  },
  render: (args) => html`<klevu-slider
    end=${ifDefined(args.end)}
    max=${ifDefined(args.max)}
    min=${ifDefined(args.min)}
    show-tooltips=${ifDefined(args.showTooltips)}
    start=${ifDefined(args.start)}
    .formatTooltip=${args.formatTooltip}
  ></klevu-slider>`,
}

export const SliderWithTooltips: StoryObj<KlevuSlider> = {
  ...Slider,
  args: {
    min: 0,
    max: 100,
    start: 10,
    end: 90,
    showTooltips: true,
  },
}
