import { defineCustomElements } from "../loader"
import "../src/global/global.css"

defineCustomElements()

export const parameters = {
  actions: {
    argTypesRegex: "^on.*",
    handles: [
      "results",
      "productClick",
      "klevu-click-send-event",
      "klevu-filter-selection-update",
      "klevu-filters-applied",
      "klevu-last-search-update",
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssprops: {
    "klevu-product-image-aspect-ratio": {
      value: "1.4 / 1",
      description: "The aspect ratio of the product image",
    },
    "klevu-product-width": {
      value: "300px",
      description: "The width of the product",
    },
  },
}
