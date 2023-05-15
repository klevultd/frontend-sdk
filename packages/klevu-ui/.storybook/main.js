import { mergeConfig } from "vite"

module.exports = {
  stories: ["../src/stories/*.mdx", "../src/components/**/*.mdx", "../src/components/**/*.stories.ts"],
  addons: ["@storybook/addon-essentials", "@ljcl/storybook-addon-cssprops"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  staticDirs: ["../storybookAssets"],
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          external: ["@klevu/core"]
        }
      }
    })
  }
}
