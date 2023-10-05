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
      accordion-start-open="true"
    ></klevu-facet>`,
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
  render: (args) =>
    html`<klevu-facet
        accordion=${true}
        accordion-start-open=${ifDefined(args.accordionStartOpen)}
        .customOrder=${args.customOrder}
        .manager=${args.manager}
        mode=${ifDefined(args.mode)}
        .option=${args.option}
        .slider=${args.slider}
        label-override="Facet with custom order"
        accordion-start-open="true"
      ></klevu-facet>
      <klevu-facet
        accordion=${true}
        accordion-start-open=${ifDefined(args.accordionStartOpen)}
        .manager=${args.manager}
        mode=${ifDefined(args.mode)}
        .option=${args.option}
        .slider=${args.slider}
        label-override="Facet with default order"
        accordion-start-open="true"
      ></klevu-facet>`,
  args: {
    manager: manager,
    option: manager.options[0],
    customOrder: ["green", "petrol"],
  },
}

export const StyledFacet: StoryObj<KlevuFacet> = {
  render: (args) =>
    html`<klevu-facet
        id="styledFacet"
        accordion=${true}
        accordion-start-open=${ifDefined(args.accordionStartOpen)}
        .customOrder=${args.customOrder}
        .manager=${args.manager}
        mode=${ifDefined(args.mode)}
        .option=${args.option}
        .slider=${args.slider}
        label-override="Facet with custom order"
        accordion-start-open="true"
      ></klevu-facet>
      <klevu-facet
        id="styledFacet"
        accordion=${true}
        accordion-start-open=${ifDefined(args.accordionStartOpen)}
        .manager=${args.manager}
        mode=${ifDefined(args.mode)}
        .option=${args.option}
        .slider=${args.slider}
        label-override="Facet with default order"
        accordion-start-open="true"
      ></klevu-facet>
      <style id="styled">
        #styledFacet::part(accordion-header) {
          --klevu-typography-color: blue;
          font-size: 30px;
        }
        #styledFacet::part(accordion-content) {
          color: green;
        }
        #styledFacet::part(accordion-icon) {
          color: red;
        }
      </style>`,
  args: {
    manager: manager,
    option: manager.options[0],
  },
}

export const Slider: StoryObj<KlevuFacet> = {
  render: (args) =>
    html`<klevu-facet
      accordion=${true}
      accordion-start-open=${ifDefined(args.accordionStartOpen)}
      .customOrder=${args.customOrder}
      .manager=${args.manager}
      mode=${ifDefined(args.mode)}
      .option=${args.option}
      .slider=${args.slider}
      label-override="Price as slider"
      accordion-start-open="true"
    ></klevu-facet>`,
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
