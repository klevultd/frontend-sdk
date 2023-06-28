module.exports = {
  stories: ["../src/stories/*.mdx", "../src/components/**/*.mdx", "../src/components/**/*.stories.ts"],
  addons: ["@storybook/addon-essentials", "@ljcl/storybook-addon-cssprops", "../storybookAddons/register.ts"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: ["../storybookAssets"],
  docs: {
    autodocs: true,
  },
}
