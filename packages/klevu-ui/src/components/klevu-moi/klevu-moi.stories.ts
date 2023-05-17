import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuMoi } from "./klevu-moi"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-moi")

const meta: Meta = {
  title: "Apps/Moi",
  component: "klevu-moi",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Moi: StoryObj<KlevuMoi> = {
  render: (args) =>
    html`<klevu-moi
      api-key="klevu-156934068344410779"
      style="height: 600px"
      @klevuMoiProductClick="${(e: CustomEvent) => {
        console.log("moi product click", e.detail)
        e.preventDefault()
      }}"
    ></klevu-moi>`,
}
