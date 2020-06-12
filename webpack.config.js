const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const jsRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [],
      },
    },
  },
  {
    test: /\.html$/i,
    loader: "html-loader",
  },
  {
    test: /\.s[ac]ss$/i,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
];

const prodPlugins = [new CompressionPlugin()];

const devPlugins = [];

module.exports = (env, { mode }) => ({
  output: {
    filename: "app.[contentHash].js",
  },
  module: {
    rules: jsRules,
  },
  plugins: [
    ...(mode === "production" ? prodPlugins : devPlugins),
    new HtmlWebpackPlugin({ title: "App Name", template: "src/index.html" }),
  ].filter(Boolean),
});
