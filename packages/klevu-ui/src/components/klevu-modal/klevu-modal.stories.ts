import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuModal } from "./klevu-modal"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-modal")

const meta: Meta = {
  title: "Atoms/Modal",
  component: "klevu-modal",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Modal: StoryObj<KlevuModal> = {
  render: (args) => html`
    <div>
      <klevu-modal id="modal">Hello world!</klevu-modal>
      <klevu-button onclick="document.getElementById('modal').openModal()">Open modal</klevu-button>
    </div>
  `,
}
