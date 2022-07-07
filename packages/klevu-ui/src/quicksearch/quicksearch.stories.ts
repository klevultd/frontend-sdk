import { action } from "@storybook/addon-actions"
import { html } from "lit"
import "./quicksearch"
import { KlevuQuicksearch } from "./quicksearch"

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: "Quicksearch",
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {},
}

const Template: any = (args: any) => {
  const element = document.createElement(
    "klevu-quicksearch"
  ) as KlevuQuicksearch
  element.addEventListener("klevu-product-click", action("Product click"))
  element.addEventListener("klevu-do-search", action("Do search"))
  return element
}

export const Default = Template.bind({})
