import { action } from "@storybook/addon-actions"
import "./searchfield"
import { KlevuSearchfield } from "./searchfield"

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
  title: "Searchfield",
  // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
  argTypes: {
    doSearch: { type: "boolean" },
    placeholder: { type: "string" },
  },
}

const Template: any = (args: any) => {
  const search = document.createElement("klevu-searchfield") as KlevuSearchfield
  if (args.placeholder) {
    search.setAttribute("placeholder", args.placeholder)
  }
  if (args.doSearch) {
    search.setAttribute("doSearch", "")
  }
  search.addEventListener(
    "klevu-debounced-input-change",
    action("Debounced input change")
  )
  search.addEventListener("klevu-start-search", action("Start search"))
  search.addEventListener("klevu-do-search", action("Do search"))
  search.addEventListener("klevu-search-result", action("Search result"))
  search.addEventListener("focus", action("Focus"))
  return search
}

export const SearchDoing = Template.bind({})
SearchDoing.args = {
  placeholder: null,
  doSearch: true,
}

export const SearchNotDoing = Template.bind({})
SearchNotDoing.args = {
  placeholder: "Doesn't automatically search Klevu server",
  doSearch: false,
}
