import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { autofillMeta } from "../../storybookUtils"
import notes from "./readme.md"

export default autofillMeta("klevu-slider", {
  title: "Components/Slider",
  parameters: {
    notes,
  },
})

const Template: Story<HTMLKlevuSliderElement> = (args) =>
  html`<klevu-slider
    .end=${args.end}
    .max=${args.max}
    .min=${args.min}
    .showTooltips=${args.showTooltips}
    .start=${args.start}
  ></klevu-slider>`

export const Default = Template.bind({})
Default.args = {
  min: 0,
  max: 100,
  start: 10,
  end: 90,
}
