import { FilterManager, KlevuFilterType } from "@klevu/core"
import { MDXAutoFillMeta, fullMockRequest } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuFacetList } from "./klevu-facet-list"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-facet-list")
const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults?.[0].filters as any)
const manager2 = new FilterManager()
manager2.initFromListFilters([
  {
    key: "color",
    label: "Filtercolor",
    type: KlevuFilterType.Options,
    options: [
      { count: 26, name: "beige", value: "beige", selected: false },
      { count: 41, name: "black", value: "black", selected: false },
      { count: 243, name: "blue", value: "blue", selected: false },
      { count: 45, name: "brown", value: "brown", selected: false },
      { count: 40, name: "green", value: "green", selected: false },
      { count: 85, name: "grey", value: "grey", selected: false },
      { count: 42, name: "multicolored", value: "multicolored", selected: false },
      { count: 11, name: "oliv", value: "oliv", selected: false },
      { count: 1, name: "orange", value: "orange", selected: false },
      { count: 3, name: "petrol", value: "petrol", selected: false },
    ],
  },
  {
    key: "size",
    label: "Size",
    type: KlevuFilterType.Options,
    options: [
      { count: 14, name: "0", value: "0", selected: false },
      { count: 14, name: "1", value: "1", selected: false },
      { count: 31, name: "10", value: "10", selected: false },
    ],
  },
])

const meta: Meta = {
  title: "Components/Facet List",
  component: "klevu-facet-list",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const FacetList: StoryObj<KlevuFacetList> = {
  args: {
    manager: manager,
  },
  render: (args) =>
    html`<klevu-facet-list
      accordion=${ifDefined(args.accordion)}
      .customOrder=${args.customOrder}
      .manager=${args.manager}
      .mode=${args.mode}
      use-apply-button="${ifDefined(args.useApplyButton)}"
      defaultPriceLabel=${ifDefined(args.defaultPriceLabel)}
    ></klevu-facet-list>`,
}

export const SmallExample: StoryObj<KlevuFacetList> = {
  ...FacetList,
  args: {
    manager: manager2,
  },
}

export const FacetListColorSwatches: StoryObj<KlevuFacetList> = {
  args: {
    manager: manager,
    colorSwatches: ["color"],
    colorSwatchOverrides: {
      color: {
        beige: {
          borderColor: "black",
        },
        oliv: {
          color: "red",
        },
        multicolored: {
          color: "purple",
        },
      },
    },
    customOrder: {},
  },
  render: (args) =>
    html`<klevu-facet-list
      accordion=${ifDefined(args.accordion)}
      .customOrder=${args.customOrder}
      .manager=${args.manager}
      .mode=${args.mode}
      use-apply-button="${ifDefined(args.useApplyButton)}"
      defaultPriceLabel=${ifDefined(args.defaultPriceLabel)}
      custom-order="${ifDefined(args.customOrder)}"
      .colorSwatchOverrides="${args.colorSwatchOverrides}"
      .colorSwatches="${args.colorSwatches}"
    ></klevu-facet-list>`,
}

export const StyledFacetList: StoryObj<KlevuFacetList> = {
  args: {
    manager: manager,
  },
  render: (args) =>
    html`<klevu-facet-list
        id="styledFacetList"
        accordion=${ifDefined(args.accordion)}
        .customOrder=${args.customOrder}
        .manager=${args.manager}
        .mode=${args.mode}
        use-apply-button="${ifDefined(args.useApplyButton)}"
        defaultPriceLabel=${ifDefined(args.defaultPriceLabel)}
      ></klevu-facet-list>
      <style id="styled">
        #styledFacetList::part(facet-heading) {
          --klevu-typography-color: #555;
          margin-bottom: 8px;
        }
        #styledFacetList::part(checkbox-box) {
          background-color: azure;
          outline: azure;
        }
        #styledFacetList::part(checkbox-box):hover {
          background-color: azure;
          border-color: orange;
        }
        #styledFacetList::part(checkbox-content) {
          --klevu-typography-color: #555;
        }
        #styledFacetList::part(facet-option-count) {
          font-style: italic;
        }
        #styledFacetList::part(facet-more-button) {
          --klevu-color-primary: red;
        }
      </style>`,
}
