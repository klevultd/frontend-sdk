import { Config } from "@stencil/core"
import { resolve } from "path"
import fg from "fast-glob"
import { reactOutputTarget as react } from "@stencil/react-output-target"
import { vueOutputTarget as vue } from "@stencil/vue-output-target"

export const config: Config = {
  namespace: "klevu-ui",
  globalStyle: "src/global/global.css",
  tsconfig: "tsconfig.build.json",
  extras: {
    experimentalImportInjection: true,
  },
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
      customElementsExportBehavior: "auto-define-custom-elements",
      type: "dist-custom-elements",
      generateTypeDeclarations: true,
      copy: [
        {
          src: "translations",
          dest: "dist/",
          keepDirStructure: true,
          warn: true,
        },
      ],
    },
    /*
    {
      type: "docs-readme",
      footer: "",
    },
    */
    {
      type: "docs-json",
      file: "dist/docs/klevu-ui-docs.json",
    },
    {
      type: "docs-vscode",
      file: "dist/docs/vscode-data.json",
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
