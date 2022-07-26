import { Config } from '@stencil/core';
import { resolve } from 'path';
import fg from 'fast-glob';

export const config: Config = {
  namespace: 'klevu-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  rollupPlugins: {
    before: [
      /* This fixes build --watch not watching .css files */
      {
        name: 'watch-external',
        async buildStart() {
          const styleFiles = await fg(resolve(__dirname, './components/**/*.css'));
          for (let file of styleFiles) {
            this.addWatchFile(file);
          }
        },
      },
    ],
  },
};
