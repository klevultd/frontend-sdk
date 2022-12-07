import { create } from "@storybook/theming"

export default create({
  base: "light",

  colorPrimary: "#97C73E",
  colorSecondary: "#97C73E",

  fontBase: "'Poppins', sans-serif",

  /*
  // UI
  appBg: "white",
  appContentBg: "silver",
  appBorderColor: "grey",
  appBorderRadius: 4,

  // Typography
  fontCode: "monospace",

  // Text colors
  textColor: "black",
  textInverseColor: "white",
  */

  // Toolbar default and active colors
  barTextColor: "#eee",
  barSelectedColor: "#333",
  barBg: "#97C73E",

  /*
  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,
  */

  brandTitle: "Klevu Web Components",
  brandUrl: "https://developers.klevu.com",
  brandImage: "/klevu-color.svg",
  brandTarget: "_self",
})
