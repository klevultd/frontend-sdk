const external = ["vue", "vue-router"]

export default {
  input: "dist-transpiled/index.js",
  output: [
    {
      dir: "dist/",
      entryFileNames: "[name].esm.js",
      chunkFileNames: "[name]-[hash].esm.js",
      format: "es",
      sourcemap: true,
    },
    {
      dir: "dist/",
      format: "commonjs",
      generatedCode: {
        constBinding: true,
      },
      sourcemap: true,
    },
  ],
  external: (id) => external.includes(id) || id.startsWith("stencil-library"),
}
