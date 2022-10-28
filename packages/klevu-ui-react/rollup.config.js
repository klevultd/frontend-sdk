import typescript from "@rollup/plugin-typescript"

const external = ["react", "react-dom"]

export default {
  input: "src/index.ts",
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
  plugins: [typescript()],
}
