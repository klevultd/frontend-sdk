import { create } from "@storybook/theming"

export default create({
  base: "light",

  colorPrimary: "#97C73E",
  colorSecondary: "#97C73E",

  // Typography
  fontBase: "'Poppins', sans-serif !important",
  fontCode: "'Source Code Pro', monospace",

  /*
  // UI
  appBg: "white",
  appContentBg: "silver",
  appBorderColor: "grey",
  appBorderRadius: 4,

  // Text colors
  textColor: "black",
  textInverseColor: "white",
  */

  // Toolbar default and active colors
  barTextColor: "#eee",
  barSelectedColor: "#e5e5e5",
  barBg: "#0A4563",

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
