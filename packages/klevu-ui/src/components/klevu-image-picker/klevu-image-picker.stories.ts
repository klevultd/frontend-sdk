import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuImagePicker, KlevuImageSelectedEvent } from "./klevu-image-picker"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-image-picker")

const meta: Meta = {
  title: "Components/Image Picker",
  component: "klevu-image-picker",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const imagePicker: StoryObj<KlevuImagePicker> = {
  args: {
    isLoading: false,
  },
  render: (args) =>
    html`<klevu-image-picker is-loading=${args.isLoading} max-file-size=${args.maxFileSize}></klevu-image-picker>
      <style>
        klevu-image-picker::part(accordion-header) {
          font-style: italic;
        }
        klevu-image-picker::part(accordion-content) {
          font-size: 12px;
        }
        klevu-image-picker::part(accordion-icon) {
          color: purple;
          font-size: 30px;
        }
      </style>
      <script>
        const imgPicker = document.querySelector("klevu-image-picker")
        imgPicker.addEventListener("klevuImageSelected", (event) => {
          window.alert("image name = " + event.detail.name + ", Image Blob is also available in this event")
        })
      </script>`,
}
