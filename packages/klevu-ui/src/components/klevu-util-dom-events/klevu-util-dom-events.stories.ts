import { MDXAutoFillMeta, fullMockRequest } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuUtilDomEvents } from "./klevu-util-dom-events"
import { FilterManager } from "@klevu/core"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-util-dom-events")

const manager = new FilterManager()
manager.initFromListFilters(fullMockRequest.queryResults?.[0].filters as any)

const meta: Meta = {
  title: "Utils/DomEvents",
  component: "klevu-util-dom-events",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const DomEvents: StoryObj<KlevuUtilDomEvents> = {
  render: (args) => html`
    <klevu-util-dom-events
      @klevuFilterSelectionUpdate=${(e: any) => {
        console.log(e.detail)
      }}
    ></klevu-util-dom-events>
    <klevu-facet-list .manager=${manager}></klevu-facet-list>
  `,
}
