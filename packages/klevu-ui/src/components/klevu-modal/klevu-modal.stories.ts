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

export const StyledModal: StoryObj<KlevuModal> = {
  render: (args) => html`
    <klevu-modal id="styledModal">
      <div slot="header">Sample header</div>
      Sample body
    </klevu-modal>
    <klevu-button onclick="document.getElementById('styledModal').openModal()">Open styled modal</klevu-button>
    <style id="styled">
      #styledModal::part(modal-header) {
        font-weight: bold;
        color: blue;
        background-color: #ddd;
      }
      #styledModal::part(modal-body) {
        font-style: italic;
      }
      #styledModal::part(modal-dialog) {
        height: 200px;
        width: 200px;
        background-color: beige;
      }
    </style>
  `,
}
