import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
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
    ratingRange: 5,
  },
  render: (args) => html`
    <klevu-rating rating=${ifDefined(args.rating)} rating-range=${ifDefined(args.ratingRange)}></klevu-rating>
  `,
}
export const StyledRating: StoryObj<KlevuRating> = {
  args: {
    rating: 3,
    ratingRange: 5,
  },
  render: (args) => html`
    <klevu-rating
      id="styledRating"
      rating=${ifDefined(args.rating)}
      rating-range=${ifDefined(args.ratingRange)}
    ></klevu-rating>
    <style>
      #styledRating::part(rating-star) {
        fill: red;
      }
    </style>
  `,
}
