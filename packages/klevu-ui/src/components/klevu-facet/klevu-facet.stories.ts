import { FilterManager, KlevuFilterType } from "@klevu/core"
import { autofillMeta, fullMockRequest } from "../../storybookUtils"

//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"

export default autofillMeta("klevu-facet", {
  title: "Components/Facet",
  parameters: { notes },
})

const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults?.[0].filters as any)

const Template: Story<HTMLKlevuFacetElement> = (args) =>
  html`<klevu-facet
    accordion=${ifDefined(args.accordion)}
    accordion-start-open=${ifDefined(args.accordionStartOpen)}
    .customOrder=${args.customOrder}
    .manager=${args.manager}
    mode=${ifDefined(args.mode)}
    .option=${args.option}
    .slider=${args.slider}
  ></klevu-facet>`

export const Default = Template.bind({})
Default.args = {
  manager,
  option: manager.options[0],
  mode: "checkbox",
}

export const DefaultRadio = Template.bind({})
DefaultRadio.args = {
  manager,
  option: manager.options[0],
  mode: "radio",
}

export const CustomSort = Template.bind({})
CustomSort.args = {
  manager,
  option: manager.options[0],
  mode: "checkbox",
  customOrder: ["Aqua Blue/Orange", "All Black"],
}

export const Slider = Template.bind({})
Slider.args = {
  manager,
  slider: {
    type: KlevuFilterType.Slider,
    min: "0",
    max: "0",
    start: "10",
    end: "90",
    key: "foo",
    label: "Ranger slider",
  },
}
