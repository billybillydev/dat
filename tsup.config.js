export default {
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true, // Set to true if using TypeScript for type definitions
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  clean: true,
};
