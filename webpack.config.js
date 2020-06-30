const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const jsRules = [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },
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
  /* sass */
  {
    test: /\.s[ac]ss$/i,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  /* tailwind */
  {
    test: /\.css$/,
    use: [
      "style-loader",
      { loader: "css-loader", options: { importLoaders: 1 } },
      "postcss-loader",
    ],
  },
  /*
  {
    test: /\.(s*)css$/,
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
  },*/
];

const prodPlugins = [new CompressionPlugin()];

const devPlugins = [];

module.exports = (env, { mode }) => ({
  entry: "./src/index.js",
  devtool: "inline-source-map",
  target: "web",
  output: {
    filename: "app.[contentHash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: jsRules,
  },
  resolve: {
    extensions: [".tsx", ".ts"],
  },
  plugins: [
    ...(mode === "production" ? prodPlugins : devPlugins),
    new HtmlWebpackPlugin({ title: "App Name", template: "src/index.html" }),
    new CleanWebpackPlugin(),
  ].filter(Boolean),
});
