import { Config } from "@stencil/core"
import { resolve } from "path"
import fg from "fast-glob"
import { reactOutputTarget as react } from "@stencil/react-output-target"
import { vueOutputTarget as vue } from "@stencil/vue-output-target"

export const config: Config = {
  namespace: "klevu-ui",
  globalStyle: "src/global/global.css",
  outputTargets: [
    react({
      componentCorePackage: "@klevu/ui",
      proxiesFile: "../klevu-ui-react/src/components/stencil-generated/index.ts",
      includeDefineCustomElements: true,
    }),
    vue({
      componentCorePackage: "@klevu/ui",
      proxiesFile: "../klevu-ui-vue/src/components.ts",
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
  rollupPlugins: {
    before: [
      /* This fixes build --watch not watching .css files */
      {
        name: "watch-external",
        async buildStart() {
          const styleFiles = await fg(resolve(__dirname, "./components/**/*.css"))
          styleFiles.push(resolve(__dirname, "./global/global.css"))
          for (let file of styleFiles) {
            this.addWatchFile(file)
          }
        },
      },
    ],
  },
}
