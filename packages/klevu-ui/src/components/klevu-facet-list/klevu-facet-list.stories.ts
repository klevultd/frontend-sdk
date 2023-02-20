import { FilterManager } from "@klevu/core"
import { autofillMeta, fullMockRequest } from "../../storybookUtils"

//
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"

export default autofillMeta("klevu-facet-list", {
  title: "Components/FacetList",
  parameters: { notes },
})

const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults?.[0].filters as any)

const Template: Story<HTMLKlevuFacetListElement> = (args) =>
  html`<klevu-facet-list
    accordion=${ifDefined(args.accordion)}
    .customOrder=${args.customOrder}
    .manager=${args.manager}
    .mode=${args.mode}
    use-apply-button=${ifDefined(args.useApplyButton)}
  ></klevu-facet-list>`

export const Default = Template.bind({})
Default.args = {
  manager,
}
export const Radio = Template.bind({})
Radio.args = {
  manager,
  mode: "radio",
}
export const ModePerKey = Template.bind({})
ModePerKey.args = {
  manager,
  mode: {
    category: "radio",
    brand: "radio",
  },
}
