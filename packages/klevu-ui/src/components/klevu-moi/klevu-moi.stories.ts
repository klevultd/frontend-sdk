import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { createRef, ref, Ref } from "lit/directives/ref.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuMoi } from "./klevu-moi"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-moi")

const decoratorsWithoutInit = [decorators[0]]

const meta: Meta = {
  title: "Apps/Moi",
  component: "klevu-moi",
  argTypes,
  parameters,
  decorators: decoratorsWithoutInit,
}

export default meta

export const Moi: StoryObj<KlevuMoi> = {
  render: (args) =>
    html`
      <!-- Just a example button in anywhere in your codebase -->
      <klevu-button id="open">Start moi</klevu-button>

      <!-- the moi component, should be in end of the <body> tag -->
      <klevu-init api-key="klevu-156934068344410779">
        <klevu-moi></klevu-moi>
      </klevu-init>

      <!-- your logic script somewhere -->
      <script>
        moi = document.querySelector("klevu-moi")
        button = document.querySelector("klevu-button#open")
        button.addEventListener("click", () => {
          console.log("open moi")
          moi.open()
        })
        moi.addEventListener("klevuMoiProductClick", (e) => {
          console.log("moi product click", e.detail)
          e.preventDefault()
        })
      </script>
    `,
}
