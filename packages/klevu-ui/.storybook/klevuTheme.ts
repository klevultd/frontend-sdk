import { create } from "@storybook/theming"

export default create({
  base: "light",

  colorPrimary: "#97C73E",
  colorSecondary: "#97C73E",

  // Typography
  fontBase: "'Poppins', sans-serif !important",
  fontCode: "'Source Code Pro', monospace",

  // UI
  appBg: "#EBF4F7",
  appContentBg: "white",
  appBorderColor: "#dbdbdb",
  appBorderRadius: 2,
  /*

  // Text colors
  textColor: "black",
  textInverseColor: "white",
  */

  // Toolbar default and active colors
  barTextColor: "#191919",
  barSelectedColor: "#000",
  barBg: "#fff",

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
