module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@ljcl/storybook-addon-cssprops"],
  framework: "@storybook/web-components",
  staticDirs: ["../storybookAssets"],
  core: { builder: "webpack5" },
  features: {
    previewMdx2: false,
  },
}
