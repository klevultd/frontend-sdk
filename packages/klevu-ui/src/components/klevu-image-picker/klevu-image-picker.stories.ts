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
  render: (args) =>
    html`<klevu-image-picker max-file-size=${args.maxFileSize}></klevu-image-picker>
      <script>
        const imgPicker = document.querySelector("klevu-image-picker")
        imgPicker.addEventListener("klevuImageSelected", (event) => {
          window.alert("image name = " + event.detail.name + ", Image Blob is also available in this event")
        })
      </script>`,
}
