import { action } from "@storybook/addon-actions"
import "./popularterms"
import { KlevuPopularTerms } from "./popularterms"

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: "Popular terms",
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {},
}

const Template: any = (args: any) => {
  const element = document.createElement(
    "klevu-popularterms"
  ) as KlevuPopularTerms
  return element
}

export const Default = Template.bind({})
