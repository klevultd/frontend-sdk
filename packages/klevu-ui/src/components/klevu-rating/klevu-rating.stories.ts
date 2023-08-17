import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuRating } from "./klevu-rating"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-rating")

const meta: Meta = {
  title: "Atoms/Rating",
  component: "klevu-rating",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const Rating: StoryObj<KlevuRating> = {
  args: {
    rating: 3,
  },
  render: (args) => html`
    <klevu-rating rating=${args.rating}></klevu-rating>
  `,
}
