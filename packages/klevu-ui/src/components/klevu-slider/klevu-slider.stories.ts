import { Story } from "@storybook/web-components"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
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
    end=${ifDefined(args.end)}
    max=${ifDefined(args.max)}
    min=${ifDefined(args.min)}
    show-tooltips=${ifDefined(args.showTooltips)}
    start=${ifDefined(args.start)}
    .formatTooltip=${args.formatTooltip}
  ></klevu-slider>`

export const Default = Template.bind({})
Default.args = {
  min: 0,
  max: 100,
  start: 10,
  end: 90,
}

export const WithCurrencyTooltip = Template.bind({})
WithCurrencyTooltip.args = {
  min: 10,
  max: 500,
  start: 50,
  end: 400,
  showTooltips: true,
  formatTooltip: (value: number) => `$${value.toFixed(0)}`,
}
