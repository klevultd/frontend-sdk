import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { createRef, ref, Ref } from "lit/directives/ref.js"
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

const foo = "test"

export const Moi: StoryObj<KlevuMoi> = {
  render: (args) =>
    html`
      <klevu-init api-key="klevu-156934068344410779">
        <klevu-button>Start moi</klevu-button>
        <klevu-moi></klevu-moi>
        <script>
          moi = document.querySelector("klevu-moi")
          button = document.querySelector("klevu-button")
          button.addEventListener("click", () => {
            console.log("open moi")
            moi.open()
          })
          moi.addEventListener("klevuMoiProductClick", (e) => {
            console.log("moi product click", e.detail)
            e.preventDefault()
          })
          ${foo}
        </script>
      </klevu-init>
    `,
}
