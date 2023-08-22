import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuColorSwatch } from "./klevu-color-swatch"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-color-swatch")

const meta: Meta = {
  title: "Atoms/Color Swatch",
  component: "klevu-color-swatch",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const ColorSwatch: StoryObj<KlevuColorSwatch> = {
  args: {
    color: "red",
    imageUrl: "",
    selected: false,
    name: "colorFacet",
  },
  render: (args) => html`
    <klevu-color-swatch
      name=${ifDefined(args.name)}
      color=${ifDefined(args.color) || ""}
      selected=${ifDefined(args.selected)}
      image-url=${ifDefined(args.imageUrl) || ""}
    ></klevu-color-swatch>
  `,
}
