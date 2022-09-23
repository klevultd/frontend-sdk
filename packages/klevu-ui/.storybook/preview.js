import { defineCustomElements } from "../loader"
import "../src/global/global.css"

defineCustomElements()

export const parameters = {
  options: {
    order: ["Atoms", "Components", "Apps"],
  },
  actions: {
    argTypesRegex: "^(on.*|klevu.*)",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  cssprops: {
    "klevu-color-primary": { value: "#00a0e9", description: "Main color of components" },
    "klevu-color-primary-text": { value: "#ffffff", description: "Text color on top primary color" },
    "klevu-color-primary-border": { value: "#0675a8", description: "Border color related to primary color" },
    "klevu-color-border": { value: "#e0e0e0", description: "Standard border color used to separate items" },
    "klevu-color-dim-background": { value: "#fafafa", description: "Dimmed background color for default cases" },
    "klevu-spacing-small": { value: "4px", description: "Small spacing" },
    "klevu-spacing-normal": { value: "8px", description: "Normal spacing" },
    "klevu-spacing-large": { value: "12px", description: "Large spacing" },
    "klevu-rounded-corners": { value: "4px", description: "Rounded corners" },
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