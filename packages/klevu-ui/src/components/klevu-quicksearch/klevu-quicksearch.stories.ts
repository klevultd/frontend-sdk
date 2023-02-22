import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined"
import notes from "./readme.md"

import { Story } from "@storybook/web-components"
import { autofillMeta } from "../../storybookUtils"

export default autofillMeta("klevu-quicksearch", {
  title: "Apps/Quicksearch",
  parameters: { notes },
})

const Template: Story<HTMLKlevuQuicksearchElement> = (args) =>
  html` <klevu-init api-key="klevu-165829460115715456" url="https://eucs30v2.ksearchnet.com/cs/v2/search"
    ><klevu-quicksearch
      fallback-term=${ifDefined(args.fallbackTerm)}
      popup-anchor=${ifDefined(args.popupAnchor)}
      search-categories=${ifDefined(args.searchCategories)}
      search-cms-cages=${ifDefined(args.searchCmsPages)}
      placeholder=${ifDefined(args.placeholder)}
      search-field-variant=${ifDefined(args.searchFieldVariant)}
    ></klevu-quicksearch
  ></klevu-init>`

export const Default = Template.bind({})

Default.args = {
  popupAnchor: "bottom-start",
  fallbackTerm: "shoes",
}
