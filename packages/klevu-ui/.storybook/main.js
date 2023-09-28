module.exports = {
  stories: ["../src/stories/*.mdx", "../src/components/**/*.mdx", "../src/components/**/*.stories.ts"],
  addons: [
    "@storybook/addon-essentials",
    "../storybookAddons/register.ts",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: ["../storybookAssets"],
  docs: {
    autodocs: true,
  },
}
