export default {
  input: "src/index",
  output: {
    file: "dist/index",
    format: "umd",
    name: "dynamic_bridge",
  },
  plugins: [resolve(), commonjs()],
};
