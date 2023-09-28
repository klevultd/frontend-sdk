import { FilterManager } from "@klevu/core"
import { MDXAutoFillMeta, fullMockRequest } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuFacet } from "./klevu-facet"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-facet")
const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults?.[0].filters as any)

const meta: Meta = {
  title: "Components/Facet",
  component: "klevu-facet",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Facet: StoryObj<KlevuFacet> = {
  args: {
    manager: manager,
    option: manager.options[0],
    mode: "checkbox",
  },
  render: (args) =>
    html`<klevu-facet
        accordion=${true}
        accordion-start-open=${ifDefined(args.accordionStartOpen)}
        .customOrder=${args.customOrder}
        .manager=${args.manager}
        mode=${ifDefined(args.mode)}
        .option=${args.option}
        .slider=${args.slider}
        labelOverride=${ifDefined(args.labelOverride)}
      ></klevu-facet>
      <style>
        klevu-facet::part(accordion-header) {
          --klevu-typography-color: blue;
          font-size: 30px;
        }
        klevu-facet::part(accordion-content) {
          color: green;
        }
        klevu-facet::part(accordion-icon) {
          color: red;
        }
      </style>`,
}

export const FacetWithRadio: StoryObj<KlevuFacet> = {
  ...Facet,
  args: {
    manager: manager,
    option: manager.options[0],
    mode: "radio",
  },
}

export const CustomOrder: StoryObj<KlevuFacet> = {
  ...Facet,
  args: {
    manager: manager,
    option: manager.options[0],
    customOrder: ["green", "petrol"],
  },
}

export const Slider: StoryObj<KlevuFacet> = {
  ...Facet,
  args: {
    manager: manager,
    slider: manager.sliders[0],
  },
}

export const ColorSwatches: StoryObj<KlevuFacet> = {
  args: {
    manager: manager,
    option: manager.options[0],
    mode: "checkbox",
    useColorSwatch: true,
    colorSwatchOverrides: {
      oliv: {
        color: "red",
      },
      multicolored: {
        color: "purple",
      },
    },
  },
  render: (args) =>
    html`<klevu-facet
      accordion=${ifDefined(args.accordion)}
      accordion-start-open=${ifDefined(args.accordionStartOpen)}
      .customOrder=${args.customOrder}
      .manager=${args.manager}
      mode=${ifDefined(args.mode)}
      .option=${args.option}
      .slider=${args.slider}
      labelOverride=${ifDefined(args.labelOverride)}
      use-color-swatch=${ifDefined(args.useColorSwatch)}
      .colorSwatchOverrides=${args.colorSwatchOverrides}
    ></klevu-facet>`,
}
